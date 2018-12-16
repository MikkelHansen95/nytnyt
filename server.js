const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const mc = mysql.createConnection({
    host: '139.59.143.10',
    user: 'Mikkel1',
    password: 'Stilldre1',
    database: 'parkingdb'
}); 
mc.connect();


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// Retrieve all todos 
app.get('/parking', function (req, res) {
    mc.query('SELECT * FROM parking ORDER BY id DESC LIMIT 1', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return res.send({ error: false, data: results, message: 'Todos list.' });
    });
});

 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(process.env.PORT || 5000);