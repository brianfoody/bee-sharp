var connect = require('connect')
var serveStatic = require('serve-static')

var app = connect()

var port = process.env.PORT || 8080;

app.use(serveStatic('dist/', {'index': ['index.html', 'default.htm']}))
app.listen(port)