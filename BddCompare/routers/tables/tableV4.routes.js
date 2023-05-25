const functionMods = require('../../private/functions/functionsMods');
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');

// ----------- tables ---------------- //
router.post('/tablesV4', async (req, res) => {
    const data = req.body;
    const poolChoose = functionMods.choosePool(data.bdd);
    const poolDecided = new Pool({
      user: poolChoose.user,
      host: poolChoose.host,
      database: poolChoose.database,
      password: poolChoose.password,
      port: poolChoose.port, // le port par défaut pour PostgreSQL est 5432
    });
  
    const client = await poolDecided.connect();
    console.log(data.schemaV4);
    // ${data.schemaV4}
    // poems_ticket26_ecoqav
    try {
      const result = await client.query(`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = '${data.schemaV4}' ORDER BY table_name ASC;`);
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