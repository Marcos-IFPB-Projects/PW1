const express = require('express')
const cors = require('cors')
const db = require('./database/database')
const router = express.Router();

const app = express()
app.use(express.json())
app.use(cors());
app.use(express.static(__dirname + '/public'));
const port = 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`)
})


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.post('/pontos', db.addPonto)
app.get('/getPonto', db.getPonto)
app.delete('/getPonto', db.removePonto)
app.get('/', function (req, res)
{
    res.render('index.html');
});
