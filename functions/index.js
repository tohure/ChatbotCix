'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const WeatherApi = require('./weather').WeatherClass;
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.chatbotCixFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  const wapi = new WeatherApi();


  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function facturaYes(agent) {
    const suma = 2 + 2;
    agent.add(`Preparé su factura mientras espera su pedido. Gracias!. Por cierto la suma es ==> `+suma);
  }

  async function tomarPedido(agent) {

    const platoFondo = agent.parameters['plato-fondo'];
    const jugo = agent.parameters.jugo;
    const postre = agent.parameters.postre;

    let msg = "De acuerdo, su plato de fondo es: "+platoFondo+" con un jugo de "+jugo;
    
    if(postre) {
        msg += " más su postre de "+postre;
    }

    msg += " ¿Desea factura?."

    const dataWapi = await wapi.getLondonWeather();

    if(dataWapi.successful){
        msg += " Por seacaso el clima en Londres es "+dataWapi.main.temp;
    }

    agent.add(msg);
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('factura - yes', facturaYes);
  intentMap.set('tomar pedido', tomarPedido);
  
  agent.handleRequest(intentMap);
});
