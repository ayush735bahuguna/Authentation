const express = require('express');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const { notFound, errorHandler } = require('./Middleware/errorMiddleware');


const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

connectDB();

app.get("/", (req, res) => {
    res.send("Api is running");
})

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(5000, console.log("server started"));

