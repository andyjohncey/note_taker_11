const path = require("path");
const express = require("express");
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

// create an express server
const app = express();

// set an initial port
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
    const filePath = path.resolve(__dirname, '..', 'public', 'index.html');
    console.log(filePath);
    res.sendFile(filePath);
});

app.get('/notes', (_, res) => {
    const filePath = path.resolve(__dirname, '..', 'public', 'notes.html');
    // console.log(filePath);
    res.sendFile(filePath);
});

app.get('*', (_, res) => {
        res.Redirect('/');
});

// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: + ${PORT}`);
});