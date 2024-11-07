const express = require('express');
const path = require('path');

const mainRoutes = require('./server/routes/mainRoutes');
const apiRoutes = require("./server/routes/apiRoutes");
const adminRoutes = require("./server/routes/adminRoutes");

const connectDB = require('./server/data/mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);
app.use('/', mainRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
