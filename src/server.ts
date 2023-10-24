import http from "http";

import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { dbConnection } from "../src/config/databaseConeection";
import { globalError } from "./middleware/globalError.middleware";


dotenv.config();
dbConnection();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("new user connect")
});

//global error
app.use(globalError)

const PORT = process.env.PORT || 5000
const server = httpServer.listen(PORT, () => {
    console.log("app listen in port 5000")
});

process.on("unhandledRejection", (error: Error) => {
    console.log(`unhandledRejection : ${error.name} : ${error.message}`);
    server.close(() => {
        console.log("server shutdown");
        process.exit(1);
    });
});
