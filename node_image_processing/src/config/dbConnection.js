import nconf from "nconf";
import path from "path";
import mongoose from "mongoose";

nconf.argv()
   .env()
   .file({ file: path.resolve("config.json")});

const db = nconf.get('MONGO_URL');
const maxPoolSize = parseInt(nconf.get('MAX_POOL_SIZE'));

console.log("Env", db)
mongoose.set('strictQuery', true);
const mongoConnection = mongoose.connect(db, {maxPoolSize: maxPoolSize, useNewUrlParser: true,  useUnifiedTopology: true  })
                          .then((conn)=>console.log("DB connected"))
                          .catch((err)=>{
                                          console.log(`Error:${err}`);
                                          throw err;
                                 });

export default mongoConnection;