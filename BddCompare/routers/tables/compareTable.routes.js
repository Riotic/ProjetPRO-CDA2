const functionMods = require('../../private/functions/functionsMods');
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');

// comparaison de tables //
router.post('/compareTables', async (req, res) => {
    const data = req.body;
    const poolChooseV4 = functionMods.choosePool(data.bddV4);
    const poolDecidedV4 = new Pool({
      user: poolChooseV4.user,
      host: poolChooseV4.host,
      database: poolChooseV4.database,
      password: poolChooseV4.password,
      port: poolChooseV4.port, // le port par défaut pour PostgreSQL est 5432
    });
    const clientV4 = await poolDecidedV4.connect();
  
    const poolChooseV5 = functionMods.choosePool(data.bddV5);
    const poolDecidedV5 = new Pool({
      user: poolChooseV5.user,
      host: poolChooseV5.host,
      database: poolChooseV5.database,
      password: poolChooseV5.password,
      port: poolChooseV5.port, // le port par défaut pour PostgreSQL est 5432
    });
    const clientV5 = await poolDecidedV5.connect();
  
    try {
      // SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname = '${data.schemaV4}';
      // SELECT table_name FROM information_schema.tables WHERE table_schema = '${data.schemaV4}' ORDER BY table_name ASC;
  
      const resultV4 = await clientV4.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = '${data.schemaV4}' ORDER BY table_name ASC;`);
      // console.log(resultV4);
      const tablesV4 = resultV4.rows;
      console.log(tablesV4);
  
      const resultV5 = await clientV5.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = '${data.schemaV5}' ORDER BY table_name ASC;`);
  
      const tablesV5 = resultV5.rows;
      // console.log(tablesV5);
  
      let tablesSimilaire = [];
      for (let i = 0; i < tablesV4.length; i++) {
          for (let j = 0; j < tablesV5.length; j++) {
              if (tablesV4[i]["table_name"] === tablesV5[j]["table_name"]) {
                  tablesSimilaire.push(tablesV4[i]);
              }
          }
      }
      tablesSimilaire = tablesSimilaire.filter((x, i) => tablesSimilaire.indexOf(x) === i);
      // console.log(tablesSimilaire);
      poolDecidedV4.end;
      poolDecidedV5.end;
      res.send(tablesSimilaire);
    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
  
      // console.log(data.schemaV5); // Afficher les données de la requête dans la console
      // res.send("Data received");
  });

module.exports = router;