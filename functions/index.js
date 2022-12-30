const functions = require("firebase-functions");
var admin = require("firebase-admin");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const axios = require("axios");
const cors = require("cors")({
  origin: [
    "https://us-central1-ecommerce-logan-29604.cloudfunctions.net",
    "https://mochilaslogan.com",
  ],
  methods: ["POST"],
  credentials: true,
});
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "APP_USR-240639848989783-110620-0582174d79f9a4c07acb801d6",
});
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://ecommerce-logan-29604.firebaseio.com",
});
const db = admin.firestore();

exports.crearIdMP = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const listItems = req.body;
    var productosEnviar = listItems.map((item) => {
      return {
        title: item.Nombre,
        unit_price: parseFloat(item.Precio),
        quantity: item.Unidades,
      };
    });

    let preference = {
      items: productosEnviar,
      back_urls: {
        success: "https://mochilaslogan.com/cliente/confirmacion",
        failure: "https://mochilaslogan.com/cliente/error",
        pending: "https://mochilaslogan.com/cliente/pendiente",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.set("Access-Control-Allow-Origin", "https://mochilaslogan.com");
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.set("Access-Control-Allow-Credentials", true);
        //console.log("response: ", response);
        return res.status(200).send({
          id: response.body.id,
          url: response.body.init_point,
          urlSandbox: response.body.sandbox_init_point,
        });
      })
      .catch(function (error) {
        console.log("error: ", error);
        return res.status(500).send(error);
      });
  });
});

exports.creaPagoMP = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let payment_idFront = req.body.payment_id;
    let statusFront = req.body.status;
    axios
      .get(
        `https://api.mercadopago.com/v1/payments/${payment_idFront}?access_token=APP_USR-240639848989783-110620-0582174d79f9a4c07acb801d6`
      )
      .then(function (response) {
        if (
          payment_idFront === response.data.id.toString() &&
          statusFront === response.data.status
        ) {
          const coleccion = "Clientes";
          const subColeccion = "Pedidos";
          const carritoDB = req.body.carritoDB;
          //console.log("carritoDB: ", carritoDB)
          const numeroPedido = "00" + Date.now();
          return db
            .collection(coleccion)
            .doc(carritoDB.IdCliente)
            .collection(subColeccion)
            .doc(numeroPedido)
            .set({
              Total: carritoDB.Total,
              Productos: carritoDB.Productos,
              Direccion: carritoDB.Direccion,
              Fecha: new Date(),
              IdCliente: carritoDB.IdCliente,
              Nombres: carritoDB.Nombres,
              Apellidos: carritoDB.Apellidos,
              Correo: carritoDB.Correo,
              Celular: carritoDB.Celular,
              Estado: "pedido",
              NumeroPedido: numeroPedido,
            })
            .then(() => {
              return db
                .collection(coleccion)
                .doc(carritoDB.IdCliente)
                .collection("Carrito")
                .doc(carritoDB.IdCliente)
                .delete()
                .then(() => {
                  res.set(
                    "Access-Control-Allow-Origin",
                    "https://mochilaslogan.com"
                  );
                  res.set("Access-Control-Allow-Methods", "POST");
                  res.set("Access-Control-Allow-Headers", "Content-Type");
                  res.set("Access-Control-Max-Age", "3600");
                  res.set("Access-Control-Allow-Credentials", true);
                  return res.status(200).send({
                    data: true,
                  });
                })
                .catch((err) => {
                  console.log("error", err);
                  return res.status(500).send(err);
                });
            })
            .catch((err) => {
              console.log("error", err);
              return res.status(500).send(err);
            });
        } else {
          console.log("no son iguales");
          return res.status(500).send(error);
        }
      })
      .catch(function (error) {
        console.log("error", error);
        return res.status(500).send(error);
      });
  });
});

exports.chatbot = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  function consultarPedido(agent) {
    const idPedido = agent.parameters.TipoNumeroPedido;
    if (idPedido) {
      const pedidosRef = db
        .collectionGroup("Pedidos")
        .where("NumeroPedido", "==", idPedido);
      return pedidosRef
        .get()
        .then((querySnapshot) => {
          const pedidosArray = [];
          querySnapshot.forEach((doc) => {
            pedidosArray.push({ IdPedido: doc.id, ...doc.data() });
          });
          agent.add(`Hola: ${pedidosArray[0].Nombres}`);
          agent.add(`El estado de tu pedido es: ${pedidosArray[0].Estado}`);
          agent.add(`Compraste estos productos:`);

          const productosArray = pedidosArray[0].Productos.map((doc) => {
            return {
              text: doc.Nombre,
              link: doc.UrlProducto,
              image: {
                src: {
                  rawUrl: doc.ImagenesUrl[0],
                },
              },
            };
          });

          const payload = {
            richContent: [
              [
                {
                  type: "chips",
                  options: productosArray,
                },
              ],
            ],
          };
          agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
              rawPayload: true,
              sendAsMessage: true,
            })
          );
          agent.add(
            `En la fecha: ${pedidosArray[0].Fecha.toDate().toLocaleDateString()}`
          );
          agent.add(`Espero haberte ayudado: ${pedidosArray[0].Nombres}`);
        })
        .catch(() => {
          agent.add(`No existe pedido o escribe bien tu número de pedido`);
        });
    } else {
      agent.add(`Ingresa tu número de pedido correctamente`);
    }
  }

  let intentMap = new Map();

  intentMap.set("ConsultarPedido", consultarPedido);

  agent.handleRequest(intentMap);
});
