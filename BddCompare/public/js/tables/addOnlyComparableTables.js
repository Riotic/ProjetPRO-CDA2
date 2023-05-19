function onlyComparaTables(){

    let verifyExist = document.getElementById("allTableComparable");

    if(verifyExist){
      const test = document.getElementById("allTableComparable");
      test.remove();
      const test2 = document.getElementById("displayLignes");
      test2.remove();
    }else{
      const allTableSelect = document.createElement("select");
      allTableSelect.id = "allTableComparable";
      allTableSelect.className = 'form-select w-25';
      const displayLignes = document.createElement("button");
      displayLignes.id = "displayLignes";
      displayLignes.innerHTML = "afficher/cacher n° Lignes";
      displayLignes.className = 'btn btn-primary';
      displayLignes.addEventListener('click', getNbOfRows);
      const divTableV4 = document.getElementById("onlyComparableTables");
      divTableV4.appendChild(allTableSelect);
      divTableV4.appendChild(displayLignes);

      const xhr = new XMLHttpRequest();
      const url = "/api/compareTables";
      const data = { schemaV4: document.getElementById("allSchemaV4").value, bddV4: document.getElementById("bdd-v4").value, schemaV5: document.getElementById("allSchemaV5").value, bddV5: document.getElementById("bdd-v5").value };
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
}


document.getElementById("refreshTables2").addEventListener("click", onlyComparaTables);

