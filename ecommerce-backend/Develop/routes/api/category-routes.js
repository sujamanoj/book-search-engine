const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err.message);
  
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json({message: `Category Posted`});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body, {
      where: {id:req.params.id},
  }).then(function(updateCategory) {
  res.json({message: `Category Updated`})
  })
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'Category Deleted!' });
      return;
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
