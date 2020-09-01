const express = require('express');
const config = require('config');
const path = require('path')
const orders = require('./routes/api/orders');
const connectDB = require('./config/db');

const app = express();
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'pug');
const PORT = process.env.PORT || config.get('server.port');
connectDB();
app.use(express.json({
    extended: false
}));


app.get('/', (req, res) => {
    res.send(`<p><a href="${req.path}api" > Go here for API</a></p>`);
});
// API root, welcomes user
app.get('/api', (req, res) => res.send('Welcome to lamia-orders api.'));

// Available routes
app.use('/api/orders', orders);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));