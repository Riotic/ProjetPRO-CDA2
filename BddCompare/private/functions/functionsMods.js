// const Data = require('../database/models/connectionString.models');
const Data = require('../../database/models/connectionString.models');

// attribution dynamique des pools
async function getDataByName(dataName) {
  try {
    const data = await Data.findByDataName(dataName);
    if (data) {
      const jsonData = data.toObject();
      delete jsonData._id;
      delete jsonData.__v;
      return jsonData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la recherche de la donnée :', error);
    return null;
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
    getDataByName: getDataByName,
    customSortByRow: customSortByRow,
};
