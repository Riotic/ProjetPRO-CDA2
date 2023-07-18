// declaring async function so that we can wait the response from all servers in order to catch data
async function compareData(){

  let verifyExist = document.getElementById("block-bdd");
  if(verifyExist){
    verifyExist.remove();
  }


  const test2 = document.getElementById("changeStep");
  test2.className = "h-75 d-flex justify-content-center";

  const chngImg2 = document.getElementById("stepImg");
  chngImg2.src = "/img/component/Component5.png";

  const div1Table = document.createElement("div");
  div1Table.id = "block-bdd";
  div1Table.className = " w-100 d-flex flex-column align-items-center justify-content-center";

  const div1TableTitle = document.createElement("h4");
  div1TableTitle.className = "mt-4";
  div1TableTitle.innerText = "Comparaisons";

  const createDivComparaisons = document.createElement("div");
  createDivComparaisons.id = "afficheComparaison";
  createDivComparaisons.className = "card-body d-flex flex-column m-3 justify-content-center align-items-center w-100";

  const divToClean = document.getElementById("toClean");
  divToClean.appendChild(div1Table);
  div1Table.appendChild(div1TableTitle);
  div1Table.appendChild(createDivComparaisons);

    let divDisplayComp = document.createElement('div');
    divDisplayComp.id = "displayComparaison";
    divDisplayComp.className = "d-flex justify-content-around w-100"
    afficheComparaison.appendChild(divDisplayComp);
    const xhr = new XMLHttpRequest();
    const url = "/api/compareData";
    const data = {tableV4: keepTableNameV4, schemaV4: keepSchemaNameV4, bddV4: keepBddNameV4, tableV5: keepTableNameV5, schemaV5: keepSchemaNameV5, bddV5: keepBddNameV5, startV4: keepStartV4 , startV5: keepStartV5 };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = async function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(this.responseText);
        var donnees = data;
  
        let changeDaStep = document.getElementById("changeStep");
        changeDaStep.className = "h-75 w-75 d-flex justify-content-center";
        
        let divContainTabV4 = document.createElement('div');
        divContainTabV4.className = "card";
        divContainTabV4.style.overflow = "auto";
        let divContainTabId = document.createElement('div');
        divContainTabId.className = "card";
        divContainTabId.style.overflow = "auto";
        let divContainTabV5 = document.createElement('div');
        divContainTabV5.className = "card";
        divContainTabV5.style.overflow = "auto";

        let divDifV4 = document.createElement('div');
        let divDifV5 = document.createElement('div');
        let sameData = document.createElement('div');
        divDifV4.id = "dif-v4";
        divDifV4.className = "card.body";

        divDifV5.id = "dif-v5";
        divDifV5.className = "card.body";

        sameData.id = "sameData";
        sameData.className = "card.body";


        let titleV4 = document.createElement('h5');
        titleV4.className = 'm-3';
        titleV4.innerText = `DonnéeV4 dif ${keepStartV4}-${Number(keepStartV4)+24}`;

        let titleV5 = document.createElement('h5');
        titleV5.className = 'm-3';
        titleV5.innerText = `DonnéeV5 dif ${keepStartV5}-${Number(keepStartV5)+24}`;

        let donneeId = document.createElement('h5');
        donneeId.className = 'm-3';
        donneeId.innerText = `Donnée identiques entre les deux tables`;

        let tableauDifV4 = document.createElement('table');
        tableauDifV4.className = "table table-info";

        let tableauDifV5 = document.createElement('table');
        tableauDifV5.className = "table table-info";

        let tableauSameData = document.createElement('table');
        tableauSameData.className = "table table-success";
        
        displayComparaison.appendChild(divContainTabV4);
        divContainTabV4.appendChild(titleV4);
        divContainTabV4.appendChild(divDifV4);
        divDifV4.appendChild(tableauDifV4);

        displayComparaison.appendChild(divContainTabId);
        divContainTabId.appendChild(donneeId);
        divContainTabId.appendChild(sameData);
        sameData.appendChild(tableauSameData);

        displayComparaison.appendChild(divContainTabV5);
        divContainTabV5.appendChild(titleV5);
        divContainTabV5.appendChild(divDifV5);
        divDifV5.appendChild(tableauDifV5);
        let enTete = tableauDifV4.insertRow();
        enTete.id = `firstRowV4`;

        await delay(100);

        let z = 0;
        for(let key in donnees["dataDifV4"]){
          if(z == 0){

            let enTete = tableauDifV4.insertRow();
            enTete.id = `firstRowV4`;
            for (const property in donnees["dataDifV4"][key]) {
              let cellToInsert = enTete.insertCell();
              cellToInsert.textContent = property;
              cellToInsert.className = "nom_colonneV4";
              cellToInsert.id = `${property}V4`;
              z = z+ 1;
            }
          }
          let ligne = tableauDifV4.insertRow();
          ligne.id = `Same-${key}row`;
          for(const property in donnees["dataDifV4"][key]){
            let cellToInsert = ligne.insertCell();
            cellToInsert.textContent = donnees["dataDifV4"][key][property];
            if(cellToInsert.textContent == ""){cellToInsert.textContent = "NULL"};
            cellToInsert.id = `${property}-dataSame--${key}`;
            cellToInsert.className = `dataSame--${key}`;
          }
        };

        z = 0;
        for(let key in donnees["dataIdentique"]){
          if(z == 0){
            let enTete = tableauSameData.insertRow();
            enTete.id = `firstRowSame`;
            for (const property in donnees["dataIdentique"][key]) {
              let cellToInsert = enTete.insertCell();
              cellToInsert.textContent = property;
              cellToInsert.className = "nom_colonneSame";
              cellToInsert.id = `${property}Same`;
              z = z+ 1;
            }
          }
          let ligne = tableauSameData.insertRow();
          ligne.id = `Same-${key}row`;
          for(const property in donnees["dataIdentique"][key]){
            let cellToInsert = ligne.insertCell();
            cellToInsert.textContent = donnees["dataIdentique"][key][property];
            if(cellToInsert.textContent == ""){cellToInsert.textContent = "NULL"};
            cellToInsert.id = `${property}-dataSame--${key}`;
            cellToInsert.className = `dataSame--${key}`;
          }
        };

        z = 0;
        for(let key in donnees["dataDifV5"]){
          if(z == 0){
            let enTete = tableauDifV5.insertRow();
            enTete.id = `firstRowV5`;
            for (const property in donnees["dataDifV5"][key]) {
              let cellToInsert = enTete.insertCell();
              cellToInsert.textContent = property;
              cellToInsert.className = "nom_colonneV5";
              cellToInsert.id = `${property}V5`;
              z = z+ 1;
            }
          }
          let ligne = tableauDifV5.insertRow();
          ligne.id = `V5-${key}row`;
          for(const property in donnees["dataDifV5"][key]){
            let cellToInsert = ligne.insertCell();
            cellToInsert.textContent = donnees["dataDifV5"][key][property];
            if(cellToInsert.textContent == ""){cellToInsert.textContent = "NULL"};
            cellToInsert.id = `${property}-dataV5--${key}`;
            cellToInsert.className = `dataV5--${key}`;
          }
        };

  
  
      }
    
      
    };
    const jsonData = JSON.stringify(data);
    xhr.send(jsonData);


}


