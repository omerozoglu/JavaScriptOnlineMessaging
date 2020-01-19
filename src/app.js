const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


//Listening to the server
app.listen(3000);



/*
{
    _id:Number,
    data:String,
    user_id:Number,
    date_time:String;

}*/