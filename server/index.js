const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
});

app.listen(3001, () => {
    console.log('Yey, your server is running in port 3001');
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/getData", (req, res) => {
    const sqlSelect = "SELECT * FROM tblmovies";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/api/insert", (req, res) => {
    const moviename = req.body.moviename;
    const moviereview = req.body.moviereview;

    const sqlInsert = "INSERT INTO tblmovies (moviename, moviereview) VALUES (?,?)";
    db.query(sqlInsert, [moviename, moviereview], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Save successfully!");
        }
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const name = req.params.id;
    const sqlDelete = "DELETE FROM tblmovies WHERE id = ?";
    db.query(sqlDelete, name, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Deleted successfully!");
        }
    });
});