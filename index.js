var app = require('./server/server.js');
var ReactDOM = require("react-dom")

var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);


ReactDOM.render(<App />, document.getElementById("app"))
