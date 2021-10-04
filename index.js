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

//read devices
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
//create device
app.post('/devices', (req, res) => {
    console.log(req.body);

    let category = req.body.category;
    let color = req.body.color;
    let partNumber = req.body.partNumber;

    const query = `insert into devices(category, color, partNumber) values('${category}','${color}','${partNumber}')`;

    database.query(query, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send({
            message: "device created",
        })
    })
})
//delete device
app.delete('/devices/:id', (req, res) => {
    let Id = req.params.id;

    const query = `delete from devices where id = '${Id}'`

    database.query(query, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send({
            message: "device deleted"
        })
    })
})

//read categories
app.get('/categories', (req, res) => {
    const query = "select * from categories";
    database.query(query, (error, result)=>{
        if(error){
            console.log(error);
        }
        if(result.length>0){
            res.send({
                message: "all categories",
                data: result
            })
        }
    });
})
//create category
app.post('/categories', (req, res) => {
    console.log(req.body);

    let name = req.body.name;

    const query = `insert into categories(name) values('${name}')`;

    database.query(query, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send({
            message: "category created",
        })
    })
})
//delete category
app.delete('/categories/:id', (req, res) => {
    let Id = req.params.id;

    const query = `delete from categories where id = '${Id}'`

    database.query(query, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send({
            message: "category deleted"
        })
    })
})
app.listen(3000, ()=>{
    console.log("server running");
})