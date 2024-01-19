const bddV4 = document.getElementsByClassName("displayBddV4")[0];

console.log(keepBddNameV5);

async function getSchemaV4(){

  await getSchemaV5();

    const allSchemaSelect = document.createElement("select");
    allSchemaSelect.id = "allSchemaV4";
    allSchemaSelect.className = 'form-select';
    const divSchemV4 = document.getElementById("schemaV4");
    divSchemV4.appendChild(allSchemaSelect);

    var xhr = new XMLHttpRequest(); // création d'un objet XMLHttpRequest
    const url = "/api/schemasV4";
    const data = {bdd: keepBddNameV4};
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        // fonction appelée lorsque la requête est réussie

        var data = JSON.parse(this.responseText);
  
        var schemas = data;
        // récupération des données reçues
   
        var schemasList = document.getElementById('allSchemaV4'); // sélection du conteneur
  
        schemas.forEach(function(schema) {
          // création d'un élément <li> pour chaque utilisateur
          var option = document.createElement('option');
          option.className = "schema-v4";
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

    xhr.send(jsonData);

  
}

bddV4.addEventListener("click", getSchemaV4);