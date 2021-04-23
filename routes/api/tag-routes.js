const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const allTagData = await Tag.findAll({
      attributes: ['id', 'tag_name',],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }],
    });
    res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name',],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }],
    });

    if(!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!'});
      return;
    };

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    const dbTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!dbTagData[0]) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    };

    res.json(dbTagData);
    
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!delTagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(delTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
