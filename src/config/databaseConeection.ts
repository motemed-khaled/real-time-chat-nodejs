import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.URI!).then(con => {
        console.log(`database connected : ${con.connection.host}`)
    });
}