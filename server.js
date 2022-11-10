const http = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const databaseProfile = new Datastore('databaseProfile.db');
const databaseComment = new Datastore('databaseComment.db');
const databaseAttributes = new Datastore('databaseAttributes.db');
const databasePost = new Datastore('databasePost.db');

databaseProfile.loadDatabase();
databaseComment.loadDatabase();
databaseAttributes.loadDatabase();
databasePost.loadDatabase();


app.get('/profile/name', (req, res) => {//Shld work
  
  res.send(databaseProfile.find({ name: req.body}, (err, data) => { //Might change name to id but for now name is fine
    if (err) {
      response.end();
      return "Does not Exist";
    }
    response.json(data);
  }));
});

app.post('/profile/new', (req, res) => { //request is a object with profile data
  const data = req.body;
  databaseProfile.insert(data);
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

app.remove('/post/delete', (req, res) => { 
  const data = req.body; 
  databasePost.remove(
    {$expr: {$eq: [data, "$post"]}}


  );
  res.json({
    status: 'success'
  }); 

});

app.listen(8080, () => console.log("Listening at 8080"));
