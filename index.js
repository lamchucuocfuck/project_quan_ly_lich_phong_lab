const express = require('express')
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const mysql = require('mysql')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.use(morgan('combined'))

app.use(express.static('public'))

const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

const pool = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME,

})

pool.getConnection((err, connection) => {
  if(err) throw err;
  
})


app.get('', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})