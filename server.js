const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { Pool } = require('pg');
let secrets;
secrets = require('./secrets.json');
const crud = require('./database');


app.use(express.static('public'))

app.get('/', (req, res) =>{

  res.render('./public/Index');

})



.post('/post/new', (req, res) => {//request is a object with the new post
  const data = req.body; 
  //insert function that will add req.body to the database from database.js
  res.json({
    status: 'success'
  }); 
});

app.post('/comment/new', (req, res) => {//request is a object with the new comment
  const data = req.body; 
  databaseComment.insert(data);
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
    return //lookUpProfile(req.body); Some function that will find req.body based on the databse (function is in database.js) the function is not final
    // lookUpProfile is a work in progress function name.
  });
});

//Parse info appropriately then return to the correct function from databse.js and then return info to client.
app.post('/profile/new', (req, res) => { //request is a object with profile data
  const data = req.body;
 // Some function that inserts req.body into the appropriate database. (profile insert is a work in progress function atm)
  res.json({
    status: 'success'
  });
});

app.put('profile/edit', (req, res) => {
  const data = req.body

  //some function that updates the profile

  res.json({
    status: 'success'
  });
});

app.put('profile/Attributes', (req, res, name, update) => {
  const data = req.body;
  //some function that updates the profile

  res.json({
    status: 'success'
  });

});

app.delete('/post/delete', (req, res) => { 
   const data = req.body; 
   //some function that removes the post from the database
   res.json({
     status: 'success'
   }); 
});

app.post('/user/new', (req, res) => {

  //some function that will put the new user into users database.

});

app.get('/user/login', (req, res) => {

//some function that will return the user to be found and then return sucess at a match

});

app.get('/comment/delete', (req, res) => {

//Deletes a comment from the comment database.

});

app.delete('/user/profile/delete', (req, res) => {

//removes user from user base and all other bases associated with that user.

});

/*let password;
if(!process.env.PASSWORD) {
  secrets = require('./secrets.json');
  password = secrets.password;
} else {
  password = process.env.PASSWORD;
}*/

//Another way of doing it that involves password
/*const client = new Client({
  host: secrets.host,
  database: secrets.database,
  port: secrets.port,
  user: secrets.user,
  password: secrets.password,
});*/

const URL =  process.env.DATABASE_URL || secrets.URI;
const pool = new Pool({
    connectionString: URL,
    ssl: {
      rejectUnauthorized: false
    }
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect(
      err => {
        if(err) {
          console.error("connection error", err.stack)
        } else {
          console.log('connected')
        }
      }
    );
    const result = await client.query('SELECT * FROM test_table');//Stuff to test
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
