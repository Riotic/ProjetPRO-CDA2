let tableToKeepV4;
let tableToKeepV5;

function getNbOfRows() {
  let verifyExist = document.getElementById("startV4");
  let verifyExist2 = document.getElementById("startV5");
  let verifyExist3 = document.getElementById("paraV4");
  let verifyExist4 = document.getElementById("paraV5");

  if (verifyExist && verifyExist2 && verifyExist3 && verifyExist4) {
    const test1 = document.getElementById("startV4");
    const test2 = document.getElementById("startV5");
    const test3 = document.getElementById("paraV4");
    const test4 = document.getElementById("paraV5");
    test1.remove();
    test2.remove();
    test3.remove();
    test4.remove();
  } else {
    tableToKeepV4 = document.getElementById("allTableComparable").value;
    tableToKeepV5 = document.getElementById("allTableComparable").value;

    const xhr = new XMLHttpRequest();
    const url = "/api/nbRows";
    const data = {
      tableV4: tableToKeepV4,
      schemaV4: keepSchemaNameV4,
      bddV4: keepBddNameV4,
      tableV5: tableToKeepV5,
      schemaV5: keepSchemaNameV5,
      bddV5: keepBddNameV5,
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);
        var donnees = data;
        const pV4 = document.createElement("p");
        pV4.innerText = `${data["tailleRowV4"]} Lignes`;
        pV4.id = "paraV4";
        const pV5 = document.createElement("p");
        pV5.innerText = `${data["tailleRowV5"]} Lignes`;
        pV5.id = "paraV5";
        const inputFromRowV4 = document.createElement("input");
        const inputFromRowV5 = document.createElement("input");
        inputFromRowV4.id = "startV4";
        inputFromRowV4.className = "form-control mb-3";
        inputFromRowV4.placeholder = "N°Ligne début visualisation";
        inputFromRowV4.type = "integer";
        inputFromRowV4.pattern = "[1-9][0-9]*";
        inputFromRowV5.id = "startV5";
        inputFromRowV5.className = "form-control mb-3";
        inputFromRowV5.placeholder = "N°Ligne début visualisation";
        inputFromRowV5.type = "integer";
        inputFromRowV5.pattern = "[1-9][0-9]*";
        tableV5.appendChild(pV4);
        tableV4.appendChild(pV5);
        tableV5.appendChild(inputFromRowV5);
        tableV4.appendChild(inputFromRowV4);

        const input1 = document.getElementById("startV4");
        const input2 = document.getElementById("startV5");
        const button = document.getElementById("buttonCheck");

        input1.addEventListener("input", function () {
          checkInputs(input1, input2, button);
        });

        input2.addEventListener("input", function () {
          checkInputs(input1, input2, button);
        });
      } else if (this.readyState === 4) {
        alert("Une erreur est survenue.");
      }
    };

    const jsonData = JSON.stringify(data);

    xhr.send(jsonData);
  }
}

function checkInputs(input1, input2, button) {
  const value1 = input1.value.trim();
  const value2 = input2.value.trim();

  if (value1 !== "" && value2 !== "" && /^\d+$/.test(value1) && /^\d+$/.test(value2)) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

// getNbOfRows();
