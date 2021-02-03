"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Final_Firework = void 0;
const Http = require("http");
const Url = require("url");
var Final_Firework;
(function (Final_Firework) {
    let server = Http.createServer();
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    console.log("Server starting on port:" + port);
    server.listen(port);
    server.addListener("request", handleRequest);
    function handleRequest(_request, _response) {
        console.log("hey hey");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     if (url.query[key] != "") {
            //      _response.write(key + ": " + url.query[key] + ", ");
            //     }
            // }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }
})(Final_Firework = exports.Final_Firework || (exports.Final_Firework = {}));
//# sourceMappingURL=server.js.map