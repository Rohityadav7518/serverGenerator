
   const express = require('express');
 const cors = require('cors');
  const morgan = require('morgan');

   const app = express();


   app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

   
app.get('/', (req, res) => {
    res.json({ message: "Welcome!" });
});
    
app.post('/data', (req, res) => {
    res.json({ message: "Data received!" });
});
    

 app.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:3000`);
  });
    