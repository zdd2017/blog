const express = require('express');
const app = express();
const routeMiddleware = require('./routes');

// app.get('/', (req,res) => {
//   res.send('hello world')
// });

routeMiddleware(app)

app.listen(3000);