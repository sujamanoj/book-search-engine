const { animals } = require("./data/animals.json");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api/animals", (req, res) => {
  res.json(animals);
});

function filterByQuery(query, animalsArray) {
  let filteredResults = animalsArray;
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animals) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animals) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animals) => animal.name === query.name
    );
  }
  return filteredResults;
}

app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
