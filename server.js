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

// Insert
app.post('/addTask', function(req, res) {
    // Handle form submission
    const { task, priority } = req.body;
    // Insert form data into SQLite database
    db.run(`INSERT INTO todolist (task, priority) VALUES (?, ?)`, [task, priority], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).json({ error: 'An error occurred while inserting data into the database.' });
        } else {
            console.log('Data inserted successfully.');
            // Envoyer une réponse JSON indiquant que l'opération a réussi
            // on recharge la liste des taches pour les envoyer 
            db.all('SELECT task, priority FROM todolist', [], (err, rows) => {
                if (err) {
                    console.error('Error retrieving data:', err.message);
                    res.status(500).json({ error: 'An error occurred while retrieving data from the database.' });
                } else {
                    console.log('Data retrieved successfully:', rows);
                    // Envoyer les données récupérées en réponse
                    //res.json(rows);
                    res.render('pages/index',{objets:rows}); // Définissez la valeur de showAddTask ici
            
                }
          });
        }
    });
});
//delete
app.post('/deleteTask', function(req, res) {
    console.log('Received form data:', req.body);
   var keys = Object.keys(req.body);
   // Création de la liste des paramètres pour la requête SQL (liste des titres)
   const params = keys.map(() => '?').join(',');
   const sql = `DELETE FROM todolist WHERE task IN (${params})`;
   db.run(sql, keys, function(err) {
    if (err) {
        return console.error(err.message);
    }
    // on renvoie la nouvelle list après avoir suprimer les taches 
   db.all('SELECT task, priority FROM todolist', [], (err, rows) => {
    if (err) {
        console.error('Error retrieving data:', err.message);
        res.status(500).json({ error: 'An error occurred while retrieving data from the database.' });
    } else {
        console.log('Data retrieved successfully:', rows);
        // Envoyer les données récupérées en réponse
        //res.json(rows);
        res.render('pages/index',{objets:rows}); // Définissez la valeur de showAddTask ici

    }
    });
  });
});
// edit 
app.post('/editTask', function(req, res) {
    // Handle form submission
    const { oldtask, task, priority } = req.body;

     // Supprimer l'ancienne tâche si elle a été mise à jour
    
     db.run(`DELETE FROM todolist WHERE task = ?`, [oldtask], (err) => {
        if (err) {
            console.error('Error deleting old task:', err.message);
            res.status(500).json({ error: 'An error occurred while deleting old task from the database.' });
            return;
        }
     }); 
    // Exécute la requête SQL pour insérer ou mettre à jour la tâche
    db.run(`INSERT INTO todolist (task, priority) VALUES (?, ?)`,[task, priority], (err) => {
        if (err) {
            console.error('Error inserting or updating data:', err.message);
            res.status(500).json({ error: 'An error occurred while inserting or updating data into the database.' });
        } else {
            console.log('Data inserted or updated successfully.');
           
            // Récupérer toutes les tâches après l'insertion/mise à jour
            db.all('SELECT task, priority FROM todolist', [], (err, rows) => {
                if (err) {
                    console.error('Error retrieving data:', err.message);
                    res.status(500).json({ error: 'An error occurred while retrieving data from the database.' });
                } else {
                    console.log('Data retrieved successfully:', rows);
                    // Envoyer les données récupérées en réponse
                    res.render('pages/index',{objets:rows}); // Définissez la valeur de showAddTask ici
                }
            });
        }
    });
});


// display
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

     // Récupérer les données depuis la base de données
     db.all('SELECT task, priority FROM todolist', [], (err, rows) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
            res.status(500).json({ error: 'An error occurred while retrieving data from the database.' });
        } else {
            console.log('Data retrieved successfully:', rows);
            // Envoyer les données récupérées en réponse
            //res.json(rows);
            res.render('pages/index',{objets:rows}); // Définissez la valeur de showAddTask ici

        }
    });
});

app.listen(3000);
console.log('3000 is the magic port');

