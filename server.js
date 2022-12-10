import express from 'express';
const app = express();
import secrets from './secrets.json'assert {type: "json"};
const PORT = process.env.PORT || secrets.port;
import * as path from 'path';
import * as crud from './database.js';
import { MiniCrypt } from "./miniCrypt.js";
import { checkPrime } from 'crypto';
const mc = new MiniCrypt();



app.use( express.json() );
app.use('/', express.static('./public'));

//Parse info appropriately then return to the correct function from databse.js and then return info to client.
app.post('/profile/new', (req, res) => { //request is a object with account data
  
  
  const [salt,hash] = mc.hash(req.body.password);

  req.body.salt = salt;
  req.body.password = hash;  

  crud.create(req.body, "accounts");// Some function that inserts req.body into the appropriate database.


  res.json(JSON.stringify({
    status: 'success'
  }));

});

app.put('profile/edit', (req, res) => {//req.body shld be an object with {id: "someid to the profile", update: {values to be updated} }

  crud.update(req.body, "accounts");// Some function that updates the profile with the specific id with the updates wanted

  res.json({
    status: 'success'
  });

});

app.put('profile/Attributes', (req, res) => {//req.body shld be an object with {id: "someid to the attributes", update: {values to be updated} }
  
  crud.update(req.body, "attributes");

  res.json({
    status: 'success'
  });
});


app.post('/post/new', (req, res) => {//request is a object with the new post
  
  crud.create(req.body, "posts");//function that will add req.body to the post table from database.js

  res.json({
    status: 'success'
  }); 
});

app.post('/comment/new', (req, res) => {//request is a object with the new comment
  
  crud.create(req.body, "comments");

  res.json({
    status: 'success'
  }); 
});


app.put('/profile/name', async (req, res) => {

const result = await crud.read(req.body, "accounts");

res.send(result);

});


app.put('/login/name', async (req, res) => {

  const check = req.body.passwords;

  const response = await crud.read(req.body, "accounts");
  
  if(mc.check(check ,response.salt,response.password)){
    res.send(response);
  }
  else{
    res.send("Not Valid Password");
  }
  

  
  
});

app.delete('/post/delete', (req, res) => { 
   //some function that removes the post from the database
   crud.remove(req.body, "posts");

   res.json({
     status: 'success'
   }); 
});

app.delete('/comment/delete', (req, res) => {

//Deletes a comment from the comment database.
  crud.remove(req.body, "comments");

});

app.delete('/profile/delete', (req, res) => { //req.body is like {id: "profile id", username: "profiles username"}

  crud.remove(req.body, "profile")//removes user from profile table and all other tables associated with that user.

});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
