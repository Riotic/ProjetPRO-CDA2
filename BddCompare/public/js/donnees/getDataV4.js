// const allDataV4 = document.getElementById("displayDataV4");

async function displayDaDataV4(){
  await displayDaDataV5();
  const xhr = new XMLHttpRequest();
    const url = "/api/donneeV4";
    const data = {tableV4: keepTableNameV4, schemaV4: keepSchemaNameV4, bdd: keepBddNameV4, startV4: keepStartV4};
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(this.responseText);
        var donnees = data;

        let divForTitleAndThead = document.createElement('div');
        divForTitleAndThead.className = "d-flex flex-column";

        let divContainTabV4 = document.createElement('div');
        divContainTabV4.id = "Setup1V4";
        divContainTabV4.className = "card m-3 d-flex flex-column";
        divContainTabV4.style.height = "580px";
        divContainTabV4.style.width = "750px";

        let divTableauV4 = document.createElement('div');
        divTableauV4.id = "data-v4";
        divTableauV4.className = "card";
        divTableauV4.style.height = "100%";
        divTableauV4.style.overflow = "auto";

        let title = document.createElement('h5');
        title.innerText = `DonnéeV4 ${keepStartV4}-${Number(keepStartV4)+24}`;


        let tableau = document.createElement('table');
        tableau.className = "table table-hover";
        donnee.appendChild(divContainTabV4);
        divContainTabV4.appendChild(divForTitleAndThead);
        divForTitleAndThead.appendChild(title)
        let thead = document.createElement('thead');
        thead.className = "d-flex justify-content-between w-100 overflow-auto";

        divForTitleAndThead.appendChild(thead);
        divContainTabV4.appendChild(divTableauV4);
        // divTableauV4.appendChild(title);
        divTableauV4.appendChild(tableau);
        
        // Création de l'élément thead

        
        // Insertion de la première ligne dans l'élément thead
        let headerRow = thead.insertRow();
        headerRow.id = `firstRowV4`;
        headerRow.className = "d-flex justify-content-center";
        for (const property in donnees[0]) {
          let cellToInsert = headerRow.insertCell();
          let thToInsert = document.createElement('th');
          thToInsert.textContent = property;
          thToInsert.className = "nom_colonneV4 p-3 border border-dark h6";
          thToInsert.scope = "col";
          thToInsert.id = `${property}v4`;
          cellToInsert.parentNode.replaceChild(thToInsert, cellToInsert);
        }

        let theadTr = document.querySelector('#firstRow');
        // let tableRect = tableau.getBoundingClientRect();
        // theadTr.style.position = "absolute";


        
        // Création de l'élément tbody
        let tbody = document.createElement('tbody');
        tbody.id = "tableauV4";
        tableau.appendChild(tbody);

        let toMakeScroll = document.querySelector('#tableauV4');


        
        // Remplissage du tbody avec les données
        for(let i = 0; i < donnees.length; i++){
          let ligne = tbody.insertRow();
          ligne.id = `v4-${i+1}row`;
          for(const property in donnees[i]){
            let cellToInsert = ligne.insertCell();
            cellToInsert.textContent = donnees[i][property];
            if(cellToInsert.textContent == ""){cellToInsert.textContent = "NULL"};
            cellToInsert.id = `${property}-dataV4--${i+1}`;
            cellToInsert.className = `dataV4--${i+1} border border-dark`;
          }
        };

      }
    };
    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    let whereToCraft = document.getElementById("block-bdd");






}
// allDataV4.addEventListener("click", () => {
//   let verifyExist = document.getElementById("Setup1V4");

//   if(verifyExist){
//     const test = document.getElementById("Setup1V4");
//     test.remove();
  
//   }else{

//     
//   }
// });