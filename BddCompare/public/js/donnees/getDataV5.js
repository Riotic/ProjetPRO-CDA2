let keepTableNameV4;
let keepTableNameV5;
let keepStartV4;
let keepStartV5;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayDaDataV5(){
  let test2 = document.getElementById("stepImg");
  if(test2.src.includes("Component5.png")){

  }else{
    keepTableNameV4 = document.getElementById("allTableComparable").value;
    keepTableNameV5 = document.getElementById("allTableComparable").value;
    keepStartV4 = document.getElementById("startV4").value;
    keepStartV5 = document.getElementById("startV5").value;
  }

  let changeStep = document.getElementById("changeStep");
  changeStep.className = "h-100 w-75 d-flex justify-content-center";


  const chngImg2 = document.getElementById("stepImg");
  chngImg2.src = "/img/component/Component4.png";

  let changeMain = document.getElementById("main");
  changeMain.className = "main d-flex flex-column align-items-center h-100 justify-content-around"



  let dToClean = document.getElementById("toClean");
  dToClean.className = "card h-100 w-100";

  let verifyExist = document.getElementById("block-bdd");
  if(verifyExist){
    verifyExist.remove();
  }

  const div1Data = document.createElement("div");
  div1Data.id = "block-bdd";
  div1Data.className = "card-body d-flex flex-column";

  const div1DataTitle = document.createElement("h4");
  div1DataTitle.className = "mt-4 ms-3";
  div1DataTitle.innerText = "Affichage des données";

  const createDiv = document.createElement("div");
  createDiv.id = "buttonToDisplay";
  createDiv.className = "d-flex justify-content-center align-items-center w-100";

  const createButton1 = document.createElement("button");
  createButton1.id = "compareDatas";
  createButton1.innerText = "Afficher comparaison des données";
  createButton1.className = "btn btn-primary w-25 h-75 m-2";

  const createButton2 = document.createElement("button");
  createButton2.id = "excelMaker";
  createButton2.innerText = "Créer un excel de la comparaison";
  createButton2.className = "btn btn-primary w-25 h-75 m-2";
  createButton2.onclick = function handleClick() {
    makeExcel(keepTableNameV4, keepSchemaNameV4, keepBddNameV4, keepTableNameV5, keepSchemaNameV5, keepBddNameV5, keepStartV4, keepStartV5);
  };
  

  const div1DataDiv1 = document.createElement("div");
  div1DataDiv1.className = "card-body d-flex m-3 justify-content-between h-100";
  div1DataDiv1.id = "donnee";

  const div1DataDiv1Div1 = document.createElement("div");

  const div1DataDiv1Div1Div1 = document.createElement("div");
  div1DataDiv1Div1Div1.id = "comparaisonStockDatas";


  const divToClean = document.getElementById("toClean");
  divToClean.appendChild(div1Data);
  div1Data.appendChild(div1DataTitle);
  div1Data.appendChild(createDiv);
  createDiv.appendChild(createButton1);
  createButton1.addEventListener("click", compareData);
  createDiv.appendChild(createButton2);
  div1Data.appendChild(div1DataDiv1);
  div1DataDiv1.appendChild(div1DataDiv1Div1);
  div1DataDiv1Div1.appendChild(div1DataDiv1Div1Div1);

  // let verifyExist = document.getElementById("Setup1V5");

  // if(verifyExist){
  //   const test = document.getElementById("Setup1V5");
  //   test.remove();
  
  // }else{

    const xhr = new XMLHttpRequest();
    const url = "/api/donneeV5";
    const data = {tableV5: keepTableNameV4, schemaV5: keepSchemaNameV5, bdd: keepBddNameV5, startV5: keepStartV5};
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(this.responseText);
        var donnees = data;

        let divForTitleAndThead = document.createElement('div');
        divForTitleAndThead.className = "d-flex flex-column";

        let divContainTabV5 = document.createElement('div');
        divContainTabV5.id = "Setup1V5";
        divContainTabV5.className = "card m-3 d-flex flex-column";
        divContainTabV5.style.height = "580px";
        divContainTabV5.style.width = "750px";

        let divTableauV5 = document.createElement('div');
        divTableauV5.id = "data-v5";
        divTableauV5.className = "card";
        divTableauV5.style.height = "100%";
        divTableauV5.style.overflow = "auto";

        let title = document.createElement('h5');
        title.innerText = `DonnéeV5 ${keepStartV5}-${Number(keepStartV5)+24}`;


        let tableau = document.createElement('table');
        tableau.className = "table table-hover";
        donnee.appendChild(divContainTabV5);
        divContainTabV5.appendChild(divForTitleAndThead);
        divForTitleAndThead.appendChild(title)
        let thead = document.createElement('thead');
        thead.className = "d-flex justify-content-between w-100 overflow-auto";

        divForTitleAndThead.appendChild(thead);
        divContainTabV5.appendChild(divTableauV5);
        // divTableauV5.appendChild(title);
        divTableauV5.appendChild(tableau);
        
        // Création de l'élément thead

        
        // Insertion de la première ligne dans l'élément thead
        let headerRow = thead.insertRow();
        headerRow.id = `firstRowV5`;
        headerRow.className = "d-flex justify-content-center ";
        for (const property in donnees[0]) {
          let cellToInsert = headerRow.insertCell();
          let thToInsert = document.createElement('th');
          thToInsert.textContent = property;
          thToInsert.className = "nom_colonneV5 p-3 border border-dark h6";
          thToInsert.scope = "col";
          thToInsert.id = `${property}v5`;
          cellToInsert.parentNode.replaceChild(thToInsert, cellToInsert);
        }

        let theadTr = document.querySelector('#firstRow');
        // let tableRect = tableau.getBoundingClientRect();
        // theadTr.style.position = "absolute";


        
        // Création de l'élément tbody
        let tbody = document.createElement('tbody');
        tbody.id = "tableauV5";
        tableau.appendChild(tbody);

        let toMakeScroll = document.querySelector('#tableauV5');


        
        // Remplissage du tbody avec les données
        for(let i = 0; i < donnees.length; i++){
          let ligne = tbody.insertRow();
          ligne.id = `v5-${i+1}row`;
          for(const property in donnees[i]){
            let cellToInsert = ligne.insertCell();
            cellToInsert.textContent = donnees[i][property];
            if(cellToInsert.textContent == ""){cellToInsert.textContent = "NULL"};
            cellToInsert.id = `${property}-dataV5--${i+1}`;
            cellToInsert.className = `dataV5--${i+1} border border-dark`;
          }
        };
        

      }
    };
    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    await delay(100);
}


// allDataV5.addEventListener("click", displayDaDataV5);