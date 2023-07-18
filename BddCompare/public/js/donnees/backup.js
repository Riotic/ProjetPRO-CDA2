function compareData(){
    let verifyExist = document.getElementById("displayComparaison");
    if(verifyExist){
      const test = document.getElementById("displayComparaison");
      test.remove();
    
    }else{
      let divDisplayComp = document.createElement('div');
      divDisplayComp.id = "displayComparaison";
      divDisplayComp.className = "d-flex justify-content-around w-100"
      afficheComparaison.appendChild(divDisplayComp);
      const xhr = new XMLHttpRequest();
      const url = "/api/compareData";
      const data = {tableV4: document.getElementById("allTableComparable").value, schemaV4: document.getElementById("allSchemaV4").value, bddV4: document.getElementById("bdd-v4").value, tableV5: document.getElementById("allTableComparable").value, schemaV5: document.getElementById("allSchemaV5").value, bddV5: document.getElementById("bdd-v5").value, startV4: document.getElementById("startV4").value , startV5: document.getElementById("startV5").value };
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var data = JSON.parse(this.responseText);
          var donnees = data;
    
          let divContainTabV4 = document.createElement('div');
          divContainTabV4.className = "card";
          let divContainTabId = document.createElement('div');
          divContainTabId.className = "card";
          let divContainTabV5 = document.createElement('div');
          divContainTabV5.className = "card";
  
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
          titleV4.innerText = `DonnéeV4 dif ${document.getElementById("startV4").value}-${Number(document.getElementById("startV4").value)+24}`;
  
          let titleV5 = document.createElement('h5');
          titleV5.className = 'm-3';
          titleV5.innerText = `DonnéeV5 dif ${document.getElementById("startV5").value}-${Number(document.getElementById("startV5").value)+24}`;
  
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
      console.log(jsonData);
      xhr.send(jsonData);
    }
  
  }
  
  
  
  
  document.getElementById("compareDatas").addEventListener("click", compareData);