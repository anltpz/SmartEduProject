const express = require('express');
const app = express();


//template ejs
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));


//routes

app.get('/', (req, res) => {
    res.status(200).render('index',{page_name:"index"});
}
);
app.get('/about', (req, res) => {
    res.status(200).render('about',{page_name:"about"});
}
);



app.listen(3000, () => {
    console.log('Server started on port 3000');
}
);

