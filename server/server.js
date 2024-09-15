const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Serving static files (images, logos)
app.use(express.static(path.join(__dirname, '../public')));

// Helper function to read JSON data
const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, '../public/data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Helper function to find item by ID
const findById = (data, id) => data.find(item => item.id === parseInt(id, 10));

// Defining API routes
// -- ARTICLES
app.get('/api/articles', (req, res) => {
  res.json(readJsonFile('articles.json'));
});

app.get('/api/articles/:id', (req, res) => {
  const articles = readJsonFile('articles.json');
  const article = findById(articles, req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

// -- TEMOIGNAGES
app.get('/api/temoignages', (req, res) => {
  res.json(readJsonFile('temoignages.json'));
});

app.get('/api/temoignages/:id', (req, res) => {
  const temoignages = readJsonFile('temoignages.json');
  const temoignage = findById(temoignages, req.params.id);
  if (temoignage) {
    res.json(temoignage);
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

// -- PARTENAIRES
app.get('/api/partenaires', (req, res) => {
  res.json(readJsonFile('partenaires.json'));
});

app.get('/api/partenaires/:id', (req, res) => {
  const partenaires = readJsonFile('partenaires.json');
  const partenaire = findById(partenaires, req.params.id);
  if (partenaire) {
    res.json(partenaire);
  } else {
    res.status(404).json({ message: 'Partner not found' });
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
