"use strict";
var Final_Firework;
(function (Final_Firework) {
    function generateSidebar(_data) {
        let group = null;
        group = createOutput(_data);
        let div = document.querySelector("div#sidebar");
        if (div && group)
            div.appendChild(group);
    }
    Final_Firework.generateSidebar = generateSidebar;
    function createOutput(_data) {
        let group = document.createElement("div");
        group.id = "rocketBtns";
        for (let name of _data) {
            let span = document.createElement("span");
            span.setAttribute("name", "rocketBtn");
            let rocketBtn = document.createElement("button");
            rocketBtn.type = "button";
            rocketBtn.id = "rocketBtn";
            rocketBtn.value = name.rocketName;
            rocketBtn.setAttribute("class", "rocketBtn");
            rocketBtn.innerHTML = name.rocketName;
            if (name.rocketName == "") {
                rocketBtn.innerHTML = "no name yet :(";
            }
            rocketBtn.addEventListener("click", Final_Firework.getRocket);
            span.appendChild(rocketBtn);
            group.appendChild(span);
        }
        return group;
    }
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=generateSidebar.js.map