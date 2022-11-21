const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { Pool } = require('pg');
let secrets;
secrets = require('./secrets.json');
const crud = require('./database');


app.use(express.static('public'))

/*app.get('/', (req, res) =>{

  res.render('./public/Index', {});

});*/


//Parse info appropriately then return to the correct function from databse.js and then return info to client.
app.post('/profile/new', (req, res) => { //request is a object with account data

  create(req.body, "accounts");// Some function that inserts req.body into the appropriate database.

  res.json({
    status: 'success'
  });
});

app.put('profile/edit', (req, res) => {//req.body shld be an object with {id: "someid to the profile", update: {values to be updated} }

  update(req.body, "accounts");// Some function that updates the profile with the specific id with the updates wanted

  res.json({
    status: 'success'
  });

});

app.put('profile/Attributes', (req, res) => {//req.body shld be an object with {id: "someid to the attributes", update: {values to be updated} }
  
  update(req.body, "attributes");

  res.json({
    status: 'success'
  });
});


app.post('/post/new', (req, res) => {//request is a object with the new post
  
  create(req.body, "posts");//function that will add req.body to the post table from database.js

  res.json({
    status: 'success'
  }); 
});

app.post('/comment/new', (req, res) => {//request is a object with the new comment
  
  create(req.body, "comments");

  res.json({
    status: 'success'
  }); 
});

//Search profile using a function from database.js and return to client
app.get('/profile/name', (req, res) => {//Shld be working waiting on testing
  
  res.send((err, data) => { //Might change name to id but for now name is fine
    if (err) {
      response.end();
      return "Does not Exist";
    }
    // req.body should be a object like {name/id: "profile name/id to look up"}
    return read(req.body, "accounts")// Some function that will find req.body based on the databse
  });
});

app.delete('/post/delete', (req, res) => { 
   //some function that removes the post from the database
   remove(req.body, "posts");

   res.json({
     status: 'success'
   }); 
});

app.delete('/comment/delete', (req, res) => {

//Deletes a comment from the comment database.
  remove(req.body, "comments");

});

app.delete('/profile/delete', (req, res) => { //req.body is like {id: "profile id", username: "profiles username"}

  remove(req.body, "profile")//removes user from profile table and all other tables associated with that user.

});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
