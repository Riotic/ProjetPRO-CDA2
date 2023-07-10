const functionMods = require('../../private/functions/functionsMods');
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');

// afficher le nombre de colonnes //
//  données //
router.post('/nbRows', async (req, res) => {
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
  
    // const poolChooseV5 = functionMods.choosePool(data.bddV5);
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
      const resultV5 = await clientV5.query(`SELECT * FROM ${data.schemaV5}."${data.tableV5}";`);
      const resultV4 = await clientV4.query(`SELECT * FROM ${data.schemaV4}."${data.tableV4}";`);
  
      let allDatas = {
        tailleRowV4: resultV4.rowCount,
        tailleRowV5: resultV5.rowCount
      };
  
      poolDecidedV4.end;
      poolDecidedV5.end;
      res.send(allDatas);
   
    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
  
  });

  module.exports = router;