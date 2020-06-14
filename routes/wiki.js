const express = require('express')
const router = express.Router()

const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')
const { Page } = require('../models')


router.get('/', (req, res, next) => {
  //const pages = Page.findAll()
  res.send("got to /wiki")
})


// submits a new page to db
router.post('/', async (req, res, next) => {
  const page = new Page(req.body)
  try {
    await page.save();
    res.redirect('/');


  } catch (error) {
    next(error)
  }

})



//retreives the "add page" form
router.get('/add', (req, res, next) => {
  res.send(addPage())
})

module.exports = router
