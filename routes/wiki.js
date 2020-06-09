const express = require('express')
const router = express.Router()

const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')
const { Page } = require('../models')
module.exports = router

router.get('/', (req, res, next) => {
  const pages = Page.findAll()
  res.send(pages)
})


// submits a new page to db
router.post('/', (req, res, next) => {
  res.send()
})



//retreives the "add page" form
router.get('/add', (req, res, next) => {
  res.send(addPage())
})
