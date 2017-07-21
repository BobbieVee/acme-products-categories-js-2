const express = require('express');

const app = express();

app.use('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening intently on port ${port}`))