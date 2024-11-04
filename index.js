const express = require('express');
const path = require('path');

const mainRoutes = require('./server/routes/mainRoutes');
const postsRoutes = require('./server/routes/postsRoutes');
const apiRoutes = require("./server/routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.use('/posts', postsRoutes);
app.use('/api', apiRoutes);
app.use('/', mainRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
