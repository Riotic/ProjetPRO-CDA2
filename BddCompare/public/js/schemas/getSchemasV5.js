const bddV5 = document.getElementsByClassName("displayBddV5")[0];
let keepBddNameV5;
let keepBddNameV4;
console.log(keepBddNameV4);



async function getSchemaV5(){
      let test2 = document.getElementById("stepImg");
      if(test2.src.includes("Component3.png")){
        let removeThis = document.getElementById("toClean");
        removeThis.remove();
      }else{
        keepBddNameV5 = document.getElementById("bdd-v5").value;
        keepBddNameV4 = document.getElementById("bdd-v4").value;
      }

      // let verifyExist = document.getElementById("allSchemaV5");
      let verifyExist = document.getElementById("cleanForRenew1");
      if(verifyExist){
        verifyExist.remove();
      }
      // const test2 = document.getElementById("cleanForRenew1");
      // test2.remove();
  
      const chngImg2 = document.getElementById("stepImg");
      chngImg2.src = "/img/component/Component2.png";
  
      const chngImg = document.getElementById("stepArrow");
      chngImg.src = "/img/component/Arrow1.png";
  
      const containSchemas = document.createElement("div");
      containSchemas.id = "toClean";
      containSchemas.className = 'card h-100 w-75';
  
        const blockBdd = document.createElement("div");
        blockBdd.id = "block-bdd";
        blockBdd.className = "card-body";
      // blockBdd.className = "card-body m-3";
  
          const title4 = document.createElement("h4");
          title4.innerText = "Schémas";
          title4.className = "mt-4 mb-4 ms-4";
  
          const schemaO = document.createElement("div");
          schemaO.id = "schema";
          schemaO.className = "d-flex m-3 justify-content-between h-100";
  
            const containSchemV5 = document.createElement("div");
            containSchemV5.id = "containSchemaV5";
            containSchemV5.className = "d-flex flex-column m-3 justify-content-between";
  
              const containDivSchV5 = document.createElement("div");
              containDivSchV5.id = "schemaV5";
  
            const divButonnRefresh = document.createElement("div");
            divButonnRefresh.className = "d-flex flex-column m-3 justify-content-center align-items-center";
  
              const buttonRefresh = document.createElement("button");
              buttonRefresh.id = "refreshTables2";
              buttonRefresh.innerText = "Afficher tables";
              buttonRefresh.className = "displayTableV4 displayTableV5 m-2 w-100 btn btn-primary";
  
            const containSchemaV4 = document.createElement("div");
            containSchemaV4.id = "containSchemaV4";
            containSchemaV4.className = "d-flex flex-column m-3 justify-content-between";
  
              const containDivV4 = document.createElement("div");
              containDivV4.id = "schemaV4";
  
      changeStep.appendChild(containSchemas);
      containSchemas.appendChild(blockBdd);
      blockBdd.appendChild(title4);
      blockBdd.appendChild(schemaO);
      schemaO.appendChild(containSchemV5);
      containSchemV5.appendChild(containDivSchV5);
      schemaO.appendChild(divButonnRefresh);
      divButonnRefresh.appendChild(buttonRefresh);
      buttonRefresh.addEventListener("click", onlyComparaTables);
      schemaO.appendChild(containSchemaV4);
      containSchemaV4.appendChild(containDivV4);
  
      const allSchemaSelect = document.createElement("select");
      allSchemaSelect.id = "allSchemaV5";
      allSchemaSelect.className = 'form-select';
      const divSchemV5 = document.getElementById("schemaV5");
      divSchemV5.appendChild(allSchemaSelect);

  
      var xhr = new XMLHttpRequest(); // création d'un objet XMLHttpRequest
      const url = "/api/schemasV5";
      const data = {bdd: keepBddNameV5};
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          // fonction appelée lorsque la requête est réussie
          // console.log(this.responseText);
          var data = JSON.parse(this.responseText);
          // console.log(data);
          var schemas = data;
           // récupération des données reçues
          // console.log(schemas);
          var schemasList = document.getElementById('allSchemaV5'); // sélection du conteneur
    
          schemas.forEach(function(schema) {
            // création d'un élément <li> pour chaque utilisateur
            var option = document.createElement('option');
            option.className = "schema-v5";
            option.value = schema.schema_name;
            option.innerText = schema.schema_name;
            // ajout de l'élément <li> au conteneur
            schemasList.appendChild(option);
          });
        } else if (this.readyState === 4) {
          // fonction appelée en cas d'erreur lors de la requête
          alert('Une erreur est survenue.');
        }
      };
    
      const jsonData = JSON.stringify(data);
      console.log(jsonData);
      xhr.send(jsonData);
      valueV5 = keepBddNameV5;

      await delay(100);
}

// bddV5.addEventListener("click", getSchemaV5);
