const functionMods = require('../../private/functions/functionsMods');
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');

// -----------schémas ---------------- //
router.post('/schemasV4', async (req, res) => {
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
    try {
      const result = await client.query("SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT LIKE 'pg_%' AND schema_name NOT IN ('public', 'information_schema') ORDER BY schema_name ASC");
      // console.log(res);
      const schemata = result.rows;
      // console.log(schemata);
      poolDecided.end;
      res.send(schemata);
  
    } catch (err) {
      console.error(err);
      poolDecided.end;
      res.send('Error ' + err);
    }
  });

  module.exports = router;