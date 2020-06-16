const express = require('express');
const router = express.Router();
const { Page, User } = require('../models')
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')


//retreives all users pages
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.send(userList(users))

  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id)
  //if no User.hasMany(Page, { foreignKey: 'authorId' })
  // const pages = await Page.findAll({
  //   where: {
  //     authorId: req.params.id
  //   }
  // })
  const pages = await user.getPages()
  try {
    res.send(userPages(user, pages))
  } catch (error) {
    next(error)
  }
})





module.exports = router
