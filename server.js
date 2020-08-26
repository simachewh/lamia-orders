const express = require('express');
const orders = require('./routes/api/orders');
const config = require('config');

const app = express();
const PORT = process.env.PORT || config.get('port');

app.use(express.json({
    extended: false
}));

// API root, welcomes user
app.get('/api', (req, res) => res.send('Welcome to lamia-orders api.'));

// Available routes
app.use('/api/orders', orders);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));