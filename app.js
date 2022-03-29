const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const session = require('express-session');
const MongoStore = require('connect-mongo');




const app = express();


//connect db
mongoose.connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => {
    console.log(err);
});

// gloabal veriable
global.userIn=null;

//template ejs
app.set('view engine', 'ejs');

//middleware

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // body leri yakalamak icin kullanilir.
app.use(express.json());
app.use(session({
    secret: 'my_keyword_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:'mongodb://localhost/smartedu-db'}),

}));

//routes
app.use('*',(req,res,next)=>{
    userIn=req.session.userID;
    next();
});

app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);










app.listen(8080, () => {
    console.log('Server started on port 3000');
}
);

