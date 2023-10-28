const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
///Users/cristina/src/2022H2TemplateFinal/client/build
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  //res.json({ message: 'Hello from My template ExpressJS' });
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
 console.log('the get request succeeded')
});


// create the GET requests
app.get('/api/users', cors(), async (req, res) => {

  try {
    const { rows: users } = await db.query('SELECT * FROM users');
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
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
    'INSERT INTO students(first_name, last_name, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
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
    "INSERT INTO events (org_id, user_id, volunteering_type, volunteering_description, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
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
  const query = `UPDATE users SET last_name=$1, first_name=$2, email=$3, password=$4, WHERE id=${user_id} RETURNING *`;
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

// DELETE request
app.delete('/api/users/:user_id', cors(), async (req, res) =>{
  const user_id = req.params.user_id;
  //console.log("From the delete request-url", req.params);
  await db.query('DELETE FROM users WHERE id=$1', [user_id]);
  res.status(200).end();

  app.delete('/api/users/:org_id', cors(), async (req, res) =>{
    const org_id = req.params.org_id;
    //console.log("From the delete request-url", req.params);
    await db.query('DELETE FROM org WHERE id=$1', [org_id]);
    res.status(200).end();

});
app.delete('/api/users/:volunteering_id', cors(), async (req, res) =>{
  const volunteering_id = req.params.volunteering_id;
  //console.log("From the delete request-url", req.params);
  await db.query('DELETE FROM volunteer WHERE id=$1', [volunteering_id]);
  res.status(200).end();
});

});





// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
