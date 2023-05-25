const bddV5 = document.getElementsByClassName("displayBddV5")[0];

bddV5.addEventListener("click", () => {
  let verifyExist = document.getElementById("allSchemaV5");
  if(verifyExist){
    const test = document.getElementById("allSchemaV5");
    test.remove();

  }else{
    const allSchemaSelect = document.createElement("select");
    allSchemaSelect.id = "allSchemaV5";
    allSchemaSelect.className = 'form-select';
    const divSchemV5 = document.getElementById("schemaV5");
    divSchemV5.appendChild(allSchemaSelect);

    var xhr = new XMLHttpRequest(); // création d'un objet XMLHttpRequest
    const url = "/api/schemasV5";
    const data = {bdd: document.getElementById("bdd-v5").value};
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
    valueV5 = document.getElementById("bdd-v5").value;
  }

  

})
