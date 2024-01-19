function compareTables(){
    const tablesV4 = document.getElementsByClassName("table-v4");
    console.log(tablesV4.length);
    let allValV4 = [];
    for (let i = 0; i < tablesV4.length; i++) {
        allValV4.push(tablesV4[i].value);
    }
    // console.log(allValV4);
    // console.log(schemasV4);
    const tablesV5 = document.getElementsByClassName("table-v5");
    let allValV5 = [];
    for (let i = 0; i < tablesV5.length; i++) {
        allValV5.push(tablesV5[i].value);
    }
    // console.log(schemasV5);
    // console.log(schemasV5.length);
    // console.log(allValV5);

    // récupération de tout les schémas en commun entre les deux bases
    let tablesSimilaire = [];
    for (let i = 0; i < allValV4.length; i++) {
        for (let j = 0; j < allValV5.length; j++) {
            if (allValV4[i] === allValV5[j]) {
                tablesSimilaire.push(allValV4[i]);
            }
        }
    }
    tablesSimilaire = [...new Set(tablesSimilaire)];
    let result = "";
    if( allValV4.length < allValV5.length){
        result = `Le schéma de V5 choisi a ${allValV5.length - allValV4.length} tables de plus que le schéma V4 choisi.\r\n`;
    }else{
        result = `Le schéma de V4 choisi a ${allValV4.length - allValV5.length} tables de plus que la base de donnée V5 choisi.\r\n`;
    }

    document.querySelector("#comparaisonStockTables").setAttribute('style', 'white-space: pre;');
    // ajout du contenu comparé
    document.querySelector("#comparaisonStockTables").textContent = result + "Il y a " + tablesSimilaire.length + "tables similaires.";


    // console.log(schemasSimilaire);
}


// document.getElementById("compareTables").addEventListener("click", compareTables);
// document.getElementById("refreshTables").addEventListener("click",function(){
//     document.querySelector("#comparaisonStockTables").textContent = "";
// })
