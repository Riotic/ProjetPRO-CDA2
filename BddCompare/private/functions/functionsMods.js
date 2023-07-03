// attribution dynamique des pools
function choosePool(version){
  if(version == "poemsV4-formation"){
      // connection BDD poemsV4 formation Distante 	https://poems-formation.softia.ovh
    let data = { 
      user: 'softia',
      host: '192.168.10.55',
      database: 'poems_pdt',
      password: 'softia',
      port: 5432,
    };
    return data;
  }else if(version == "poemsV4-test2"){
    // connection BDD poemsV4 test Distante https://poems-test2.softia.ovh 
    let data = { 
      user: 'softia',
      host: '192.168.10.55',
      database: 'postgres',
      password: 'softia',
      port: 5432, 
    };
    return data;
  }else if(version == "poemsV5-integration"){
    // connection BDD poemsV5 Integration https://poems5-integration.softia.ovh/
    let data = { 
      user: 'softia',
      host: '192.168.10.248',
      database: 'poems-refonte',
      password: 'softia',
      port: 5432, 
    };
    return data;
  }else if(version == "poemsV5-test"){
    // connection BDD poemsV5 Distante https://poems5-test.softia.ovh/
    let data = { 
      user: 'softia',
      host: '192.168.10.249',
      database: 'poems-refonte',
      password: 'softia',
      port: 5432, 
    };
    return data;
  }else if(version == "localV5"){
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
  
  
function customSortByRow(arr, row) {
    const regex = /(\d+)/g;
  
    return arr.sort((a, b) => {
      const matchA = a[row].match(regex);
      const matchB = b[row].match(regex);
  
      if (matchA && matchB) {
        const numA = parseInt(matchA[0]);
        const numB = parseInt(matchB[0]);
        return numA - numB;
      } else if (matchA) {
        return -1; // La chaîne de b est considérée comme plus grande
      } else if (matchB) {
        return 1; // La chaîne de a est considérée comme plus grande
      } else {
        return 0; // Les deux chaînes n'ont pas de chiffres, donc considérées égales
      }
    });
}
  

module.exports = {
    choosePool: choosePool,
    customSortByRow: customSortByRow,
};
