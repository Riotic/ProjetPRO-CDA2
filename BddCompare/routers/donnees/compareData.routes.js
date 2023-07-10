const functionMods = require('../../private/functions/functionsMods');
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');

//  Comparaison données //
router.post('/compareData', async (req, res) => {
    const data = req.body;
    const poolChooseV4 = await functionMods.getDataByName(data.bddV4);
    const poolDecidedV4 = new Pool({
      user: poolChooseV4.user,
      host: poolChooseV4.host,
      database: poolChooseV4.database,
      password: poolChooseV4.password,
      port: poolChooseV4.port, // le port par défaut pour PostgreSQL est 5432
    });
    const clientV4 = await poolDecidedV4.connect();
  
    const poolChooseV5 = await functionMods.getDataByName(data.bddV5);
    const poolDecidedV5 = new Pool({
      user: poolChooseV5.user,
      host: poolChooseV5.host,
      database: poolChooseV5.database,
      password: poolChooseV5.password,
      port: poolChooseV5.port, // le port par défaut pour PostgreSQL est 5432
    });
    const clientV5 = await poolDecidedV5.connect();
  
    
    try {
      const getColumnsV5 = await clientV5.query(`SELECT * FROM information_schema.columns WHERE table_schema = '${data.schemaV5}' AND table_name  = '${data.tableV5}';`);
      // console.log(getColumnsV5.rows[1]["column_name"]);
      const resultV5 = await clientV5.query(`SELECT * FROM ${data.schemaV5}."${data.tableV5}" ORDER BY ${getColumnsV5.rows[1]["column_name"]} ASC LIMIT 25 OFFSET ${(Number(data.startV5) - 1)};`);
      const tailleV5 = resultV5.rowCount;
      // console.log(resultV5.rowCount);
      const nbCol = getColumnsV5.rowCount;
      let nameCols = [];
      for( let i= 0; i < nbCol; i++){
        nameCols.push(getColumnsV5.rows[i]["column_name"])
      };
      let tablesV5 = resultV5.rows;
      let forSort = nameCols[1];
  
      tablesV5 = functionMods.customSortByRow(tablesV5, forSort);
      // console.log(tablesV5[0]);
  
      const getColumnsV4 = await clientV4.query(`SELECT * FROM information_schema.columns WHERE table_schema = '${data.schemaV4}' AND table_name  = '${data.tableV4}';`);
      // console.log(getColumnsV4.rows[1]["column_name"]);
      const resultV4 = await clientV4.query(`SELECT * FROM ${data.schemaV4}."${data.tableV4}" ORDER BY ${getColumnsV4.rows[1]["column_name"]} ASC LIMIT 25 OFFSET ${(Number(data.startV4) -1)};`);
      const tailleV4 = resultV4.rowCount;
      // console.log(resultV4.rowCount);
      let tablesV4 = resultV4.rows;
      tablesV4 = functionMods.customSortByRow(tablesV4, forSort);
      const onlyIdentiques = {};
  
      // console.log(tablesV4);
      // console.log(tablesV5);
      let isBreaked = 0;
      for (const key in tablesV4) {
        if(key == 51){isBreaked = 1; break};
        const json1 = JSON.stringify(tablesV4[key]);
        // console.log(json1, "json 1");
        for (const key2 in tablesV5){
          if(key2 == 51){break};
          const json2 = JSON.stringify(tablesV5[key2]);
          // console.log(json2, "json 2");
      
          if (json1 === json2) {
            onlyIdentiques[key] = tablesV4[key];
            // console.log("onlyIdentiques[key]", onlyIdentiques[key]);
          }
        }
      }
  
  
      for (const key in onlyIdentiques) {
        // console.log(tablesV4, `display tablesV4 clés = ${key}`);
        // console.log(tablesV5, `display tablesV5 clés = ${key}`);
        delete tablesV4[key];
        delete tablesV5[key];
      }
      
      const difV4 = {};
      const difV5 = {};
      if(isBreaked = 1){
        for (let i=0; i <= 50; i++) {
          if(tablesV4[i]){ 
  
            difV4[i] = tablesV4[i];
            difV5[i] = tablesV5[i];
          }
        }
        if(difV4){ tablesV4 = difV4;}
        if(difV5){ tablesV5 = difV5;}
      }
  
      let allDatas = {
        dataDifV5: tablesV4,
        dataDifV4: tablesV5,
        dataIdentique: onlyIdentiques,
        tailleRowV4: resultV4.rowCount,
        tailleRowV5: resultV5.rowCount,
        numberOfCol: nbCol,
        nameOfCols: nameCols,
        nbStartV5: Number(data.startV5),
        nbStartV4: Number(data.startV4)
      };
      poolDecidedV4.end;
      poolDecidedV5.end;
      // console.log(allDatas);
      res.send(allDatas);
   
    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
  
      // console.log(data.schemaV5); // Afficher les données de la requête dans la console
      // res.send("Data received");
  });

  module.exports = router;