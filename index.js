const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const mysql = require('mysql');

const app = express();

app.use(cors()); 

const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',     
    password: '',      
    database: 'mydatabse'
});


db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


const http = require("http");
const server = http.createServer((req,res) => {
    console.log("request made");
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});


app.get('/api/', (req, res) => {
    const sql = 'SELECT * FROM products'; // SQL query to fetch all products
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ error: 'Failed to fetch products' });
            return;
        }
        res.json(results); // Send the results back to the frontend as JSON
    });
});


// // Backend route to handle user signup
// app.post('/api/signup', async (req, res) => {
//     const { fullName, password } = req.body;

//     // Basic input validation on the backend (important!)
//     if (!fullName || !dob || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
       

//         const sql = 'INSERT INTO customers (name, password) VALUES (?, ?)';
//         db.query(sql, [fullName, dob, email, hashedPassword], (err, result) => {
//             if (err) {
//                 console.error('Error inserting user:', err);
//                 if (err.code === 'ER_DUP_ENTRY') {
//                     return res.status(409).json({ message: 'Email already exists.' });
//                 }
//                 return res.status(500).json({ message: 'Signup failed. Please try again later.' });
//             }
//             console.log('User created successfully');
//             res.status(201).json({ message: 'Signup successful!' });
//         });
//     } catch (error) {
//         console.error('Error :', error);
//         res.status(500).json({ message: 'Signup failed. Please try again later.' });
//     }
// });

// // Backend route to handle user login
// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     const sql = 'SELECT * FROM users WHERE email = ?';
//     db.query(sql, [email], async (err, results) => {
//         if (err) {
//             console.error('Error during login:', err);
//             return res.status(500).json({ message: 'Login failed. Please try again later.' });
//         }

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Invalid email or password.' });
//         }

//         const user = results[0];
//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (passwordMatch) {
//             // In a real application, you would generate and send a JWT here
//             return res.status(200).json({ message: 'Login successful!' });
//         } else {
//             return res.status(401).json({ message: 'Invalid email or password.' });
//         }
//     });
// });



app.post('/api/add', (req, res) => {
    const { name, number, text } = req.body;
  
    console.log('Received data:');
    console.log('Name:', name);
    console.log('Number:', number);
    console.log('Text:', text);


    const sql = 'INSERT INTO products (product_name, price, description) VALUES (?, ?, ?)';

    // Execute the query
    db.query(sql, [name, number, text], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).json({ message: 'Failed to save data.' });
        return;
      }


  
    // Here you would typically process the data, like saving it to a database
    // For this example, we'll just send a success message back
  
    res.json({ message: 'Data received successfully!' });


  });
  

});



app.post('/api/del', (req, res) => {
    const { name } = req.body;
  
    console.log('Received data:');
    console.log('Name:', name);
    

    const sql = 'DELETE FROM products WHERE product_name= ?';

    // Execute the query
    db.query(sql, [name], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).json({ message: 'Failed to save data.' });
        return;
      }


  
    // Here you would typically process the data, like saving it to a database
    // For this example, we'll just send a success message back
  
    res.json({ message: 'Data received successfully!' });


  });
  

});
