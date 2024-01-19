let keepSchemaNameV4;
let keepSchemaNameV5;



function onlyComparaTables(){

    let test2 = document.getElementById("stepImg");
    if(test2.src.includes("Component4.png")){

    }else{
      keepSchemaNameV4 = document.getElementById("allSchemaV4").value;
      keepSchemaNameV5 = document.getElementById("allSchemaV5").value;
    }

    let verifyExist = document.getElementById("block-bdd");
    if(verifyExist){
      verifyExist.remove();
    }
    const chngImg2 = document.getElementById("stepImg");
    chngImg2.src = "/img/component/Component3.png";

    const div1Table = document.createElement("div");
    div1Table.id = "block-bdd";
    div1Table.className = "card-body d-flex flex-column";

    const div1TableTitle = document.createElement("h4");
    div1TableTitle.className = "mt-4 ms-3";
    div1TableTitle.innerText = "Tables en communs";

    const div1TableDiv1 = document.createElement("div");
    div1TableDiv1.className = "d-flex m-3 flex-column justify-content-between";
    div1TableDiv1.id = "containMyTable";

    const div1TableDiv1Div1 = document.createElement("div");
    div1TableDiv1Div1.id = "onlyComparableTables";
    div1TableDiv1Div1.className = "d-flex m-3 justify-content-evenly";

    const divToClean = document.getElementById("toClean");
    divToClean.appendChild(div1Table);
    div1Table.appendChild(div1TableTitle);
    div1Table.appendChild(div1TableDiv1);
    div1TableDiv1.appendChild(div1TableDiv1Div1);

    const allTableSelect = document.createElement("select");
    allTableSelect.id = "allTableComparable";
    allTableSelect.className = 'form-select w-25';
    const displayLignes = document.createElement("button");
    displayLignes.id = "displayLignes";
    displayLignes.innerHTML = "Afficher n° Lignes";
    displayLignes.className = 'btn btn-primary checkFunction';
    displayLignes.addEventListener('click', getNbOfRows);
    const divTableV4 = document.getElementById("onlyComparableTables");
    divTableV4.appendChild(allTableSelect);
    divTableV4.appendChild(displayLignes);

    const  div1TableDivFLTitle = document.createElement("h4");
    div1TableDivFLTitle.innerText = "Donnees";
    div1TableDivFLTitle.className = "mt-4 ms-3 ";

    const div1TableDivForLines = document.createElement("div");
    div1TableDivForLines.className = "mt-4 ms-3 d-flex justify-content-evenly";
    div1TableDivForLines.innerHTML = `
    <div id="containTableV5" class="m-3">
      <div id="tableV5">
      </div>
    </div>
    <div id="containTableV4" class="m-3">
      <div id="tableV4">
      </div>
    </div>
  `;
    const div1TableDivFlButton = document.createElement("button");
    div1TableDivFlButton.className = "ml-3 btn btn-primary align-self-center displayDataV4 displayDataV5";
    div1TableDivFlButton.id = "buttonCheck";
    div1TableDivFlButton.innerText = "Afficher données des tablesV4 et V5";
    div1TableDivFlButton.setAttribute("disabled", true);

    div1Table.appendChild(div1TableDivFLTitle);
    div1Table.appendChild(div1TableDivForLines);
    div1Table.appendChild(div1TableDivFlButton);

    const allDataV5 = document.getElementsByClassName("displayDataV4")[0];
    allDataV5.addEventListener("click", displayDaDataV4);

    const xhr = new XMLHttpRequest();
    const url = "/api/compareTables";
    const data = { schemaV4: keepSchemaNameV4, bddV4: keepBddNameV4, schemaV5: keepSchemaNameV5, bddV5: keepBddNameV5 };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(this.responseText);
        var tablesAll = data;
  
        var tablesList = document.getElementById('allTableComparable');
        // onlyComparableTables
        // console.log(tables);
        tablesAll.forEach(function(table) {
          // console.log(table);
          // création d'un élément <li> pour chaque utilisateur
          var option = document.createElement('option');
          option.className = "table-comparable";
          option.value = table.table_name;
          option.innerText = table.table_name;
          // ajout de l'élément <li> au conteneur
          tablesList.appendChild(option);
        });
      } else if (this.readyState === 4) {
        // fonction appelée en cas d'erreur lors de la requête
        alert('Une erreur est survenue.');
      }

    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    xhr.send(jsonData);
    
}


// document.getElementById("refreshTables2").addEventListener("click", onlyComparaTables);

