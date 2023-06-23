const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { error } = require("console");

console.log(process.platform);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    res.setHeader("Content-Type", "text/html");
    const input = req.body.pokemon;
    const url = "https://pokeapi.co/api/v2/pokemon/" + input;
    https.get(url, function (response) {
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', () => {
            pokemonData = JSON.parse(data);
            pokeName = pokemonData.name;
            pokeType = pokemonData.types[0].type.name;
            pokeImage = pokemonData.sprites.other.dream_world.front_default;
            res.write("<h2>" + pokeName + "</h2>");
            res.write("<h3>" + pokeType + "</h3>");
            res.write("<img src=" + pokeImage + " alt=" + pokeName + "height='150' width='150'>");
            res.send();
        })
    })
        .on('error', (error) => {
            console.log(error);
        });
});


app.listen(3000, function () {
    console.log("Server live on port 3000");
})
