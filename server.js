const app = require('./app');
const databaseConnect = require('./config/database');
const dotenv = require('dotenv');

dotenv.config({path:"config/config.env"});

databaseConnect();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})