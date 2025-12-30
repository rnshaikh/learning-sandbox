import 'dotenv/config';
import express  from "express";
import nconf from "nconf";
import path from "path";
import cors from "cors";
import passport from 'passport';

import mongoConnection from "./config/dbConnection";
import v1Router from "routes";

nconf.argv()
   .env()
   .file({ file: path.resolve("config.json")});


const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api", v1Router);

app.get('/ping', (req, res)=>{
    res.status(200).send({"msg": "ok"})
});

const port = nconf.get('port');

app.listen(port, ()=>{
    console.log(`Listening On ${port}`)
});



