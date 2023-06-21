const { User } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    const users = userData.map((user) => user.get({ plain: true }));
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide a username, email, and password.' });
  }
  try {
    const userData = await User.create({ username, email, password });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.destroy({
      where: { id },
    });
    if (!userData) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const userData = await User.update(
      { username, email, password },
      { where: { id } }
    );
    if (!userData) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, createUser, deleteUser, updateUser };
