
function parseQuery(query) {
  const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = query.match(selectRegex);

  if (match) {
      const [, fields, table, whereString] = match;
      const whereClauses = whereString ? parseWhereClause(whereString) : [];
      return {
          fields: fields.split(',').map(field => field.trim()),
          table: table.trim(),
          whereClauses
      };
  } else {
      throw new Error('Invalid query format');
  }
}

function parseWhereClause(whereString) {
  const conditions = whereString.split(/ AND | OR /i);
  return conditions.map(condition => {
    // Split the condition, handling cases where there are not enough parts
    const parts = condition.trim().split(/\s+/);
    if (parts.length < 3) {
      throw new Error('Invalid condition format: ' + condition);
    }
    
    const [field, operator, value] = parts;
    return { field, operator, value };
  });
}

module.exports = parseQuery;
