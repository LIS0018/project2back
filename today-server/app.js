const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row){
	return {
	 year: row.year,
	month: row.month,
		day: row.day,
		username: row.username,
		message: row.message,
		id: row.id,
		
	};
}

app.get('/memories/:month/:day', (request, response) =>{
	const query = 'SELECT *  FROM memory WHERE is_deleted =0 AND month = ? AND day = ?';
		const params = [request.params.month, request.params.day];
	connection.query(query, params, (error, rows) =>{
		response.send({
		 ok: true,
	         memories: rows.map(rowToObject),
		});
	});
});

app.post('/memories', (request, response) =>{
       const query = 'INSERT INTO memory(year, month, day, username, message) VALUES (?, ?, ?, ?, ?)';
	const params = [request.body.year, request.body.month, request.body.day, request.body.username, request.body.message];
	connection.query(query, params, (error, result) => {
	response.send({
	 ok: true,
		id: result.insertId,
	});
	});
});

app.patch('/memories/:id', (request, response) => {
   const query = 'UPDATE memory SET year = ?, month = ?, day = ?,username = ?, message = ? WHERE id= ?';
	const params = [request.body.year, request.body.month, request.body.day, request.body.username, request.body.message, request.params.id];
	connection.query(query, params, (error, result) => {
	  response.send({
	   ok: true,
		  
	  });
	});
});

app.delete('/memories/:id', (request, response) => {
  const query = 'UPDATE memory SET is_deleted =1 WHERE id= ?';
	const params = [request.params.id];
	connection.query(query, params, (error, result) =>{
		response.send({
		 ok: true,
		});
	});
});

const port = 3443;
app.listen(port, () => {
  console.log(`We are live on port ${port}!`);
});
