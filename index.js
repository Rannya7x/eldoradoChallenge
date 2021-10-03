const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "eldoradodb",
    port: 3306
})

database.connect( error => {
    if (error) {
        console.log(error);
    }
    console.log('banco conectado');
})

//all devices
app.get('/devices', (req, res) => {
    const query = "select * from devices";
    database.query(query, (error, result)=>{
        if(error){
            console.log(error);
        }
        if(result.length>0){
            res.send({
                message: "all devices",
                data: result
            })
        }
    });
})


app.listen(3000, ()=>{
    console.log("server running");
})