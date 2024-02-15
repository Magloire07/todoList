// load the things we need
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite module


const db = new sqlite3.Database('mydatabase.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the SQLite database. ');
      console.log('listining to port ',3000);

    }
  });
app.set('views', path.join(__dirname, 'views')); // Déclaration du dossier contenant les vues
app.use(express.static(path.join(__dirname,'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// // index page
app.post('/addTask', function(req, res) {
    // Handle form submission
    console.log('Received form data:', req.body);

    const { task, priority } = req.body;

    // Insert form data into SQLite database
    db.run(`INSERT INTO todolist (task, priority) VALUES (?, ?)`, [task, priority], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).json({ error: 'An error occurred while inserting data into the database.' });
        } else {
            console.log('Data inserted successfully.');
            // Envoyer une réponse JSON indiquant que l'opération a réussi
            // Maintenant, vous pouvez rendre la vue 'pages/index' après l'opération d'insertion
            res.render('pages/index');
        }
    });
});

app.get('/tasks', function(req, res) {
    // Récupérer les données depuis la base de données
    db.all('SELECT task, priority FROM todolist', [], (err, rows) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
            res.status(500).json({ error: 'An error occurred while retrieving data from the database.' });
        } else {
            console.log('Data retrieved successfully:', rows);
            // Envoyer les données récupérées en réponse
            res.json(rows);
        }
    });
});
// // index page
app.get('/', (req, res) => {
    res.render('pages/index'); // Définissez la valeur de showAddTask ici
});


app.listen(3000);
console.log('3000 is the magic port');

