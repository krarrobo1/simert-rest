require('./config/config');
const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const { userRoute } = require('./routes/user');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(router);



mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true }, (err) => { if (err) console.log(err) });

app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000');
});