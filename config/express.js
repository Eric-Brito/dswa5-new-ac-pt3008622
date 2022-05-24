var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var helmet = require('helmet');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function() {
    //Instância do Express
    var app = express();

    //Porta da aplicação	
    //app.set('port', 3000);
    app.set('port', process.env.PORT || 3000);

    //Middleware
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    //Definir Engine para a View
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(cookieParser());
    app.use(session({
        secret: 'campus pirituba',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    //Habilitará todos os Middlewares
    //app.use(helmet()); 

    //Habilitar Middlewares específicos
    app.disable('x-powered-by');
    //app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());


    //Carregar pastas
    load('models', { cwd: 'app' })
        .then('controllers')
        .then('routes/auth.js')
        .then('routes')
        .into(app);

    app.get('*', function(req, res) {
        res.status(404).render('404');
    });

    return app;
};