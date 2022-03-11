var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://Localhost:27017/myfitness')

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/details", (req, res)=>{
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('home1.html')
})

app.get("/",(req, res)=>{
    res.set({
        "Allow-access-Allow-origin": '*'
    })
    return res.redirect('/home.html');
}).listen(3000);

console.log("Listening on port 3000");