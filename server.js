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
    let databaseUrl = "mongodb://localhost:27017";
    //let databaseUrl: string = "mongodb+srv://Nutzer1:nutzer1@eia2.bg79w.mongodb.net/RocketName";
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
        console.log("hey hey");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let command = url.query["command"];
            switch (command) {
                case "deleteAll":
                    deleteAll(_request, _response);
                    break;
                case "getRockets":
                    getRockets(_request, _response);
                    break;
                case "getNames":
                    getNames(_request, _response);
                    break;
                // case "deleteRocket":
                //     deleteRocket(_request, _response);
                //     break;
                default:
                    showRocket(_request, _response);
            }
        }
    }
    //zeig dem Nutzer die entstandene Rocket:
    function showRocket(_request, _response) {
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query, null, 1);
            _response.write(jsonString);
            storeRocket(url.query, _response);
        }
        _response.end();
    }
    //getNames für gallery und sidebar:
    async function getNames(_request, _response) {
        let allNames = rockets.find({}, { projection: { _id: 0, rocketName: 1 } });
        //_id: 0, damit es nicht zurückgegeben wird; 
        let allNamesString = await allNames.toArray();
        let nameList = JSON.stringify(allNamesString);
        _response.write(nameList);
        _response.end();
    }
    async function getRockets(_request, _response) {
        let allRockets = rockets.find();
        let rocketsArray = await allRockets.toArray();
        let arrayToString = JSON.stringify(rocketsArray);
        _response.write(arrayToString);
        _response.end();
    }
    //speichert Rocket in Datenbank ab
    function storeRocket(_rocket, _response) {
        rockets.insertOne(_rocket);
        _response.end();
    }
    // alle rockets in der collection löschen
    function deleteAll(_request, _response) {
        rockets.deleteMany({});
        _response.write("The gallery got deleted. After you refresh the page, there will be no rockets left in your gallery.");
        _response.end();
    }
    // async function deleteRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    //     let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
    //     let rocketName: string | string [] | undefined = url.query["rocketName"];
    //     rockets.deleteOne({ "rocketName": rocketName });
    //     _response.write("This rocket got deleted!");
    //     _response.end();
    // }
})(Final_Firework = exports.Final_Firework || (exports.Final_Firework = {}));
//# sourceMappingURL=server.js.map