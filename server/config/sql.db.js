var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.RDS_USER, 
    password: process.env.PASSWORD,
    database: process.env.RDS_DATABASE
});

// console.log(pool);

exports.pool = pool;

exports.empty = function(procedure, values) {
    return callProcedure(procedure, values).then(function() {
        return;
    })
}

exports.row = function(procedure, values) {
    return callProcedure(procedure, values).then(function(result) {
        return result[0][0];
    })
}

exports.rows = function(procedure, values) {
    return callProcedure(procedure, values).then(function(results) {
        return results[0];
    })
}

//FUNC TO CREATE A QUERY STRING FOR MySQL
//ARGS ARE SUPPLIED FROM THE ARGS OF callProcedure() 
function queryString(procedure, values) {
  var query = "Call " + procedure + "(";
  for ( var i = 0; i < values.length; i++ ) {
    query += (i >= values.length - 1 ? "?" : "?," );
  }
  query += ")"
  console.log(query)
  return query;
}

//FUNC CALLS A SUPPLIED MySQL STORED PROCEDURE 
//ARGS ARE PASSED INTO THE FUNC CALL OF queryString()
function callProcedure(procedure, values) {
  return new Promise(function (fulfill, reject) {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log("MySQL connection err: " + err.message);
        reject(err)
      } else {
        connection.query(queryString(procedure, values), values, function(err, results) {
          connection.release(); 
          if (err) {
            reject(err) 
              console.log("MySQL query err: " + err.message);
          } else {
            fulfill(results);
          }
        })
      }
    })
  }) 
}