"use strict";
var Final_Firework;
(function (Final_Firework) {
    window.addEventListener("load", handleLoad);
    // let rocketName: string;
    let amount;
    let color;
    // let colors: string[];
    let radius;
    let width;
    let height;
    let size;
    let particles = [];
    Final_Firework.gravity = 0.05;
    Final_Firework.friction = 0.99;
    let url = "http://localhost:5001/";
    // let url: string = "https://rocket-maker.herokuapp.com/";
    async function handleLoad() {
        console.log("start");
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
        // let rocket: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#rocketBtn");
        // let deleteBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#deleteBtn");
        let circle = document.querySelector("input#circle");
        let rectangle = document.querySelector("input#rectangle");
        let triangle = document.querySelector("input#triangle");
        let addColor = document.querySelector("button#addColor");
        submit.addEventListener("click", sendRocket);
        showtime.addEventListener("click", loadShowTime);
        canvasRes.addEventListener("click", shootRocket);
        gallery.addEventListener("click", deleteGallery);
        // rocket.addEventListener("click", getRocket);
        // canvasShow.addEventListener("click", shootRocket);
        // deleteBtn.addEventListener("click", deleteRocket);
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
    //Wechsel zu Showtime-Page:
    async function loadShowTime() {
        let body = document.querySelector("body#page");
        body.innerHTML = " ";
        body.style.display = "block";
        body.style.backgroundColor = "black";
        body.innerHTML += "<h1 id='title2'>Showtime</h1>";
        body.innerHTML += "<canvas id='result'></canvas>";
        body.innerHTML += "<div id='sidebar'><a id='return' href= 'rocketMaker.html'>create more rockets</div>";
        let response = await fetch(url + "?" + "command=getNames");
        let nameList = await response.text();
        let names = JSON.parse(nameList);
        Final_Firework.generateSidebar(names);
        // let rocket: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#rocketBtn");
        // rocket.addEventListener("click", getRocket);
        //shootRocket();
    }
    // async function getRocket(): Promise<void> {
    //     let response: Response = await fetch(url + "?" + "command=getRockets");
    //     let responseText: string = await response.text();
    //     let Data: Rocket[] = JSON.parse(responseText);
    //     !!filter die Rocket raus die selected wurde
    //     shootRocket(selectedRocket)
    // }
    //Löschen der gesamten Galerie:
    async function deleteGallery() {
        let response = await fetch(url + "?" + "command=deleteAll");
        let responseText = await response.text();
        alert(responseText);
    }
    //Löschen einer Rocket:
    // async function deleteRocket(): Promise<void> {
    //     let response: Response = await fetch(url + "?" + "command=deleteRocket&rocketName=" + rocketName);
    //     let responseText: string = await response.text();
    //     alert(responseText);
    //  }   
    //Parikelanimation:
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
    function shootRocket(_event) {
        let formData = new FormData(document.forms[0]);
        let mouseX = _event.clientX;
        let mouseY = _event.clientY;
        for (let entry of formData) {
            amount = Number(formData.get("amount"));
            color = String(formData.get("color"));
            switch (entry[1]) {
                case "Circle":
                    radius = Number(formData.get("radius"));
                    createCircle(mouseX, mouseY, amount, color, radius);
                    break;
                case "Rectangle":
                    width = Number(formData.get("width"));
                    height = Number(formData.get("height"));
                    createRectangle(mouseX, mouseY, amount, color, width, height);
                    break;
                case "Triangle":
                    size = Number(formData.get("size"));
                    createTriangle(mouseX, mouseY, amount, color, size);
                    break;
            }
        }
    }
    function createCircle(_mouseX, _mouseY, _amount, _color, _radius) {
        let color = _color;
        let radian = (Math.PI * 2) / _amount;
        let power = 14;
        for (let i = 0; i < _amount; i++) {
            let velX = Math.cos(radian * i) * (Math.random() * power);
            let velY = Math.sin(radian * i) * (Math.random() * power);
            particles.push(new Final_Firework.Circle(_mouseX, _mouseY, color, { x: velX, y: velY }, _radius));
        }
    }
    function createRectangle(_mouseX, _mouseY, _amount, _color, _width, _height) {
        let color = _color;
        let radian = (Math.PI * 2) / _amount;
        let power = 14;
        for (let i = 0; i < _amount; i++) {
            let velX = Math.cos(radian * i) * (Math.random() * power);
            let velY = Math.sin(radian * i) * (Math.random() * power);
            particles.push(new Final_Firework.Rectangle(_mouseX, _mouseY, color, { x: velX, y: velY }, _width, _height));
        }
    }
    function createTriangle(_mouseX, _mouseY, _amount, _color, _size) {
        let color = _color;
        let radian = (Math.PI * 2) / _amount;
        let power = 14;
        for (let i = 0; i < _amount; i++) {
            let velX = Math.cos(radian * i) * (Math.random() * power);
            let velY = Math.sin(radian * i) * (Math.random() * power);
            particles.push(new Final_Firework.Triangle(_mouseX, _mouseY, color, { x: velX, y: velY }, _size));
        }
    }
    //Änderungen innerhalb des Formulars:
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
    function addColorInput() {
        let colorPalette = document.querySelector("div#colorPalette");
        colorPalette.innerHTML += "<input type='color' name='color' value='#d68aff'>";
    }
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=firework.js.map