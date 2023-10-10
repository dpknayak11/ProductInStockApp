require('dotenv').config()
const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const sequelizedb = require('./conections/database')
const errorcontroller = require('./controllers/404')
const todoListForm = require('./routes/todoList');

const app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(todoListForm)

app.use(errorcontroller.get404);

const port = process.env.PORT;

sequelizedb
.sync()
// .sync({force: true})
.then(() => { 
   app.listen(port , ()=> console.log(`Listening on ${port}`));
 })
.catch((err) => { console.log(err) });