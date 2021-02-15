"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Final_Firework = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Final_Firework;
(function (Final_Firework) {
    let rockets;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    // let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl = "mongodb+srv://Nutzer1:nutzer1@eia2.bg79w.mongodb.net/RocketName";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + port);
        server.listen(port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        rockets = mongoClient.db("RocketMaker").collection("Rockets");
        console.log("Database connected", rockets != undefined);
    }
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let command = url.query["command"];
            switch (command) {
                case "getNames":
                    getNames(_request, _response);
                    break;
                case "getRocket":
                    getRocket(_request, _response);
                    break;
                case "deleteAll":
                    deleteAll(_request, _response);
                    break;
                case "deleteRocket":
                    deleteRocket(_request, _response);
                    break;
                default:
                    showRocket(_request, _response);
            }
        }
    }
    //Daten nach Abspeichern anzeigen:
    function showRocket(_request, _response) {
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query, null, 1);
            _response.write(jsonString);
            storeRocket(url.query, _response);
        }
        _response.end();
    }
    //rocketNames für generateGallery und generateSidbar bekommen:
    async function getNames(_request, _response) {
        let allNames = rockets.find({}, { projection: { _id: 0, rocketName: 1 } });
        //_id: 0, damit es nicht zurückgegeben wird; 
        let allNamesString = await allNames.toArray();
        let nameList = JSON.stringify(allNamesString);
        _response.write(nameList);
        _response.end();
    }
    //Daten einer Rocket erhalten:
    async function getRocket(_request, _response) {
        let url = Url.parse(_request.url, true);
        let rocketName = url.query["rocketName"];
        let rocket = rockets.find({ "rocketName": rocketName });
        let data = await rocket.toArray();
        let jsonString = JSON.stringify(data);
        _response.write(jsonString);
        _response.end();
    }
    //speichert Rocket in Datenbank ab:
    function storeRocket(_rocket, _response) {
        rockets.insertOne(_rocket);
        _response.end();
    }
    //alle Rockets in der Collection löschen:
    function deleteAll(_request, _response) {
        rockets.deleteMany({});
        _response.write("The gallery got deleted. After you refresh the page, there will be no rockets left in your gallery.");
        _response.end();
    }
    //gezielt eine Rocket löschen:
    function deleteRocket(_request, _response) {
        let url = Url.parse(_request.url, true);
        let rocketName = url.query["rocketName"];
        rockets.deleteOne({ "rocketName": rocketName });
        _response.write(rocketName + " got deleted! After refreshing the page, this rocket won't be in your gallery anymore.");
        _response.end();
    }
})(Final_Firework = exports.Final_Firework || (exports.Final_Firework = {}));
//# sourceMappingURL=server.js.map