const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const bodyParser = require('body-parser');

const app = express();
///Users/cristina/src/2022H2TemplateFinal/client/build
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(REACT_BUILD_DIR));


const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  //res.json({ message: 'Hello from My template ExpressJS' });
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
 console.log('the get request succeeded')
});


//API for QR Code
app.get('/api/QR', async (req, res) => {
  const URL = "https://www.fruityvice.com/api/fruit/all";
  try {
    const apiRequest = await fetch(URL);
    const fruitInfo = await apiRequest.json();
    const names = fruitInfo.map(item => item.name); // Extract names from the array of objects
    console.log(names);
    res.send(names);
  } catch (err) {
    console.log(err);
  }
});











// create the GET requests
app.get('/api/users', async (req,res) => {

  try {
    const { rows: users } = await db.query('SELECT * FROM users').catch(err =>{(console.log('error with db query',err))});
 
    console.debug('users)', users);
    res.send(users);
  } catch (e) {
    console.debug({e})
    return res.status(400).json({ e });
  }
});


// API to sent up Authentication
app.post('/api/me', cors(), async (req, res) => {
  const newUser = {
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    email: req.body.email,
    password: req.body.password,

  }
  //console.log(newUser);

  const queryEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1';
  const valuesEmail = [newUser.email]
  const resultsEmail = await db.query(queryEmail, valuesEmail);
  if(resultsEmail.rows[0]){
    console.log(`Thank you ${resultsEmail.rows[0].firstname} for coming back`)
  } else{
  const query = 'INSERT INTO users(last_name, first_name, email, sub) VALUES($1, $2, $3, $4) RETURNING *'
  const values = [newUser.last_name, newUser.first_name, newUser.email, newUser.password]
  const result = await db.query(query, values);
  console.log(result.rows[0]);

  }

});


app.get('/api/orgs', cors(), async (req, res) => {

  try {
    const { rows: orgs } = await db.query('SELECT * FROM orgs');
    res.send(orgs);
  } catch (e) {
    return res.status(400).json({ e });
  }
});


app.get('/api/volunteering', cors(), async (req, res) => {

  try {
    const { rows: volunteering } = await db.query('SELECT * FROM volunteering');
    res.send(volunteering);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post('/api/users', cors(), async (req, res) => {
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  console.log([newUser.first_name, newUser.last_name, newUser.username, newUser.email, newUser.password]);
  const result = await db.query(
    'INSERT INTO users(first_name, last_name, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [newUser.first_name, newUser.last_name, newUser.username, newUser.email, newUser.password],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});


app.post('/api/orgs', async (req, res) =>{
  try {
      const {org_name, headquarters, phone, admin_email} = req.body;

      const result = await db.query(
      "INSERT INTO orgs (org_name, headquarters, phone, admin_email) VALUES ($1, $2, $3, $4) RETURNING *",
          [org_name, headquarters, phone, admin_email]
      );
      let dbResponse = result.rows[0];
      console.log(dbResponse)
      res.json(dbResponse);
  } catch(error){
      console.log(error);
      res.status(400).json({error});
  }
})

app.post('/api/volunteering', async (req, res) =>{
  try {
    const {org_id, user_id, volunteering_type, volunteering_description, start_date, end_date} = req.body;

    const result1 = await db.query(
    "INSERT INTO volunteering (org_id, user_id, volunteering_type, volunteering_description, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [org_id, user_id, volunteering_type, volunteering_description, start_date, end_date]
    );
    let dbResponse1 = result1.rows[0];
    console.log(dbResponse1)
    res.json(dbResponse1);
} catch(error){
    console.log(error);
    res.status(400).json({error});
}
})



//A PUT request
app.put('/api/users/:user_id', cors(), async (req, res) =>{
  console.log(req.params);
  //This will be the id that I want to find in the DB - the user to be updated
  const user_id = req.params.user_id
  const updatedUser = { id: req.body.id, first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password}
  console.log("In the server from the url - the user id", user_id);
  console.log("In the server, from the react - the user to be edited", updatedUser);
  // UPDATE users SET last_name = "something" WHERE id="16";
  const query = `UPDATE users SET last_name=$1, first_name=$2, email=$3, password=$4 WHERE user_id=${user_id} RETURNING *`;
  const values = [updatedUser.last_name, updatedUser.first_name, updatedUser.email, updatedUser.password];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);

  }catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})

app.put('/api/orgs/:org_id', cors(), async (req, res) =>{
  console.log(req.params);
  const org_id = req.params.org_id
  const updatedOrg = { id: req.body.id, org_name_name: req.body.org_name, headquarters: req.body.headquarters, phone: req.body.phone, admin_email: req.body.admin_email}
  console.log("In the server from the url - the org id", org_id);
  console.log("In the server, from the react - the org to be edited", updatedOrg);
  //UPDATE QUERY
  const query = `UPDATE org SET org_name=$2, headquarters=$3, phone=$4, admin_email=$5   WHERE id=${org_id} RETURNING *`;
  const values = [updatedOrg.org_name, updatedOrg.headquarters, updatedOrg.phone, updatedOrg.admin_email];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);

  }catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})
 
app.put('/api/volunteering/:volunteering_id', cors(), async (req, res) =>{
  console.log(req.params);
  //This will be the id that I want to find in the DB - the user to be updated
  const volunteering_id = req.params.volunteering_id
  const updatedVolunteer = { id: req.body.id, volunteering_type: req.body.volunteering_type, volunteering_description: req.body.volunteering_description, start_date: req.body.start_date, end_date: req.body.end_date}
  console.log("In the server from the url - the user id", volunteering_id);
  console.log("In the server, from the react - the user to be edited", updatedVolunteer);
  // UPDATE 
  const query = `UPDATE volunteering SET volunteering_type=$1, volunteering_description=$2, start_date=$3, end_date=$4, WHERE id=${volunteering_id} RETURNING *`;
  const values = [updatedUser.last_name, updatedUser.first_name, updatedUser.email, updatedUser.password];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);

  }catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})

// DELETE request for users
app.delete('/api/users/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  try {
    await db.query('DELETE FROM users WHERE id=$1', [user_id]);
    res.status(204).end(); // 204 means "No Content"
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// DELETE request for orgs
app.delete('/api/orgs/:org_id', async (req, res) => {
  const org_id = req.params.org_id;
  try {
    await db.query('DELETE FROM orgs WHERE id=$1', [org_id]);
    res.status(204).end(); // 204 means "No Content"
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// DELETE request for volunteering
app.delete('/api/volunteering/:volunteering_id', async (req, res) => {
  const volunteering_id = req.params.volunteering_id;
  try {
    await db.query('DELETE FROM volunteering WHERE id=$1', [volunteering_id]);
    res.status(204).end(); // 204 means "No Content"
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});




// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
