const { Pool, Client } = require('pg');
let secrets = require('./secrets.json');
const URL =  process.env.DATABASE_URL || secrets.URI;

const pool = new Pool({
    connectionString: URL,
    ssl: {
      rejectUnauthorized: false
    }
});

const client = pool.connect(
  err => {
    if(err) {
      console.error("connection error", err.stack)
    } else {
      console.log('connected')
    }
  }
);

//create function
exports.create = async function (request, type){

  switch(type){
    case "accounts": 
      await pool.query('INSERT INTO accounts (name,username,password,email,phone,twitter,instagram,iscoach) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', 
      [request.name,request.username,request.password,request.email,request.phone,request.twitter,request.instagram,request.iscoach]);
      break;

    case "posts":
      await pool.query('INSERT INTO posts', request);
      break;

    case "comments":
      await pool.query('INSERT INTO comments', request);
      break;

    case "attributes":
      await pool.query('INSERT INTO attributes', request);
      break;

    default:
      return "Invalid type";

  }

}

//read function
exports.read = async function (request, type){
  
  switch(type){
    case "accounts":
      const data = await pool.query(`SELECT username FROM accounts WHERE username = ${request.username}`);
      return data;

    /*case "posts":
      client.query(`SELECT id FROM posts WHERE id = ${request}`);
      break;

    case "comments":
      client.query(`SELECT id FROM comments WHERE id = ${request}`);
      break;

    case "attributes":
      client.query('SELECT * FROM attributes', request);
      break;*/
      //not required per the api BUT could be usefull to implement later

    default:
      return "Invalid type";

  }

}

//update function
exports.update = async function(request, type){
  
  switch(type){
    case "accounts":
      pool.query(`UPDATE accounts SET ${request.update} WHERE id = ${request.id} `);
      break;

    case "attributes":
      pool.query(`UPDATE attributes SET ${request.update} WHERE id = ${request.id} `);
      break;

    default:
      return "Invalid type";

  }
}

//delete function
exports.remove = async function(request, type){
  
  switch(type){
    case "account":
      pool.query(`DELETE FROM accounts WHERE id = ${request.id} and username =${request.username}`);
      pool.query(`DELETE FROM posts WHERE profile_id = ${request.id}`);
      pool.query(`DELETE FROM attributes WHERE profile_id = ${request.id}`);
      pool.query(`DELETE FROM comments WHERE commentor_id = ${request.id}`);
      break;

    case "attribute":
      pool.query(`DELETE FROM attributes WHERE profile_id = ${request.id}`);
      break;

    case "posts":
      pool.query(`DELETE FROM posts WHERE profile_id = ${request.id}`);

    case "comments":
      pool.query(`DELETE FROM comments WHERE commentor_id = ${request.id}`);
      
    default:
      return "Invalid type";

  }
}

