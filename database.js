
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
async function create(request, type){

  switch(type){
    case "accounts":
      client.query('INSERT INTO accounts', request);
      break;

    case "posts":
      client.query('INSERT INTO posts', request);
      break;

    case "comments":
      client.query('INSERT INTO comments', request);
      break;

    case "attributes":
      client.query('INSERT INTO attributes', request);
      break;

    default:
      return "Invalid type";

  }

}

//read function
async function read(request, type){
  
  switch(type){
    case "accounts":
      const data = client.query(`SELECT username FROM accounts WHERE username = ${request}`);
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
async function update(request, type){
  
  switch(type){
    case "accounts":
      client.query(`UPDATE accounts SET ${request.update} WHERE id = ${request.id} `);
      break;

    case "attributes":
      client.query(`UPDATE attributes SET ${request.update} WHERE id = ${request.id} `);
      break;

    default:
      return "Invalid type";

  }
}

//delete function
async function remove(request, type){
  
  switch(type){
    case "account":
      client.query(`DELETE FROM accounts WHERE id = ${request.id} and username =${request.username}`);
      client.query(`DELETE FROM posts WHERE profile_id = ${request.id}`);
      client.query(`DELETE FROM attributes WHERE profile_id = ${request.id}`);
      client.query(`DELETE FROM comments WHERE commentor_id = ${request.id}`);
      break;

    case "attribute":
      client.query(`DELETE FROM attributes WHERE profile_id = ${request.id}`);
      break;

    case "posts":
      client.query(`DELETE FROM posts WHERE profile_id = ${request.id}`);

    case "comments":
      client.query(`DELETE FROM comments WHERE commentor_id = ${request.id}`);
      
    default:
      return "Invalid type";

  }
}
