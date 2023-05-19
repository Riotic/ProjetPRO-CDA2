function compareSchemas(){
    const schemasV4 = document.getElementsByClassName("schema-v4");
    console.log(schemasV4.length);
    let allValV4 = [];
    for (let i = 0; i < schemasV4.length; i++) {
        allValV4.push(schemasV4[i].value);
    }
    // console.log(allValV4);
    // console.log(schemasV4);
    const schemasV5 = document.getElementsByClassName("schema-v5");
    let allValV5 = [];
    for (let i = 0; i < schemasV5.length; i++) {
        allValV5.push(schemasV5[i].value);
    }
    // console.log(schemasV5);
    // console.log(schemasV5.length);
    // console.log(allValV5);

    // récupération de tout les schémas en commun entre les deux bases
    let schemasSimilaire = [];
    for (let i = 0; i < allValV4.length; i++) {
        for (let j = 0; j < allValV5.length; j++) {
            if (allValV4[i] === allValV5[j]) {
                schemasSimilaire.push(allValV4[i]);
            }
        }
    }
    
    let result = "";
    if( allValV4.length < allValV5.length){
        result = `La base de donnée de V5 choisi a ${allValV5.length - allValV4.length} schémas de plus que la base de donnée V4 choisi.\r\n`;
    }else{
        result = `La base de donnée de V4 choisi a ${allValV4.length - allValV5.length} schémas de plus que la base de donnée V5 choisi.\r\n`;
    }

    document.querySelector("#comparaisonStockSchemas").setAttribute('style', 'white-space: pre;');
    // ajout du contenu comparé
    document.querySelector("#comparaisonStockSchemas").textContent = result + "Voici les schémas qui sont similaires entre les deux bases de données :\r\n";

    for(let i = 0; i < schemasSimilaire.length; i++){
        document.querySelector("#comparaisonStockSchemas").textContent += schemasSimilaire[i] + "\r\n";
    };

    // console.log(schemasSimilaire);
}


document.getElementById("compareSchemas").addEventListener("click", compareSchemas);
document.getElementById("hideCompareSchemas").addEventListener("click",function(){
    document.querySelector("#comparaisonStockSchemas").textContent = "";
})
