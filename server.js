const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mint@5525",
    database: "aloha12"
})

con.connect(err => {
    if(err) throw(err);
    else{
        console.log("MySQL connected");
    }
})

const queryDB = (sql) => {
    return new Promise((resolve,reject) => {
        // query method
        con.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}
// 
app.post('/regisDB', async (req,res) => {
    let sql_user = `SELECT username,email FROM aloha12.userInfo WHERE username ='${req.body.username}'`;
    let result_user = await queryDB(sql_user);//ส่งsqlไปให้mysqlทำ
    let sql_email = `SELECT username,email FROM aloha12.userInfo WHERE email='${req.body.email}'`;
    let result_email = await queryDB(sql_email);//ส่งsqlไปให้mysqlทำ
    console.log("Let regist!");

//สร้างตาราง
    if (result_user == "" && result_email == "") {//ไม่มีข้อมูลusernameนี้อยู่
        sql = `INSERT INTO aloha12.userInfo (username,firstname,lastname,username,gender,birthday,email,password) VALUES (""${req.body.username}",${req.body.firstname}","${req.body.lastname}","${req.body.gender}","${req.body.birthday}","${req.body.email}","${req.body.password}")`;
        result = await queryDB(sql);
        console.log("Register Success!");
        res.redirect('index.html');
        console.log(result);
    }
    else {
        console.log("This account is already used!")
        res.redirect("index.html");
    }
})
    app.post('/checkLogin',async (req,res) => {
        console.log("Let login!");
        let sql = `SELECT username,password,img FROM userInfo WHERE username='${req.body.username}' `
        let result = await queryDB(sql);
        if (result[0].username == req.body.username && result[0].password == req.body.password) {
            res.cookie('username', req.body.username, { maxAge: 86400000 }, 'path=/');
            res.cookie('img', result[0].img, { maxAge: 86400000 }, 'path=/');
            console.log("Login success!");
            return res.redirect('Feed.html');
        } else  {
            return res.redirect('index.html?error=1');
        }
        
    })
   
    
     app.listen(port, hostname, () => {
            console.log(`Server running at   http://${hostname}:${port}/index.html`);
    });
