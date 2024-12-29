import mongoose from "mongoose";


export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName:"MERN-STACK-JOB-SEEKING"
    }).then(()=>{
        console.log(`Connected To Database `);
    }).catch((err)=>{
        console.log(`Error in connecting to the database: ${err}`);
        
    })
}