import express, { urlencoded, json } from "express";
import { URL } from "./database/config.js";
import mongoose from 'mongoose';
import rotas  from './routes.js'

const app = express();

app.use(
    urlencoded({
        extended: true
    })
  );
  
  app.use(json());

app.use('/user', rotas)

mongoose.connect(URL.uri,  { useNewUrlParser: true }).then(
    console.log('connection up')
).catch((err) => console.log(err))

app.listen(3000,() => console.log('Server is running on port 3000!'));