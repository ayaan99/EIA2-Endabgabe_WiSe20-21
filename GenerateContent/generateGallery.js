"use strict";
var Final_Firework;
(function (Final_Firework) {
    function generateGallery(_data) {
        let group = null;
        group = createOutput(_data);
        let fieldset = document.querySelector("fieldset#stored");
        // let div: HTMLDivElement | null = document.querySelector("div#gallery");
        if (fieldset && group)
            fieldset.appendChild(group);
        // } 
    }
    Final_Firework.generateGallery = generateGallery;
    function createOutput(_data) {
        let group = document.createElement("div");
        group.id = "gallery";
        for (let name of _data) {
            let span = document.createElement("span");
            let title = document.createElement("p");
            title.setAttribute("name", name.rocketName);
            title.innerHTML = name.rocketName;
            if (name.rocketName == "") {
                title.innerHTML = "no name :(";
            }
            span.appendChild(title);
            let deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.id = "deleteBtn";
            deleteBtn.value = name.rocketName;
            deleteBtn.setAttribute("class", "deleteBtn");
            deleteBtn.innerHTML = "delete";
            deleteBtn.addEventListener("click", Final_Firework.deleteRocket);
            span.appendChild(deleteBtn);
            group.appendChild(span);
        }
        return group;
    }
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=generateGallery.js.map