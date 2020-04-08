const path = require("path");
const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-Parser");
const shortid = require("shortid");

// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

// create an express server
const app = express();

const dbFilePath = path.resolve(__dirname, '.', 'db', 'db.JSON');

app.use(express.static("public"));

// set an initial port
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
    const filePath = path.resolve(__dirname, '.', 'public', 'index.html');

    console.log(filePath);
    res.sendFile(filePath);
});

app.get('/notes', (_, res) => {
    const filePath = path.resolve(__dirname, '.', 'public', 'notes.html');
    // console.log(filePath);
    res.sendFile(filePath);
});

app.get('/api/notes', async (_, res) => {
    const fileData = await fs.readfile(dbFilePath, "utf-8");
    const data = JSON.parse(fileData);
    res.json(data);

});

//id, title, text
app.post('/api/notes', async (req, res) => {
    const { title, text } = req.body;
        
    const fileData = await fs.readfile(dbFilePath, "utf-8");
    const data = JSON.parse(fileData);

    // res.json(data);
    res.end();
});
 

app.use('*', (_, res) => {
        res.redirect('/');
});

// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Router
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: + ${PORT}`);
});