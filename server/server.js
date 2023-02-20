const express = require("express")
const app = express()
const bodyParser = require("body-parser")
bodyParser.urlencoded({extended:true})
app.use(bodyParser.json())

const dotenv = require("dotenv")
const path = require("path")
dotenv.config({path:path.join(__dirname,"config.env")})

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Database connected");
})

const cors = require("cors")
const whitelist = ["http://127.0.0.1:3000", "localhost", "http://localhost:3000"];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true};

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use("/api/auth",cors(corsOptionsDelegate),require("./routes/auth"))
app.use("/api/user",cors(corsOptionsDelegate),require("./routes/user"))



const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Listening at "+PORT)
})
