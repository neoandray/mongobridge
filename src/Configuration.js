require('dotenv').config();
const properties    = require('../config/properties.json');

class Configuration{

    constructor(){
    
      this.host         = process.env.MONGO_BRIDGE_HOST     ?? properties.host;
      this.port         = process.env.MONGO_BRIDGE_PORT     ?? properties.port;
      this.server       = process.env.MONGO_DB_SERVER       ?? properties.mongodbInfo.host;
      this.mongoPort    = process.env.MONGO_DB_PORT         ?? properties.mongodbInfo.port;
      this.username     = process.env.MONGO_DB_USER         ?? properties.mongodbInfo.username;
      this.password     = process.env.MONGO_DB_PASSWORD     ?? properties.mongodbInfo.password;
      this.replicaSet   = process.env.MONGO_DB_REPLICA_SET  ?? properties.mongodbInfo.replicaSet;
      this.database     = process.env.MONGO_DB_DATABASE     ?? properties.mongodbInfo.database;
      this.collections  = process.env.MONGO_DB_COLLECTIONS  ?? properties.mongodbInfo.collections;

     }

     


}

module.exports= Configuration;