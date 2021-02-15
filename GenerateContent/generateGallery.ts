namespace Final_Firework {
    export interface Rocket {
        rocketName: string;
        amount: number;
        colors: string[];
        shape: string;
        radius: number;
        width: number;
        height: number;
        size: number;
    }
    
    export function generateGallery(_data: Rocket[]): void {
        
        let group: HTMLElement | null = null;
        group = createOutput(_data);

        let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#stored");
            // let div: HTMLDivElement | null = document.querySelector("div#gallery");
        if (fieldset && group)
            fieldset.appendChild(group);
        // } 
     }

    function createOutput(_data: Rocket[]): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        group.id = "gallery";
        
        for (let name of _data) {
            let span: HTMLSpanElement = document.createElement("span");
            let title: HTMLParagraphElement = document.createElement("p");
            title.setAttribute("name", name.rocketName);
            title.innerHTML = name.rocketName;

            if (name.rocketName == "") {
                title.innerHTML = "no name :(";
            }

            span.appendChild(title);
            
            let deleteBtn: HTMLButtonElement = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.id = "deleteBtn";
            deleteBtn.value = name.rocketName;
            deleteBtn.setAttribute("class", "deleteBtn");
            deleteBtn.innerHTML = "delete";

            deleteBtn.addEventListener("click", deleteRocket);
            span.appendChild(deleteBtn);

            group.appendChild(span);
        }
        return group;
    }
}