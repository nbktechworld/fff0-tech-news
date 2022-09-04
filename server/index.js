const cors = require('cors');
const express = require('express');
const defineRoutes = require('./defineRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json())

app.use('/assets', express.static('public'))
// Define the routes (API endpoints)
defineRoutes(app);

// Catch 404
app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  // usually todo here: Report the error to some error service for monitoring
  console.error(err);

  res.status(500).send({ error: 'Internal Server Error' });
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
