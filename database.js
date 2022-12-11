import pkg from 'pg';
const { Pool } = pkg;
import secrets from './secrets.json'assert {type: "json"};
const URL =  process.env.DATABASE_URL || secrets.URI;

const pool = new Pool({
    connectionString: URL,
    ssl: {
      rejectUnauthorized: false
    }
});

 pool.connect(
  err => {
    if(err) {
      console.error("connection error", err.stack)
    } else {
      console.log('connected')
    }
  }
);

export async function create (request, type){

  switch(type){
    case "accounts": 
      await pool.query('INSERT INTO accounts (name,username,password,email,phone,twitter,instagram,iscoach,address,salt) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', 
      [request.name,request.username,request.password,request.email,request.phone,request.twitter,request.instagram,request.iscoach,request.address,request.salt]);
      break;

    case "posts":
      await pool.query('INSERT INTO posts (id,profile_id,title,description,timeposted) VALUES ($1,$2,$3,$4,$5)',
      [request.id,request.profile_id,request.description, request.timeposted]);
      break;

    case "comments":
      await pool.query('INSERT INTO comments (id,commentor_id,post_id,description,timeposted) VALUES ($1,$2,$3,$4,$5)',
      [request.id,request.commentor_id,request.post_id,request.description,request.timeposted]);
      break;

    case "attributes":
      await pool.query('INSERT INTO attributes (id,profile_id,att1,att2,att3,att4,att5,att6) VALUES ($1,$2,$3,$4,$5)' ,
      [request.id,request.profile_id,request.att1,request.att2,request.att3,request.att4,request.att5,request.att6]);
      break;

    default:
      return "Invalid type";

  }

}

export async function read(request, type){
  
  switch(type){
    case "accounts":

      const data = await pool.query('SELECT * FROM accounts WHERE username = $1',[request.username] );
        return data;
    
      
    case "posts":
      const data2 = await pool.query(`SELECT * FROM posts WHERE id = $1`,[request.id]);
      return data2.rows[0];

    case "comments":
      const data3 = await pool.query(`SELECT * FROM comments WHERE id = $1`,[request.id]);
      return data3.rows[0];

    /*case "attributes":
      client.query('SELECT * FROM attributes', request);
      break;*/
      //not required per the api BUT could be usefull to implement later

    default:
      return "Invalid type";

  }

}

export async function update(request, type){
  
  switch(type){         
    case "accounts":
      pool.query(`UPDATE accounts SET name = $1, email = $2, phone = $3, address = $4 WHERE username = $5`,
      [request.name,request.email, request.phone, request.address,request.username]);
      break;

    case "attributes":
      pool.query(`UPDATE attributes SET att1 = $1, att2 = $2, att3 = $3, att4 = $4, att5 = $5, att6 = $6 WHERE id = $7`,
      [request.att1,request.att2,request.att3,request.att4,request.att5,request.att6,request.id]);
      break;

    default:
      return "Invalid type";

  }
}

export async function remove(request, type){
  
  switch(type){
    case "account":
      pool.query(`DELETE FROM accounts WHERE id = $1, AND username =$2`,[request.id,request.username]);
      pool.query(`DELETE FROM posts WHERE profile_id = $1`,[request.id]);
      pool.query(`DELETE FROM attributes WHERE profile_id = $1`,[request.id]);
      pool.query(`DELETE FROM comments WHERE commentor_id = $1`,[request.id]);
      break;

    case "attribute":
      pool.query(`DELETE FROM attributes WHERE profile_id =$1`,[request.id]);
      break;

    case "posts":
      pool.query(`DELETE FROM posts WHERE profile_id = $1`,[request.id]);

    case "comments":
      pool.query(`DELETE FROM comments WHERE commentor_id = $1`,[request.id]);
      
    default:
      return "Invalid type";

  }
}
