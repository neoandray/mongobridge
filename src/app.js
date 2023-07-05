const express       = require('express');
const Configuration = require('./Configuration');
const config        = new Configuration();
const MongoBridge   = require('./MongoBrigde')
const mongoBrg      =  new MongoBridge();
const app           = express();
const port          = config.port;
const host          = config.host;
const cors          = require('cors');



app.use(cors({
    origin: '*'
    , methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/', (req, res)=>{

    res.send(`Waiting for requests: http://${host}:${port}/data`)

})

app.get('/data/:collection', (req, res) => {

    let collection  =  req.params["collection"]?? ""
    let results     = {}
    results =  new Promise( (resolve)=>{
        let data =   mongoBrg.find(collection)
        resolve(data)
    }).catch((error)=>{
       res.send(error)
    }).then((data)=>{
        res.send(data)
    })

})

app.get('/data/:collection/:filter', (req, res) => {
      
      let collection  =  req.params["collection"]?? ""
      let query       =  req.params["filter"] ?? {}
      query           =  Object.getOwnPropertyNames(query).length > 0? JSON.parse(query):{}
      let results     = {}
      results =  new Promise( (resolve)=>{
        let data =   mongoBrg.find(collection,query)
        resolve(data)
        }).catch((error)=>{
        res.send(error)
        }).then((data)=>{
        res.send(data)
      })
   
  
})

app.post('/update', (req, res) => {
  
})

app.listen(port, () => {

  console.log(`Listening for requests: on http://${host}:${port}`)
})