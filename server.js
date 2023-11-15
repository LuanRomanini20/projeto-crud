//console.log('A força está com você!')

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb');
const app = express()
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://luan:romanini@cluster0.lz54ic8.mongodb.net/projcrud"

//código de conexão ao Mongo

MongoClient.connect(uri,(err,client)=> {

if (err)

return console.log(err)

db = client.db('clientes')

app.listen(3000,function(){

console.log('Servidor rodando na porta 3000')

})

})

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs')

app.get('/',(req, res) => {

res.render('index.ejs')
})
app.get('/',(req, res) => {
//leitura de dados
let cursor = db.collection('data').find()

})

app.get('/show', (req, res) => {

    db.collection('data').find().toArray((err, results) => {
    
    if (err) return console.log(err)
    
    res.render('show.ejs', { data: results })
    
    })
    
    })

app.post('/show',(req, res) => {

db.collection('data').save(req.body,(err,result) =>{

if (err) return console.log(err)

console.log('Salvo no banco de dados')

res.redirect('/show')

//leitura de dados
let cursor = db.collection('data').find().toArray((err, results) =>{
    console.log(results)
})

})

})

app.route('/edit/:id')

.get((req,res) => {

var id = req.params.id

db.collection('data').find(ObjectId(id)).toArray((err,result) => {

if (err) return res.send(err)

res.render('edit.ejs',{data:result})

})

})

.post((req,res) =>{

    var id = req.params.id
    
    var nome = req.body.nome
    
    var sobrenome = req.body.sobrenome
    
    db.collection('data').updateOne({_id: ObjectId(id)}, {
    
    $set: {
    
    txtname: nome,
    
    txtsobrenome: sobrenome
    
    }
    
    }, (err,result) => {
    
    if (err) return res.send(err)
    
    res.redirect('/show')
    
    console.log('Atualizando no Banco de Dados')
    
    })
    
    })

    app.route('/delete/:id')
    .get((req, res) => {
        var id = req.params.id

        db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
            if(err) return res.send(500, err)
            console.log('Deletando do Banco de Dados')
            res.redirect('/show')
        })
    })