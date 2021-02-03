"use strict";
var Final_Firework;
(function (Final_Firework) {
    window.addEventListener("load", handleLoad);
    // document.addEventListener("click", handleClick);
    // let c: CanvasRenderingContext2D;
    let url = "http://localhost:5001/";
    function handleLoad() {
        console.log("tescht tescht");
        let addColor = document.querySelector("button#addColor");
        let showtime = document.querySelector("button#showtime");
        let submit = document.querySelector("button#submit");
        addColor.addEventListener("click", addColorInput);
        showtime.addEventListener("click", loadShowTime);
        submit.addEventListener("click", sendRocket);
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        // c = <CanvasRenderingContext2D>canvas.getContext("2d");
        // canvas.width = innerWidth;
        // canvas.height = innerHeight;
    }
    async function sendRocket(_event) {
        console.log("send send");
        let formData = new FormData(document.forms[0]);
        let formQuery = new URLSearchParams(formData);
        let response = await fetch(url + "?" + formQuery.toString());
        let responseText = await response.text();
        alert("You can now find your rocket in the gallery!" + responseText.replace(/<br>/g, " "));
    }
    function addColorInput() {
        console.log("color color");
        let colorPalette = document.querySelector("div#colorPalette");
        colorPalette.innerHTML += "<input type='color' name='color' value='#d68aff'>";
    }
    function loadShowTime() {
        console.log("the show must go on");
        let body = document.querySelector("body#page");
        let canvas = document.querySelector("canvas#showArea");
        // let sidebar: HTMLDivElement = <HTMLDivElement>document.querySelector("div#sidebar");
        // let title: HTMLElement = <HTMLElement>document.querySelector("h1#title2");
        body.innerHTML = " ";
        body.style.display = "block";
        body.style.backgroundColor = "black";
        body.innerHTML += "<h1 id='title2'>Showtime</h1>";
        body.innerHTML += "<canvas id='showArea'></canvas>";
        body.innerHTML += "<div id='sidebar'><button type='button' id='rocketMaker'><a href= 'firework.html'>create more rockets</button></div>";
        // let create: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#rocketMaker");
        // create.addEventListener("click", loadRocketMaker);
    }
    // function loadRocketMaker(): void {
    //     console.log("create create");
    // }
    // function handleClick(): void {
    //     console.log("click click");
    // }
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=firework.js.map