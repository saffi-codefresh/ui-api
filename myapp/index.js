console.log(`run index`);
const express = require('express');
const path = require('path');
const app = express();
//const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const {getDb} = require('./db');

const members = require('./Members');
const tasks = require('./Tasks');

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));


// Middleware
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Homepage Route
app.get('/', (req, res) =>
    members.getMembers().then(m => {
        res.render('index', {
            title: 'Members & Tasks',
            members: m,
            tasks: tasks,
            debug: JSON.stringify({tasks: tasks, members: m})
        })

    })
);


// set static folder - last
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());


// API Routes
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;

//
// (async () => {
//     try {
//         global.db = getDb();
//         app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//         ;
//     } catch (err) {
//         console.log(err.stack);
//     }
// })();
app.listen(PORT, () => console.log(`Server statrted on port ${PORT}`));
