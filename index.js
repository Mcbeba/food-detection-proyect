
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
const https = require("https");
const fs = require("fs");
const path = require("path");
const { saveDB } = require("./helpers/saveFile");
const envParsed = require('./helpers/env-parser')

const options = {
  key: fs.readFileSync(path.resolve(__dirname, "./certificados/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "./certificados/cert.pem")),
};

const server = https.createServer(options, app);

const port = process.env.PORT || 8001;

app.use(express.static(path.resolve(__dirname, "./src")));

// create application/json parser
const jsonParser = bodyParser.json();
app.use(jsonParser);

const arrayDeAlimentosDetectados = []

//Solicitud get
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
  res.sendFile(path.resolve(__dirname, "tensorflow.js"))
});

//Solicitud post
app.post("/alimento", (req, res) => {
  //console.log(req.body)
  const food = req.body.food
  console.log('Data food received: ', food)
  res.send('Got a post request');

  requestNutrition(food)
});


//Hacer la peticion a API Nutrition y Guardar en DB
async function requestNutrition(query) {
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
      headers: {
        'X-Api-Key': envParsed.API_KEY
      }
    });

    if (response.status === 200) {
      console.log("NUTRITION RESPONSE", response.data);
      arrayDeAlimentosDetectados.push(JSON.stringify(response.data))
      console.log('Array:' + arrayDeAlimentosDetectados)
      saveDB(arrayDeAlimentosDetectados)
    } else {
      console.error('Request error:', response.status);
    }
  } catch (error) {
    console.error('Request error:', error);
  }

}

server.listen(port, () => {
  console.log(`Server listening on port: https://localhost:${port}`);
});

// server.on("close", () => {
//   saveDB(arrayDeAlimentosDetectados)
//   console.log("fin")
// })
