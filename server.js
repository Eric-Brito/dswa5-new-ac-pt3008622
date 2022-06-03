var http = require('http');
var app = require('./config/express')();
require('./config/passport')();
require('./config/database')('mongodb+srv://dswa5:dswa5@clusterone.g7xlk.mongodb.net/ifsp?retryWrites=true&w=majority');
require('./config/database.js')('mongodb://localhost/DSWA533');

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' + app.get('port'));
});
