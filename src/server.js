const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "credentials",

})

app.post('/login', (req,res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";

    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length >0 ){
            return res.json("Login Successful")
        } else{
            return res.json("Not Valid")
        }
    })
})

app.listen(8801, () => {
    console.log("Listening...")
})