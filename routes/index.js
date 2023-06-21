const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

router.use('/api', require('./api'));

router.use('/', async (req, res) => {
  const data = await Post.findAll({
    include: [
      { model: User, foreignKey: 'user_id' },
      { model: Comment, foreignKey: 'post_id' },
    ],
  });
  const posts = data.map((post) => post.get({ plain: true }));
  console.log(posts);
  res.render('home', { posts });
});

module.exports = router;
