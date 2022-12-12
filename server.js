import express from 'express';
const app = express();
import secrets from './secrets.json'assert {type: "json"};
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as crud from './database.js';
import { MiniCrypt } from "./miniCrypt.js";
const mc = new MiniCrypt();
import pkg from 'pg';
const { Pool } = pkg;

const PORT = process.env.PORT || secrets.port;
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


app.use( express.json() );
app.use('/', express.static('./public'));


app.post('/profile/new', async (req, res) => { //All done

const checkAcc = await crud.read(req.body, "accounts");


if(checkAcc.rows.length > 0){
  res.send({error:"Account already exists"});
  res.end()

}else{
  const [salt,hash] = mc.hash(req.body.password);

  req.body.salt = salt;
  req.body.password = hash;  

  crud.create(req.body, "accounts");

  res.json(JSON.stringify({
    status: 'success'
  }));
  res.end();
  }

  res.end();

});

app.put('/profile/edit', (req, res) => {  //All done

  crud.update(req.body);

  res.json({
    status: 'success'
  });
  res.end()

});

app.get('/post/comment/get', async (req, res) => {
  
  const posts = await pool.query("SELECT * FROM posts ORDER BY timeposted ASC");
  const comments = await pool.query("SELECT * FROM comments ORDER BY post_id ASC");
  res.send({send: [posts, comments]});
  res.end();

});


app.post('/post/new', async (req, res) => {
  
  await crud.create(req.body, "posts");

  res.json({
    status: 'success'
  }); 

});

app.post('/comment/new', async (req, res) => {
  
  await crud.create(req.body, "comments");

  res.json({
    status: 'success'
  }); 
});

app.put('/profile/name', async (req, res) => { //all done

const result = await crud.read(req.body, "accounts");

res.send(result.rows[0]);
res.end();

});


app.post('/login/name', async (req, res) => { //all done

  const checkPassword = req.body.passwords;
  const checkUsername = req.body.username;
  
  if(checkUsername && checkPassword){

    pool.query('SELECT * FROM accounts WHERE username = $1',[checkUsername], function(error,results){
      
      if(error) throw error

      if (results.rows.length == 0){
        res.send({error:"Account does not exist"});
        res.end();
      }
      else{

        results = results.rows[0];

        if (mc.check(checkPassword,results.salt,results.password)) {
          res.send(results);
        } else {
          res.send({error:'Incorrect Username and/or Password!'});
        }			
        
        res.end();
    }});
  
  } else {
    res.send({error:'Please enter Username and Password!'});
		res.end();
  }
});


app.delete('/profile/delete', (req, res) => { //all done

  crud.remove(req.body);
  res.json({
    status: 'success'
  }); 
  res.end();

});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './public') });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
