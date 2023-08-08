
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        // const connect = mongoose.connect(process.env.NONGO_DB_URL, {
        const connect = await mongoose.connect("mongodb+srv://ayushbahuguna1122:9690903423@users.y1zcnln.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected ${connect.connection.host}`);

    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit();
    }
}


module.exports = connectDB;