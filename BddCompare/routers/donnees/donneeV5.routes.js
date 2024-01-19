const functionMods = require('../../private/functions/functionsMods');
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');

// ----------- données ---------------- //
router.post('/donneeV5', async (req, res) => {
    const data = req.body;
    const poolChoose = await functionMods.getDataByName(data.bdd);
    const poolDecided = new Pool({
      user: poolChoose.user,
      host: poolChoose.host,
      database: poolChoose.database,
      password: poolChoose.password,
      port: poolChoose.port, // le port par défaut pour PostgreSQL est 5432
    });
    const client = await poolDecided.connect();
    // console.log(data.schemaV5);
    // console.log(data.tableV5);
    // ${data.schemaV5}
    // poems_ticket26_ecoqav
    try {
      const getColumns = await client.query(`SELECT * FROM information_schema.columns WHERE table_schema = '${data.schemaV5}' AND table_name  = '${data.tableV5}';`);
      console.log(getColumns.rows[1]["column_name"]);
      const result = await client.query(`SELECT * FROM ${data.schemaV5}."${data.tableV5}" ORDER BY ${getColumns.rows[1]["column_name"]} ASC LIMIT 25 OFFSET ${(Number(data.startV5) - 1)};`);
      // console.log(result.rowCount);
      const tables = result.rows;
      // console.log(tables);
      poolDecided.end;
      res.send(tables);
  
    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
  
      // console.log(data.schemaV5); // Afficher les données de la requête dans la console
      // res.send("Data received");
  });

  module.exports = router;