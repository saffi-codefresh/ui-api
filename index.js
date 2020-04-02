console.log(`run index`);
const express = require('express');
const path = require('path');
const app = express();
//const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

const members = require('./Members');
const tasks = require('./Tasks');


// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Middleware
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Homepage Route
app.get('/', (req, res) => res.render('index', {
  title: 'Members & Tasks',
  members: members,
  tasks: tasks,
  debug: JSON.stringify({tasks:tasks, members:members})
}));


// set static folder - last
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());


// API Routes
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


