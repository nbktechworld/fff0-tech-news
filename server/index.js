const express = require('express');

const app = express();

// Define the routes (API endpoints)
app.get('/articles', (req, res) => {
  res.send('Articles2');
});

app.get('/articles/:articleSlug', (req, res) => {
  res.send(`specific article ${req.params.articleSlug}`);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
