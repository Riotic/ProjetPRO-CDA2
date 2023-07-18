const Data = require('../../database/models/connectionString.models');

// Dynamic attribution of pools
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

// Function to get another order that is not ascii when sorting a array. Takes a array and row to determine what to sort
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
        return -1; // B is greater sorting it after in the arr
      } else if (matchB) {
        return 1; // A is greater sorting it after in the arr
      } else {
        return 0; // Both are equals, not doing anything
      }
    });
}

module.exports = {
    getDataByName: getDataByName,
    customSortByRow: customSortByRow,
};
