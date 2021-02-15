namespace Final_Firework {
    
    window.addEventListener("load", handleLoad);
    export interface Vector {
        x: number;
        y: number;
    }
    
    let amount: number;
    let colors: string[] = [];
    // let shape: string;
    let radius: number;
    let width: number;
    let height: number;
    let size: number;

    export let crc: CanvasRenderingContext2D;
    
    let particles: Particle[] = [];
    export let gravity: number = 0.05;
    export let friction: number = 0.99;
    
    // let url: string = "http://localhost:5001/";
    let url: string = "https://rocket-maker.herokuapp.com/";
    
    async function handleLoad(): Promise<void> {
        
        //Galerie mit Rocket-Namen generieren:
        let response: Response = await fetch(url + "?" + "command=getNames");
        let nameList: string = await response.text();
        let names: Rocket[] = JSON.parse(nameList);
        generateGallery(names);
        
        let canvasRes: HTMLCanvasElement | null = document.querySelector("canvas#result");
        if (!canvasRes)
        return;
        crc = <CanvasRenderingContext2D>canvasRes.getContext("2d");
        
        canvasRes.width = innerWidth;
        canvasRes.height = innerHeight;
        
        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#submit");
        let showtime: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#showtime");
        let gallery: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#deleteGallery");
        
        let circle: HTMLInputElement = <HTMLInputElement>document.querySelector("input#circle");
        let rectangle: HTMLInputElement = <HTMLInputElement>document.querySelector("input#rectangle");
        let triangle: HTMLInputElement = <HTMLInputElement>document.querySelector("input#triangle");
        let addColor: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#addColor");
        
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
    async function sendRocket(_event: MouseEvent): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let formQuery: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(url + "?" + formQuery.toString());
        let responseText: string = await response.text();
        alert("You can now find your rocket in the gallery!" + responseText.replace(/<br>/g, " "));
    }

    //Wechsel zur Showtime-Page:
    async function loadShowTime(_event: MouseEvent): Promise<void> {
        let body: HTMLElement = <HTMLElement>document.querySelector("body#page");
        
        body.innerHTML = " "; 
        body.style.display = "block";
        body.style.backgroundColor = "black";
        body.innerHTML += "<h1 id='title2'>Showtime</h1>";
        body.innerHTML += "<canvas id='final'></canvas>";
        body.innerHTML += "<div id='sidebar'>" + "<a id='return' href= 'rocketMaker.html'>create more rockets</a>" + "</div>";
        
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas#final");
        if (!canvas)
        return;
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");
        
        canvas.width = window.outerWidth;
        canvas.height = window.innerHeight;

        canvas.addEventListener("click", shootSelected);

        let response: Response = await fetch(url + "?" + "command=getNames");
        let nameList: string = await response.text();
        let names: Rocket[] = JSON.parse(nameList);
        generateSidebar(names);
    }

    //Gezieltes Abfragen der Rocket-Daten:
    export async function getRocket(_event: MouseEvent): Promise<void> {
        let target: HTMLButtonElement = <HTMLButtonElement>_event.target;
        let btnValue: string = target.value;
        let response: Response = await fetch(url + "?" + "command=getRocket&rocketName=" + btnValue);
        let data: string = await response.text();
        data = JSON.parse(data);

        console.log(data); 
        // getData(data);
    }

    //Abschießen der Rocket auf der Showtime-Page
    function shootSelected(_event: MouseEvent): void {
        let mouseX: number = _event.clientX;
        let mouseY: number = _event.clientY;

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
    async function deleteGallery(_event: MouseEvent): Promise<void> {
        let response: Response = await fetch(url + "?" + "command=deleteAll");
        let responseText: string = await response.text();
        alert(responseText);
    }

    //Löschen einer Rocket:
    export async function deleteRocket(_event: MouseEvent): Promise<void> {
        let target: HTMLButtonElement = <HTMLButtonElement>_event.target;
        let btnValue: string = target.value;
        let response: Response = await fetch(url + "?" + "command=deleteRocket&rocketName=" + btnValue);
        let responseText: string = await response.text();
        alert(responseText);
     }   

    //Animation der Partikel:
    function animate(): void {
        crc.fillStyle = "rgba(0, 0, 0, 0.05)";
        crc.fillRect(0, 0, crc.canvas.width, crc.canvas.height);

        for (let particle of particles) {
            if (particle.opacity > 0) {
                particle.move();
            } else {
                particles.shift();
            }
        }
    }   

    //Abschießen der Rocket im Test-Bereich:
    function shootRocket(_event: MouseEvent): void {
        let formData: FormData = new FormData(document.forms[0]);
        
        let mouseX: number = _event.clientX;
        let mouseY: number = _event.clientY;
        let color: string;

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
    function createCircle(_mouseX: number, _mouseY: number, _amount: number, _color: string[], _radius: number): void {
        let color: string[] = _color;
        let radian: number = (Math.PI * 2) / _amount;
        let power: number = 14;

        for (let i: number = 0; i < _amount; i++) {
            let random: number = Math.floor(Math.random() * colors.length);
            let velX: number = Math.cos(radian * i) * (Math.random() * power);
            let velY: number = Math.sin(radian * i) * (Math.random() * power);
            
            particles.push(new Circle(_mouseX, _mouseY, color[random], { x: velX, y: velY }, _radius));
        }
    }

    function createRectangle(_mouseX: number, _mouseY: number, _amount: number, _color: string[], _width: number, _height: number): void {
        let color: string[] = _color;
        let radian: number = (Math.PI * 2) / _amount;
        let power: number = 14;

        for (let i: number = 0; i < _amount; i++) {
            let random: number = Math.floor(Math.random() * colors.length);
            let velX: number = Math.cos(radian * i) * (Math.random() * power);
            let velY: number = Math.sin(radian * i) * (Math.random() * power);
            
            particles.push(new Rectangle(_mouseX, _mouseY, color[random], { x: velX, y: velY }, _width, _height));
        }
    }

    function createTriangle(_mouseX: number, _mouseY: number, _amount: number, _color: string[], _size: number): void {
        let color: string[] = _color;
        let radian: number = (Math.PI * 2) / _amount;
        let power: number = 14;

        for (let i: number = 0; i < _amount; i++) {
            let random: number = Math.floor(Math.random() * colors.length);
            let velX: number = Math.cos(radian * i) * (Math.random() * power);
            let velY: number = Math.sin(radian * i) * (Math.random() * power);
            
            particles.push(new Triangle(_mouseX, _mouseY, color[random], { x: velX, y: velY }, _size));
        }
    }

    //Dynamische Änderungen innerhalb des Formulars:
    function changeInputC(_event: MouseEvent): void {
        let input: HTMLDivElement = <HTMLDivElement>document.querySelector("div#input");
        input.innerHTML = "<p>radius of particles:</p>";
        input.innerHTML += "<input type='number' name='radius' id='Radius' step='1' min='1' value='3'>";
    }

    function changeInputR(_event: MouseEvent): void {
        let input: HTMLDivElement = <HTMLDivElement>document.querySelector("div#input");
        input.innerHTML = "<p>width of particles:</p>";
        input.innerHTML += "<input type='number' name='width' id='Width' step='1' min='1' value='3'>";
        input.innerHTML += "<p>height of particle:</p>";
        input.innerHTML += "<input type='number' name='height' id='Height' step='1' min='1' value='3'>";
    }

    function changeInputT(_event: MouseEvent): void {
        let input: HTMLDivElement = <HTMLDivElement>document.querySelector("div#input");
        input.innerHTML = "<p>size of particles:</p>";
        input.innerHTML += "<input type='number' name='size' id='Size' step='1' min='1' value='3'>";
    }
    
    function addColorInput(_event: MouseEvent): void {
        let colorPalette: HTMLDivElement = <HTMLDivElement>document.querySelector("div#colorPalette");
        colorPalette.innerHTML += "<input type='color' name='color' value='#d68aff'>";
    }
}