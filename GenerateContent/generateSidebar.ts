namespace Final_Firework {
    export interface Rocket {
        rocketName: string;
        amount: number;
        color: string;
    }
    
    export function generateSidebar(_data: Rocket[]): void {
        
        let group: HTMLElement | null = null;
        group = createOutput(_data);

        let div: HTMLDivElement | null = document.querySelector("div#sidebar");
        if (div && group)
            div.appendChild(group);
     }

    function createOutput(_data: Rocket[]): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        group.id = "rocketBtns";
        
        for (let name of _data) {
            let span: HTMLSpanElement = document.createElement("span");
            span.setAttribute("name", "rocketBtn");

            let rocketBtn: HTMLButtonElement = document.createElement("button");
            rocketBtn.type = "button";
            rocketBtn.id = "rocketBtn";
            // rocketBtn.setAttribute("class", "rocketBtn");
            rocketBtn.innerHTML = name.rocketName;

            if (name.rocketName == "") {
                rocketBtn.innerHTML = "no name yet :(";
            }

            span.appendChild(rocketBtn);
            group.appendChild(span);
        }
        return group;
    }
}