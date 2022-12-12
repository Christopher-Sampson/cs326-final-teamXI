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
      await pool.query('INSERT INTO accounts (name,username,password,email,phone,twitter,instagram,iscoach,address,salt,description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', 
      [request.name,request.username,request.password,request.email,request.phone,request.twitter,request.instagram,request.iscoach,request.address,request.salt,request.description]);
      break;

    case "posts":
      await pool.query('INSERT INTO posts (profile_id,title,description,timeposted) VALUES ($1,$2,$3,$4)',
      [request.username, request.title, request.description, request.timeposted]);
      break;

    case "comments":
      await pool.query('INSERT INTO comments (commentor_id,post_id,description,timeposted) VALUES ($1,$2,$3,$4)',
      [request.username, request.post_id, request.description,request.timeposted]);
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
      return data2;

    case "comments":
      const data3 = await pool.query(`SELECT * FROM comments WHERE id = $1`,[request.id]);
      return data3;

    default:
      return "Invalid type";

  }

}

export async function update(request){
      pool.query(`UPDATE accounts SET name = $1, email = $2, phone = $3, address = $4, description = $5 WHERE username = $6`,
      [request.name,request.email, request.phone, request.address,request.description,request.username]);
}

export async function remove(request){
      pool.query(`DELETE FROM accounts WHERE username =$1`,[request.username]);
}
