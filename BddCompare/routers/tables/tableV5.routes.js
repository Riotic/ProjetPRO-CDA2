const functionMods = require('../../private/functions/functionsMods');
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');

// ----------- tables ---------------- //
router.post('/tablesV5', async (req, res) => {
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
    console.log(data.schemaV5);
    // ${data.schemaV4}
    // poems_ticket26_ecoqav
    try {
      const result = await client.query(`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = '${data.schemaV5}' ORDER BY table_name ASC;`);
      // console.log(result.rowCount);
      const tables = result.rows;
      // console.log(result.rows);
      res.send(tables);
      poolDecided.end;
    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
  
    
  
      // console.log(data.schemaV4); // Afficher les données de la requête dans la console
      // res.send("Data received");
});

module.exports = router;