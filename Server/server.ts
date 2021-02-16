import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Final_Firework {
    export interface Rocket {
        [type: string]: string | string[] | undefined;
    }

    let rockets: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;
        
    // let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl: string = "mongodb+srv://Nutzer1:nutzer1@eia2.bg79w.mongodb.net/RocketName";
    
    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        
        console.log("Server starting on port:" + port);

        server.listen(port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        rockets = mongoClient.db("RocketMaker").collection("Rockets");
        console.log("Database connected", rockets != undefined);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

            let command: string | string[] | undefined = url.query["command"];
            
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
    function showRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let jsonString: string = JSON.stringify(url.query, null, 1);
            _response.write(jsonString);
            storeRocket(url.query, _response);
        }
        _response.end();
    }

    //rocketNames für generateGallery und generateSidbar erhalten: 
    //(Dieser Teil wurde mithilfe des Codes von Sarah Franke erarbeitet)
    async function getNames(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let allNames: Mongo.Cursor<any> = rockets.find({}, { projection: { _id: 0, rocketName: 1 } });
        let allNamesString: string[] = await allNames.toArray();
        let nameList: string = JSON.stringify(allNamesString);
        _response.write(nameList);
        _response.end();
    }

    //Daten einer Rocket erhalten:
    async function getRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let rocketName: string | string [] | undefined = url.query["rocketName"];
        let rocket: Mongo.Cursor = rockets.find({ "rocketName": rocketName });
        let data: string[] = await rocket.toArray();
        let jsonString: string = JSON.stringify(data);
        _response.write(jsonString);
        _response.end();
    }
    
    //speichert Rocket in Datenbank ab:
    function storeRocket(_rocket: Rocket, _response: Http.ServerResponse): void {
        rockets.insertOne(_rocket);
        _response.end();
    }
    
    //alle Rockets in der Collection löschen:
    function deleteAll(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        rockets.deleteMany({});
        _response.write("The gallery got deleted. After you refresh the page, there will be no rockets left in your gallery.");
        _response.end();
    }

    //gezielt eine Rocket löschen:
    function deleteRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let rocketName: string | string [] | undefined = url.query["rocketName"];
        rockets.deleteOne({ "rocketName": rocketName });
        _response.write(rocketName + " got deleted! After refreshing the page, this rocket won't be in your gallery anymore.");
        _response.end();
    }
}