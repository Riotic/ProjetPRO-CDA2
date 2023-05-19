function getNbOfRows(){
    let verifyExist = document.getElementById("startV4");
    let verifyExist2 = document.getElementById("startV5");
    let verifyExist3 = document.getElementById("paraV4");
    let verifyExist4 = document.getElementById("paraV5");

    if(verifyExist && verifyExist2 && verifyExist3 && verifyExist4){
        const test1 = document.getElementById("startV4");
        const test2 = document.getElementById("startV5");
        const test3 = document.getElementById("paraV4");
        const test4 = document.getElementById("paraV5");
        test1.remove();
        test2.remove();
        test3.remove();
        test4.remove();
    
    }else{
        const xhr = new XMLHttpRequest();
        const url = "/api/nbRows";
        const data = {tableV4: document.getElementById("allTableComparable").value, schemaV4: document.getElementById("allSchemaV4").value, bddV4: document.getElementById("bdd-v4").value, tableV5: document.getElementById("allTableComparable").value, schemaV5: document.getElementById("allSchemaV5").value, bddV5: document.getElementById("bdd-v5").value };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            var donnees = data;
            console.log(donnees, "get nmber of rows");
            const pV4 = document.createElement("p");
            pV4.innerText = `${data["tailleRowV4"]} Lignes`;
            pV4.id = "paraV4";
            const pV5 = document.createElement("p");
            pV5.innerText = `${data["tailleRowV5"]} Lignes`;
            pV5.id = "paraV5";
            const inputFromRowV4 = document.createElement("input");
            const inputFromRowV5 = document.createElement("input");
            inputFromRowV4.id = "startV4";
            inputFromRowV4.className = "form-control";
            inputFromRowV4.placeholder = "N°Ligne début visualisation";
            inputFromRowV4.type = "integer";
            inputFromRowV4.pattern = "[1-9][0-9]*";
            inputFromRowV5.id = "startV5";
            inputFromRowV5.className = "form-control";
            inputFromRowV5.placeholder = "N°Ligne début visualisation";
            inputFromRowV5.integer = "integer";
            inputFromRowV5.pattern = "[1-9][0-9]*";
            tableV5.appendChild(pV4);
            tableV4.appendChild(pV5);
            tableV5.appendChild(inputFromRowV5);
            tableV4.appendChild(inputFromRowV4);
     
          } else if (this.readyState === 4) {
            alert('Une erreur est survenue.');
          }
        };
      
        const jsonData = JSON.stringify(data);
        console.log(jsonData, "get nmber of rows");
        xhr.send(jsonData);
    }

}