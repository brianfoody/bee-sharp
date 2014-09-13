var connect = require('connect')
var serveStatic = require('serve-static')

var app = connect()

app.use(serveStatic('dist/', {'index': ['index.html', 'default.htm']}))
app.listen(8080)

console.log('Listening on port 8080.');