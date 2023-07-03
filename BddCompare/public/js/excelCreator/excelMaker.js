function wantToCheckIf(donneToExcelV4, donneToExcelId, donneToExcelV5, nombreCol){
    let dictNewGood = {
        "makeANewTabV4": [],
        "makeANewTabId": [],
        "makeANewTabV5": []
    }


    for(let i = 0; i < 25; i ++){
        if(donneToExcelV4[i +1]){
            let forNewTab = donneToExcelV4[i+1].split(",");
            dictNewGood["makeANewTabV4"][i] = [];
            for( let z = 0; z < nombreCol + 2; z ++){
                dictNewGood["makeANewTabV4"][i].push(forNewTab[z]);
            }
        }else{
            dictNewGood["makeANewTabV4"][i] = [];
            for( let z = 0; z < nombreCol + 2; z ++){
                dictNewGood["makeANewTabV4"][i].push(" ");
            }
        }
    }

    for(let i = 0; i < 25; i ++){
        if(donneToExcelId[i +1]){
            let forNewTab = donneToExcelId[i+1].split(",");
            dictNewGood["makeANewTabId"][i] = [];
            for( let z = 0; z < nombreCol + 2; z ++){
                dictNewGood["makeANewTabId"][i].push(forNewTab[z]);
            }
        }else{
            dictNewGood["makeANewTabId"][i] = [];
            for( let z = 0; z < nombreCol + 2; z ++){
                dictNewGood["makeANewTabId"][i].push(" ");
            }
        }
    }

    for(let i = 0; i < 25; i ++){
        if(donneToExcelV5[i +1]){
            let forNewTab = donneToExcelV5[i+1].split(",");
            dictNewGood["makeANewTabV5"][i] = [];
            for( let z = 0; z < nombreCol + 2; z ++){
                dictNewGood["makeANewTabV5"][i].push(forNewTab[z]);
            }
        }else{
            dictNewGood["makeANewTabV5"][i] = [];
            for( let z = 0; z < nombreCol + 2; z ++){
                dictNewGood["makeANewTabV5"][i].push(" ");
            }
        }
    }

    let goodTab = [];

    for(let i = 0; i < 25; i++){
        let fuseTab = dictNewGood["makeANewTabV4"][i].concat(dictNewGood["makeANewTabId"][i],dictNewGood["makeANewTabV5"][i]);
        goodTab.push(fuseTab);
    }
    // console.log(makeANewTab);
    // console.log(goodTab);
    console.log(dictNewGood);
    // console.log(donneToExcelV4);
    // console.log(donneToExcelId);
    // console.log(donneToExcelV5);
    return goodTab;
}

