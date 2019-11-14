const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const Recipe = require('./models/recipe');

const app = express();

// mongodb+srv://elbert:<password>@elbertcluster-wgasq.mongodb.net/test?retryWrites=true&w=majority
// $softwarE77
mongoose.connect(
  'mongodb+srv://elbertcluster-wgasq.mongodb.net/test?retryWrites=true&w=majority',
  { user: 'test', pass: 'nN9TpTCzoj5aEDU7', useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use(cors());
app.use(bodyParser.json());

app.get('/api/recipes', (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.status(200).json(recipes);
    });
});

app.get('/api/recipes/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(401).json({ error: err.message }));
});

app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time,
  });
  recipe.save()
    .then(() => {
      res.status(201).json({ message: 'Create record successfully' });
    })
    .catch((err) => {
      res.status(401).json({ error: err.message});
    });
});

app.put('/api/recipes/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      recipe.title = req.body.title;
      recipe.ingredients = req.body.ingredients;
      recipe.instructions = req.body.instructions;
      recipe.difficulty = req.body.difficulty;
      recipe.time = req.body.time;
      return recipe.save();
    })
    .then((recipe) => res.status(200).json({ message: 'Updated record successfully' }))
    .catch((err) => res.status(401).json({ error: err.message }));
});
app.delete('/api/recipes/:id', (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then((recipe) => res.status(200).json({ message: 'Deleted record successfully' }))
    .catch((err) => res.status(401).json({ error: err.message }));
});

module.exports = app;
