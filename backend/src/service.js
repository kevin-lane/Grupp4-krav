import { config } from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;
//Hämtar express
const express = require('express');
const app = express();

config()
//Refererar till port
const PORT = process.env.PORT || 3000;


//Säg till att det kommer i json fromat.
app.use(express.json());

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  user: process.env.PGUSER
})

//Check resonspe in console
app.use('/', (req, res) => {
    console.log({query: req.query});
    console.log({body: req.body});
    console.log({params: req.params});
    console.log({header: req.headers});
    res.send({status:"success"});

})



//Get request route
app.get('/create-game', (req, res) => {
    res.json({status: "sucess at create-game"});
});


//Lyssnar på porten

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