function makeExcel(tableV4, schemaV4, bddV4, tableV5, schemaV5, bddV5, startV4, startV5){
    const xhr = new XMLHttpRequest();
    const url = "/api/compareData";
    const data = {tableV4: tableV4, schemaV4: schemaV4, bddV4: bddV4, tableV5: tableV5, schemaV5: schemaV5, bddV5: bddV5, startV4: startV4 , startV5: startV5 };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(this.responseText);
            var donnees = data;

            console.log(donnees);
            
            var donneToExcelV4 = ["donnéeDifV4"];
            var donneToExcelId = ["donnéeIdentique"];
            var donneToExcelV5 = ["donnéeDifV5"];


            for(let key in donnees["dataDifV4"]){
                let getClean = [Number(key ) + Number(donnees["nbStartV4"]) ];
                let treatData = JSON.stringify(donnees["dataDifV4"][key]);
                for (let i = 0; i < donnees["numberOfCol"]; i++){
                    treatData = treatData.replace("{", "").replace( "}","").replace(/"/g,"");
                };
                let forClean = treatData.split(",");

                for(let z = 0; z < donnees["numberOfCol"]; z ++){
                    if(forClean[z].split("\:")[1] == undefined){
                        getClean.push("NULL");
                    }else{
                        getClean.push(forClean[z].split("\:")[1]);
                    }

                }
                getClean.push(" ");
                // console.log(getClean);
                donneToExcelV4.push(getClean.join(","));
            };
            // console.log(donneToExcelV4);

            for(let key in donnees["dataIdentique"]){
                let getClean = [Number(key ) + Number(donnees["nbStartV4"]) ];
                let treatData = JSON.stringify(donnees["dataIdentique"][key]);
                for (let i = 0; i < donnees["numberOfCol"]; i++){
                    treatData = treatData.replace("{", "").replace( "}","").replace(/"/g,"");
                };
                let forClean = treatData.split(",");

                for(let z = 0; z < donnees["numberOfCol"]; z ++){
                    if(forClean[z].split("\:")[1] == undefined){
                        getClean.push("NULL");
                    }else{
                        getClean.push(forClean[z].split("\:")[1]);
                    }

                }
                getClean.push(" ");
                // console.log(getClean);
                donneToExcelId.push(getClean.join(","));
            };
            // console.log(donneToExcelId);


            for(let key in donnees["dataDifV5"]){
                let getClean = [Number(key ) + Number(donnees["nbStartV5"]) ];
                let treatData = JSON.stringify(donnees["dataDifV5"][key]);
                for (let i = 0; i < donnees["numberOfCol"]; i++){
                    treatData = treatData.replace("{", "").replace( "}","").replace(/"/g,"");
                };
                let forClean = treatData.split(",");

                for(let z = 0; z < donnees["numberOfCol"]; z ++){
                    if(forClean[z].split("\:")[1] == undefined){
                        getClean.push("NULL");
                    }else{
                        getClean.push(forClean[z].split("\:")[1]);
                    }

                }
                getClean.push(" ");
                // console.log(getClean);
                donneToExcelV5.push(getClean.join(","));
            };
            // console.log(donneToExcelV5);

            let firstRowExcel = [donneToExcelV4[0]];
            for(let i = 0; i <= donnees["numberOfCol"]; i++){
                firstRowExcel.push(" ");
            };
            firstRowExcel.push(donneToExcelId[0]);
            for(let i = 0; i <= donnees["numberOfCol"]; i++){
                firstRowExcel.push(" ");
            };
            firstRowExcel.push(donneToExcelV5[0]);

            let secondRowExcel = ["id"];
            for(let z = 0; z < 3; z ++){
                for(let i = 0; i <donnees["numberOfCol"]; i++){
                    secondRowExcel.push(donnees["nameOfCols"][i]);
                };

                if(z != 2){
                    secondRowExcel.push(" ");
                    secondRowExcel.push("id");
                }
            }

            
            let finalTableau = wantToCheckIf(donneToExcelV4, donneToExcelId, donneToExcelV5, donnees["numberOfCol"]);
            console.log(finalTableau);

            // Données à inclure dans le fichier Excel
            var test = [
                firstRowExcel,
                secondRowExcel,
                finalTableau[0],
                finalTableau[1],
                finalTableau[2],
                finalTableau[3],
                finalTableau[4],
                finalTableau[5],
                finalTableau[6],
                finalTableau[7],
                finalTableau[8],
                finalTableau[9],
                finalTableau[10],
                finalTableau[11],
                finalTableau[12],
                finalTableau[13],
                finalTableau[14],
                finalTableau[15],
                finalTableau[16],
                finalTableau[17],
                finalTableau[18],
                finalTableau[19],
                finalTableau[20],
                finalTableau[21],
                finalTableau[22],
                finalTableau[23],
                finalTableau[24]
            ];
            
            // Créer un nouveau workbook dans SheetJS
            var workbook = XLSX.utils.book_new();
            var tableCompare = tableV4;
            // Créer une nouvelle feuille de calcul dans le workbook
            var worksheet = XLSX.utils.aoa_to_sheet(test);
            
            // Ajouter la feuille de calcul au workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, "Données");
            
            // Convertir le workbook en binaire Excel
            var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            var blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `comparaison-table--${tableCompare}-${donnees["nbStartV4"]}-${Number(donnees["nbStartV4"]) + 24}`;

            link.click();
            link.remove();
        }

    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    // console.log(document.getElementById("allTableComparable").value);
    xhr.send(jsonData);

}
