const { MongoClient }  = require('mongodb');
const Configuration    = require('./Configuration');
const config           = new Configuration();

 class  MongoBridge{

      constructor(){

         this.client    = null;
         this.database  = config.database;
         this.initMongoClient ();
      }

      async  find(  collection, query = {}){  

        console.log(`Searching for records in ${collection}`)

        const aggCursor                  = this.client.db(this.database).collection(collection).find(query);
        let results                      = []
        await aggCursor.forEach(data => {
            data._id = data._id.toString()
            results.push(data)
          });
          
         return results;
    }

    async  runPipeline( collection,  pipeline = []){  

        const aggCursor                  = this.client.db(this.database).collection(collection).aggregate(pipeline);

        let results = []
        await aggCursor.forEach( data => {
            data._id = data._id.toString()
            results.push(data)
          });
       
    }

    async   initMongoClient (){
        let    username           = config.username;
        let    password           = config.password;
        let    port               = config.mongoPort
        let    host               = config.host
        let    replicaSet         = config.replicaSet
        const uri                 = `mongodb://${username}:${password}@${host}:${port}?retryWrites=true&w=majority&replicaSet=${replicaSet}&directConnection=true`;
        this.client               =  new MongoClient(uri);

        if ( !this.client || !this.client.topology || this.client.topology.isConnected()){ 
            await this.client.connect();
       }

    }



        closeMongoClient(){
            this.client.close();
        }

}


module.exports = MongoBridge;