const elemToClick = document.getElementById("stepArrow");

async function refreshThis(){
    let test = document.getElementById("stepArrow");
    let test2 = document.getElementById("stepImg");
    console.log(test.src);
    console.log(test2.src);

    if(test2.src.includes("Component2.png")){
        let toRmv = document.getElementById("block-bdd");
        toRmv.remove();
        let toClean = document.getElementById("toClean");
        toClean.remove();
        test.src = "/img/component/idle.png";
        test2.src = "/img/component/Component1.png";

        const cleanForR = document.createElement("div");
        cleanForR.id = "cleanForRenew1";
        cleanForR.className = "d-flex flex-column justify-content-center align-items-center h-50";

        const div2 = document.createElement("div");
        div2.className = "d-flex justify-content-between h-100";
        
        const div3 = document.createElement("div");
        div3.className = "card w-100 h-100";

        const div4 = document.createElement("div");
        div4.id = "block-bdd";
        div4.className = "card-body d-flex flex-column align-content-center h-100";
        div4.setAttribute("style", "padding: 10px 50px 20px;");

        const div4Title = document.createElement("h4");
        div4Title.className = "mt-4 mb-4";
        div4Title.innerText = "Base de données";

        const div4Div1 = document.createElement("div");
        div4Div1.id = "databasePoemsV5";
        div4Div1.className = "d-flex justify-content-between mb-4";

        const div4Div1Select1 = document.createElement("select");
        div4Div1Select1.id = "bdd-v5";
        div4Div1Select1.className = " form-select w-50 me-5";

        div4Div1Select1.innerHTML = `<option value="poemsV5-integration">V5 Integration - poems-refonte@192.168.10.248 </option>
        <option value="poemsV5-test">V5 Test - poems-refonte@192.168.10.249 </option>
        <option value="localV5">Local V5 </option>`;

        const div4Div1Select2 = document.createElement("select");
        div4Div1Select2.id = "bdd-v4";
        div4Div1Select2.className = " form-select w-50";

        div4Div1Select2.innerHTML = `<option value="poemsV4-formation">V4 Formation - poems_pdt@192.168.10.55 </option>
        <option value="poemsV4-formation">V4 Formation - poems_pdt@192.168.10.55 </option>
        <option value="poemsV5-test">V5 Test - poems-refonte@192.168.10.249 </option>
        <option value="localV4">Local V4 </option>`;

        const div4Button = document.createElement("button");
        div4Button.id = "refreshSchemas";
        div4Button.className = "displayBddV5 displayBddV4 btn btn-primary w-50 align-content-center align-self-center";
        div4Button.innerText = "Afficher schémas des bdd";

        changeStep.appendChild(cleanForR);
        cleanForR.appendChild(div2);
        div2.appendChild(div3);
        div3.appendChild(div4);

        div4.appendChild(div4Title);
        div4.appendChild(div4Div1);

        div4Div1.appendChild(div4Div1Select1);
        div4Div1.appendChild(div4Div1Select2);

        div4.appendChild(div4Button);

        const bddV5 = document.getElementsByClassName("displayBddV5")[0];
        const bddV4 = document.getElementsByClassName("displayBddV4")[0];
        bddV4.addEventListener("click", getSchemaV4);
        // bddV5.addEventListener("click", getSchemaV5);
    }else if(test2.src.includes("Component3.png")){
      await getSchemaV4();

    }else if(test2.src.includes("Component4.png")){
        let repairToClean = document.getElementById("toClean");
        repairToClean.className = "card h-100 w-75";
        let changeMainBack = document.getElementById("main");
        changeMainBack.className = "main d-flex flex-column align-items-center h-75 justify-content-around";
        onlyComparaTables();
    }else if(test2.src.includes("Component5.png")){
        const test2 = document.getElementById("changeStep");
        test2.className = "h-75 w-75 d-flex justify-content-center";
        await displayDaDataV4();

    }

}

elemToClick.addEventListener("click", refreshThis);