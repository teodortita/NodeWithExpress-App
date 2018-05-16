var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body-parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Express-validator Middleware
app.use(expressValidator());

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

var posts = [
    {
        author: "Gabriel Alexandrescu",
        title: "Prajiturile cu ciocolata",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi felis magna, sodales commodo varius a, \
        pulvinar ac enim. Etiam vitae tortor eleifend, mollis magna id, venenatis purus. Nam vestibulum feugiat \
        condimentum. Nulla volutpat lacus et urna vehicula, eu accumsan nibh iaculis. Sed quis efficitur leo, in \
        malesuada sem. Etiam interdum velit justo, eget congue eros molestie sit amet. Nulla et tincidunt nibh.",
        date: "04/02/2018"
    },
    {
        author: "Laura Oprisan",
        title: "Masinile hybrid",
        date: "12/03/2018",
        content: "Nulla facilisi. Morbi urna mi, commodo a lacus at, rhoncus malesuada mi. Vivamus accumsan tempus \
        magna vitae pellentesque. Morbi rutrum risus ligula, ac posuere est finibus eu. Duis semper porta magna, \
        eget pulvinar neque lacinia vitae. Vestibulum luctus sollicitudin nisl, in hendrerit lacus vehicula eu. \
        Curabitur venenatis ipsum ut dignissim consectetur. Ut pellentesque vitae nulla eu finibus. Nulla facilisi. \
        Suspendisse sem nibh, tristique nec venenatis sed, fringilla at libero. Nullam et nisl eget urna sodales \
        semper sit amet eu ex. Quisque ut risus eget metus porta euismod. Nam imperdiet ipsum non tortor maximus, \
        non varius lacus commodo. Nam rutrum tellus metus, et luctus ex facilisis efficitur. Suspendisse ut augue \
        porta ex suscipit varius sed et metus."
    },
    {
        author: "Alin Popescu",
        title: "Cafeaua in ziua de azi",
        date: "10/05/2018",
        content: "Integer mi ante, luctus quis sagittis nec, rhoncus elementum magna. Morbi ultricies consequat urna. \
        Pellentesque at lorem sed neque sodales vehicula. Nam massa lectus, pharetra et feugiat non, pellentesque in \
        elit. Donec consectetur iaculis neque, ac pharetra turpis. Sed molestie mauris et arcu ultrices, vitae vehicula \
        erat rutrum. Quisque justo massa, rhoncus rhoncus imperdiet vitae, blandit vitae magna."
    }
]

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Posts',
        posts: posts
    });
})

app.post('/posts/add', function (req, res) {
    req.checkBody('author').notEmpty();
    req.checkBody('title').notEmpty();
    req.checkBody('content').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            title: 'Posts',
            posts: posts
        });
    }
    else {
        var nowDate = new Date(); 
        var formattedDate = nowDate.getDate()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getFullYear(); 
        var newPost = {
            author: req.body.author,
            title: req.body.title,
            content: req.body.content,
            date: formattedDate
        }
        posts.push(newPost);
        console.log('Success');
        res.render('index', {
            title: 'Posts',
            posts: posts
        });
    }
})

app.listen(3000, function () {
    console.log('Server started on port 3000...');
})