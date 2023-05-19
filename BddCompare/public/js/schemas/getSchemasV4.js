const bddV4 = document.getElementsByClassName("displayBddV4")[0];

bddV4.addEventListener("click", () => {
  let verifyExist = document.getElementById("allSchemaV4");

  if(verifyExist){
    const test = document.getElementById("allSchemaV4");
    test.remove();

  }else{

    const allSchemaSelect = document.createElement("select");
    allSchemaSelect.id = "allSchemaV4";
    allSchemaSelect.className = 'form-select w-60';
    const divSchemV4 = document.getElementById("schemaV4");
    divSchemV4.appendChild(allSchemaSelect);

    var xhr = new XMLHttpRequest(); // création d'un objet XMLHttpRequest
    const url = "/api/schemasV4";
    const data = {bdd: document.getElementById("bdd-v4").value};
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
    console.log(jsonData);
    xhr.send(jsonData);

  }

})
