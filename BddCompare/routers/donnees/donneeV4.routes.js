const functionMods = require('../../private/functions/functionsMods');
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');

// ----------- données ---------------- //
router.post('/donneeV4', async (req, res) => {
    const data = req.body;
    const poolChoose = functionMods.choosePool(data.bdd);
    const poolDecided = new Pool({
      user: poolChoose.user,
      host: poolChoose.host,
      database: poolChoose.database,
      password: poolChoose.password,
      port: poolChoose.port, // le port par défaut pour PostgreSQL est 5432
    });
    console.log(data.schemaV4);
    console.log(data.tableV4);
    const client = await poolDecided.connect();
    // ${data.schemaV4}
    // poems_ticket26_ecoqav
    try {
      const getColumns = await client.query(`SELECT * FROM information_schema.columns WHERE table_schema = '${data.schemaV4}' AND table_name  = '${data.tableV4}';`);
      const result = await client.query(`SELECT * FROM ${data.schemaV4}."${data.tableV4}" ORDER BY ${getColumns.rows[1]["column_name"]} ASC LIMIT 25 OFFSET ${(Number(data.startV4) - 1)};`);
      // console.log(result.rowCount);
      const tables = result.rows;
      // console.log(tables);
      poolDecided.end;
      res.send(tables);
      
    } catch (err) {
      console.error(err);
      poolDecided.end;
      res.send('Error ' + err);
    }
  
      // console.log(data.schemaV4); // Afficher les données de la requête dans la console
      // res.send("Data received");
  });

  module.exports = router;