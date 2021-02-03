namespace Final_Firework {
    
    window.addEventListener("load", handleLoad);
    // document.addEventListener("click", handleClick);
    // let c: CanvasRenderingContext2D;
    
    let url: string = "http://localhost:5001/";
    
    function handleLoad(): void {
        console.log("tescht tescht");

        let addColor: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#addColor");
        let showtime: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#showtime");
        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#submit");
        
        addColor.addEventListener("click", addColorInput);
        showtime.addEventListener("click", loadShowTime);
        submit.addEventListener("click", sendRocket);
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
        return;
        // c = <CanvasRenderingContext2D>canvas.getContext("2d");
        
        // canvas.width = innerWidth;
        // canvas.height = innerHeight;
        
    }

    async function sendRocket(_event: MouseEvent): Promise<void> {
        console.log("send send");
        let formData: FormData = new FormData(document.forms[0]);
        let formQuery: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(url + "?" + formQuery.toString());
        let responseText: string = await response.text();
        alert("You can now find your rocket in the gallery!" + responseText.replace(/<br>/g, " "));
    }
    
    function addColorInput(): void {
        console.log("color color");
        let colorPalette: HTMLDivElement = <HTMLDivElement>document.querySelector("div#colorPalette");
        colorPalette.innerHTML += "<input type='color' name='color' value='#d68aff'>";
    }
    
    function loadShowTime(): void {
        console.log("the show must go on");
        
        let body: HTMLElement = <HTMLElement>document.querySelector("body#page");
        
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas#showArea");

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

    
}