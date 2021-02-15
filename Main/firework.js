"use strict";
var Final_Firework;
(function (Final_Firework) {
    window.addEventListener("load", handleLoad);
    let amount;
    let colors = [];
    // let shape: string;
    let radius;
    let width;
    let height;
    let size;
    let particles = [];
    Final_Firework.gravity = 0.05;
    Final_Firework.friction = 0.99;
    // let url: string = "http://localhost:5001/";
    let url = "https://rocket-maker.herokuapp.com/";
    async function handleLoad() {
        //Galerie mit Rocket-Namen generieren:
        let response = await fetch(url + "?" + "command=getNames");
        let nameList = await response.text();
        let names = JSON.parse(nameList);
        Final_Firework.generateGallery(names);
        let canvasRes = document.querySelector("canvas#result");
        if (!canvasRes)
            return;
        Final_Firework.crc = canvasRes.getContext("2d");
        canvasRes.width = innerWidth;
        canvasRes.height = innerHeight;
        let submit = document.querySelector("button#submit");
        let showtime = document.querySelector("button#showtime");
        let gallery = document.querySelector("button#deleteGallery");
        let circle = document.querySelector("input#circle");
        let rectangle = document.querySelector("input#rectangle");
        let triangle = document.querySelector("input#triangle");
        let addColor = document.querySelector("button#addColor");
        submit.addEventListener("click", sendRocket);
        showtime.addEventListener("click", loadShowTime);
        canvasRes.addEventListener("click", shootRocket);
        gallery.addEventListener("click", deleteGallery);
        circle.addEventListener("click", changeInputC);
        rectangle.addEventListener("click", changeInputR);
        triangle.addEventListener("click", changeInputT);
        addColor.addEventListener("click", addColorInput);
    }
    window.setInterval(animate, 20);
    //Absenden der Daten:
    async function sendRocket(_event) {
        let formData = new FormData(document.forms[0]);
        let formQuery = new URLSearchParams(formData);
        let response = await fetch(url + "?" + formQuery.toString());
        let responseText = await response.text();
        alert("You can now find your rocket in the gallery!" + responseText.replace(/<br>/g, " "));
    }
    //Wechsel zur Showtime-Page:
    async function loadShowTime(_event) {
        let body = document.querySelector("body#page");
        body.innerHTML = " ";
        body.style.display = "block";
        body.style.backgroundColor = "black";
        body.innerHTML += "<h1 id='title2'>Showtime</h1>";
        body.innerHTML += "<canvas id='final'></canvas>";
        body.innerHTML += "<div id='sidebar'>" + "<a id='return' href= 'rocketMaker.html'>create more rockets</a>" + "</div>";
        let canvas = document.querySelector("canvas#final");
        if (!canvas)
            return;
        Final_Firework.crc = canvas.getContext("2d");
        canvas.width = window.outerWidth;
        canvas.height = window.innerHeight;
        canvas.addEventListener("click", shootSelected);
        let response = await fetch(url + "?" + "command=getNames");
        let nameList = await response.text();
        let names = JSON.parse(nameList);
        Final_Firework.generateSidebar(names);
    }
    //Gezieltes Abfragen der Rocket-Daten:
    async function getRocket(_event) {
        let target = _event.target;
        let btnValue = target.value;
        let response = await fetch(url + "?" + "command=getRocket&rocketName=" + btnValue);
        let data = await response.text();
        data = JSON.parse(data);
        console.log(data);
        // getData(data);
    }
    Final_Firework.getRocket = getRocket;
    //Abschießen der Rocket auf der Showtime-Page
    function shootSelected(_event) {
        let mouseX = _event.clientX;
        let mouseY = _event.clientY;
        // Übergabe der  Daten aus dem Js-Objekt...
        // vorrübergehend statische Werte, weil Daten der ausgewählten Rockets noch nicht korrekt verarbeitet werden
        amount = 300;
        colors = ["white", "lightgray"];
        radius = 3;
        createCircle(mouseX, mouseY, amount, colors, radius);
    }
    //Rausziehen der Values aus dem Js-Objekt:
    // function getData(_data: string): void {
    //     // amount = _data[0].amount;
    //     // color = _data[0].color;
    //     // shape = _data[0].shape;
    //     // console.log(_data);
    // }
    //Löschen der gesamten Galerie:
    async function deleteGallery(_event) {
        let response = await fetch(url + "?" + "command=deleteAll");
        let responseText = await response.text();
        alert(responseText);
    }
    //Löschen einer Rocket:
    async function deleteRocket(_event) {
        let target = _event.target;
        let btnValue = target.value;
        let response = await fetch(url + "?" + "command=deleteRocket&rocketName=" + btnValue);
        let responseText = await response.text();
        alert(responseText);
    }
    Final_Firework.deleteRocket = deleteRocket;
    //Animation der Partikel:
    function animate() {
        Final_Firework.crc.fillStyle = "rgba(0, 0, 0, 0.05)";
        Final_Firework.crc.fillRect(0, 0, Final_Firework.crc.canvas.width, Final_Firework.crc.canvas.height);
        for (let particle of particles) {
            if (particle.opacity > 0) {
                particle.move();
            }
            else {
                particles.shift();
            }
        }
    }
    //Abschießen der Rocket im Test-Bereich:
    function shootRocket(_event) {
        let formData = new FormData(document.forms[0]);
        let mouseX = _event.clientX;
        let mouseY = _event.clientY;
        let color;
        for (let entry of formData) {
            amount = Number(formData.get("amount"));
            color = String(formData.get("color"));
            colors.push(color);
            switch (entry[1]) {
                case "Circle":
                    radius = Number(formData.get("radius"));
                    createCircle(mouseX, mouseY, amount, colors, radius);
                    break;
                case "Rectangle":
                    width = Number(formData.get("width"));
                    height = Number(formData.get("height"));
                    createRectangle(mouseX, mouseY, amount, colors, width, height);
                    break;
                case "Triangle":
                    size = Number(formData.get("size"));
                    createTriangle(mouseX, mouseY, amount, colors, size);
                    break;
            }
        }
    }
    //Erzeugung der verschiedenen Formen:
    function createCircle(_mouseX, _mouseY, _amount, _color, _radius) {
        let color = _color;
        let radian = (Math.PI * 2) / _amount;
        let power = 14;
        for (let i = 0; i < _amount; i++) {
            let random = Math.floor(Math.random() * colors.length);
            let velX = Math.cos(radian * i) * (Math.random() * power);
            let velY = Math.sin(radian * i) * (Math.random() * power);
            particles.push(new Final_Firework.Circle(_mouseX, _mouseY, color[random], { x: velX, y: velY }, _radius));
        }
    }
    function createRectangle(_mouseX, _mouseY, _amount, _color, _width, _height) {
        let color = _color;
        let radian = (Math.PI * 2) / _amount;
        let power = 14;
        for (let i = 0; i < _amount; i++) {
            let random = Math.floor(Math.random() * colors.length);
            let velX = Math.cos(radian * i) * (Math.random() * power);
            let velY = Math.sin(radian * i) * (Math.random() * power);
            particles.push(new Final_Firework.Rectangle(_mouseX, _mouseY, color[random], { x: velX, y: velY }, _width, _height));
        }
    }
    function createTriangle(_mouseX, _mouseY, _amount, _color, _size) {
        let color = _color;
        let radian = (Math.PI * 2) / _amount;
        let power = 14;
        for (let i = 0; i < _amount; i++) {
            let random = Math.floor(Math.random() * colors.length);
            let velX = Math.cos(radian * i) * (Math.random() * power);
            let velY = Math.sin(radian * i) * (Math.random() * power);
            particles.push(new Final_Firework.Triangle(_mouseX, _mouseY, color[random], { x: velX, y: velY }, _size));
        }
    }
    //Dynamische Änderungen innerhalb des Formulars:
    function changeInputC(_event) {
        let input = document.querySelector("div#input");
        input.innerHTML = "<p>radius of particles:</p>";
        input.innerHTML += "<input type='number' name='radius' id='Radius' step='1' min='1' value='3'>";
    }
    function changeInputR(_event) {
        let input = document.querySelector("div#input");
        input.innerHTML = "<p>width of particles:</p>";
        input.innerHTML += "<input type='number' name='width' id='Width' step='1' min='1' value='3'>";
        input.innerHTML += "<p>height of particle:</p>";
        input.innerHTML += "<input type='number' name='height' id='Height' step='1' min='1' value='3'>";
    }
    function changeInputT(_event) {
        let input = document.querySelector("div#input");
        input.innerHTML = "<p>size of particles:</p>";
        input.innerHTML += "<input type='number' name='size' id='Size' step='1' min='1' value='3'>";
    }
    function addColorInput(_event) {
        let colorPalette = document.querySelector("div#colorPalette");
        colorPalette.innerHTML += "<input type='color' name='color' value='#d68aff'>";
    }
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=firework.js.map