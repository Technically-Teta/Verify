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
});

// create the get requests
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
      const {org_id, user_id, volunteering_type, volunteering_description, start_date, end_date} = req.body;

      const result = await db.query(
      "INSERT INTO events (org_id, user_id, volunteering_type, volunteering_description, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [org_id, user_id, volunteering_type, volunteering_description, start_date, end_date]
      );
      let dbResponse = result.rows[0];
      console.log(dbResponse)
      res.json(dbResponse);
  } catch(error){
      console.log(error);
      res.status(400).json({error});
  }
})










//A put request - Update a student 
app.put('/api/students/:studentId', cors(), async (req, res) =>{
  console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const studentId = req.params.studentId
  const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname}
  console.log("In the server from the url - the student id", studentId);
  console.log("In the server, from the react - the student to be edited", updatedStudent);
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id=${studentId} RETURNING *`;
  const values = [updatedStudent.lastname, updatedStudent.firstname];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);

  }catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})

// delete request
app.delete('/api/students/:studentId', cors(), async (req, res) =>{
  const studentId = req.params.studentId;
  //console.log("From the delete request-url", req.params);
  await db.query('DELETE FROM students WHERE id=$1', [studentId]);
  res.status(200).end();

});


// create the POST request for a new user
// CREATE TABLE users (
// 	ID SERIAL PRIMARY KEY,
// 	lastname varchar(255),
// 	firstname varchar(255),
//     email varchar(255), 
//     sub varchar(255));
app.post('/api/me', cors(), async (req, res) => {
  const newUser = {
    lastname: req.body.family_name,
    firstname: req.body.given_name,
    email: req.body.email,
    sub: req.body.sub

  }
  //console.log(newUser);

  const queryEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1';
  const valuesEmail = [newUser.email]
  const resultsEmail = await db.query(queryEmail, valuesEmail);
  if(resultsEmail.rows[0]){
    console.log(`Thank you ${resultsEmail.rows[0].firstname} for comming back`)
  } else{
  const query = 'INSERT INTO users(lastname, firstname, email, sub) VALUES($1, $2, $3, $4) RETURNING *'
  const values = [newUser.lastname, newUser.firstname, newUser.email, newUser.sub]
  const result = await db.query(query, values);
  console.log(result.rows[0]);

  }

});



// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
