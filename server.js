const express = require('express');
const app = express();
app.use(express.static('public'));


// const databaseProfile = new Datastore('databaseProfile.db');
// const databaseComment = new Datastore('databaseComment.db');
// const databaseAttributes = new Datastore('databaseAttributes.db');
// const databasePost = new Datastore('databasePost.db');

// databaseProfile.loadDatabase();
// databaseComment.loadDatabase();
// databaseAttributes.loadDatabase();
// databasePost.loadDatabase();



//Search profile using a function from database.js and return to client
app.get('/profile/name', (req, res) => {//Shld be working waiting on testing
  res.send((err, data) => { //Might change name to id but for now name is fine
    if (err) {
      response.end();
      return "Does not Exist";
    }
    // req.body should be a object like {name/id: "profile name/id to look up"}
    return lookUpProfile(req.body); //Some function that will find req.body based on the databse (function is in database.js) the function is not final
    // lookUpProfile is a work in progress function name.
  });

});

//Parse info appropriately then return to the correct function from databse.js and then return info to client.
app.post('/profile/new', (req, res) => { //request is a object with profile data
  const data = req.body;
  profileInsert(data);// Some function that inserts req.body into the appropriate database. (profile insert is a work in progress function atm)
  res.json({
    status: 'success'
  });
});

app.put('profile/edit', (req, res) => {
  const data = req.body.UpdateObject;
  databaseProfile.update(
  { name: data.name }, //Might change name to id but for now name is fine
  { $set: { data } },
  );

  res.json({
    status: 'success'
  });

});

app.put('profile/Attributes', (req, res, name, update) => {
  const data = req.body;
  databaseAttributes.update(
  { name: name }, //Might change name to id but for now name is fine
  { $set: { update} },
  );

  res.json({
    status: 'success'
  });

});

app.post('/post/new', (req, res) => {//request is a object with the new post
  const data = req.body; 
  databasePost.insert(data);
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

// app.remove('/post/delete', (req, res) => { 
//   const data = req.body; 
//   databasePost.remove(
//     {$expr: {$eq: [data, "$post"]}}


//   );
//   res.json({
//     status: 'success'
//   }); 

// });

app.listen(8080, () => console.log("Listening at 8080"));
