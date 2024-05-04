const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
  try {
    const { fields, table } = parseQuery(query);

    // Check if CSV file exists (optional)
    const fs = require('fs'); // Import file system module
    if (!fs.existsSync(`${table}.csv`)) {
      throw new Error(`CSV file not found: ${table}.csv`);
    }

    const data = await readCSV(`${table}.csv`);

    // Filter the fields based on the query
    return data.map(row => {
      const filteredRow = {};
      fields.forEach(field => {
        filteredRow[field] = row[field];
      });
      return filteredRow;
    });
  } catch (error) {
    console.error("Error executing query:", error.message);
    // You can throw a custom error here or return an empty result
    // throw new Error("An error occurred during query execution");
    return [];
  }
}

module.exports = executeSELECTQuery;
