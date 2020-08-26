const express = require('express');
const config = require('config');

const app = express();
const PORT = process.env.PORT || config.get('port');

app.use(express.json({
    extended: false
}));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));