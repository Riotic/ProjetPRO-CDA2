
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const ejs = require('ejs');


// attribution dynamique des pools
function choosePool(version){
  if(version == "localV5"){
    // connection BDD local projet-pro-demo-1
    let data = { 
      user: 'postgres',
      host: 'localhost',
      database: 'projet_pro_demo_1',
      password: 'root',
      port: 5432, 
    };
    return data;
  }else if(version == "localV4"){
        // connection BDD local projet-pro-demo-2
        let data = { 
          user: 'postgres',
          host: 'localhost',
          database: 'projet_pro_demo_2',
          password: 'root',
          port: 5432, 
        };
    return data;
  }

}




// ================================================================= Routes v4 ======================================================================================================================= //

// -----------schémas ---------------- //
router.post('/schemasV4', async (req, res) => {
  const data = req.body;
  const poolChoose = choosePool(data.bdd);
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

// ----------- tables ---------------- //
router.post('/tablesV4', async (req, res) => {
  const data = req.body;
  const poolChoose = choosePool(data.bdd);
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

// ----------- données ---------------- //
router.post('/donneeV4', async (req, res) => {
  const data = req.body;
  const poolChoose = choosePool(data.bdd);
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


// ================================================================= Routes v5 ======================================================================================================================= //


// -----------schémas ---------------- //
router.post('/schemasV5', async (req, res) => {
  const data = req.body;
  const poolChoose = choosePool(data.bdd);
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
    res.send(schemata);
    poolChoose.end;
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

// ----------- tables ---------------- //
router.post('/tablesV5', async (req, res) => {
  const data = req.body;
  const poolChoose = choosePool(data.bdd);
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

// ----------- données ---------------- //
router.post('/donneeV5', async (req, res) => {
  const data = req.body;
  const poolChoose = choosePool(data.bdd);
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


// ----------- comparaison  ---------------- //

//  données //
router.post('/compareData', async (req, res) => {
  const data = req.body;
  const poolChooseV4 = choosePool(data.bddV4);
  const poolDecidedV4 = new Pool({
    user: poolChooseV4.user,
    host: poolChooseV4.host,
    database: poolChooseV4.database,
    password: poolChooseV4.password,
    port: poolChooseV4.port, // le port par défaut pour PostgreSQL est 5432
  });
  const clientV4 = await poolDecidedV4.connect();

  const poolChooseV5 = choosePool(data.bddV5);
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
    // console.log(tablesV5[0]);

    const getColumnsV4 = await clientV4.query(`SELECT * FROM information_schema.columns WHERE table_schema = '${data.schemaV4}' AND table_name  = '${data.tableV4}';`);
    // console.log(getColumnsV4.rows[1]["column_name"]);
    const resultV4 = await clientV4.query(`SELECT * FROM ${data.schemaV4}."${data.tableV4}" ORDER BY ${getColumnsV4.rows[1]["column_name"]} ASC LIMIT 25 OFFSET ${(Number(data.startV4) -1)};`);
    const tailleV4 = resultV4.rowCount;
    // console.log(resultV4.rowCount);
    let tablesV4 = resultV4.rows;

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
        }
      }
    }


    for (const key in onlyIdentiques) {
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
    res.send(allDatas);
 
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }

    // console.log(data.schemaV5); // Afficher les données de la requête dans la console
    // res.send("Data received");
});



// tables //
router.post('/compareTables', async (req, res) => {
  const data = req.body;
  const poolChooseV4 = choosePool(data.bddV4);
  const poolDecidedV4 = new Pool({
    user: poolChooseV4.user,
    host: poolChooseV4.host,
    database: poolChooseV4.database,
    password: poolChooseV4.password,
    port: poolChooseV4.port, // le port par défaut pour PostgreSQL est 5432
  });
  const clientV4 = await poolDecidedV4.connect();

  const poolChooseV5 = choosePool(data.bddV5);
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


// afficher le nombre de colonnes //
//  données //
router.post('/nbRows', async (req, res) => {
  const data = req.body;
  const poolChooseV4 = choosePool(data.bddV4);
  const poolDecidedV4 = new Pool({
    user: poolChooseV4.user,
    host: poolChooseV4.host,
    database: poolChooseV4.database,
    password: poolChooseV4.password,
    port: poolChooseV4.port, // le port par défaut pour PostgreSQL est 5432
  });
  const clientV4 = await poolDecidedV4.connect();

  const poolChooseV5 = choosePool(data.bddV5);
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

