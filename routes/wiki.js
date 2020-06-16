const express = require('express')
const router = express.Router()

const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')
const { Page, User } = require('../models')


router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll()
    res.send(main(pages))
  } catch (error) {
    next(error)
  }
})


// submits a new page to db
router.post('/', async (req, res, next) => {
  const page = new Page(req.body)
  try {
    const [user, wasCreated] = await User.findOrCreate(
      {
        where: {
          name: req.body.name,
          email: req.body.email
        }
      }
    )
    await page.save();
    page.setAuthor(user)
    res.redirect(`/wiki/${page.slug}`);


  } catch (error) {
    next(error)
  }

})
/*
//ALSO CAN BE WRITTEN AS:
router.post("/", async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    const page = await Page.create(req.body);

    page.setAuthor(user);

    res.redirect("/wiki/" + page.slug);
  } catch (error) { next(error) }
});
*/
//retreives the "add page" form
router.get('/add', (req, res, next) => {
  res.send(addPage())
})


// retrieves the specfic created page
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    if (!page) {
      res.sendStatus(404)
    }
    const author = await page.getAuthor()
    res.send(wikiPage(page, author))
  } catch (error) {
    next(error)
  }

})

// gets form body, updates, redirects
router.post('/:slug', async (req, res, next) => {
  try {
    const [numOfUpdatedRows, updatedRows] = await Page.update(req.body, {

      where: {
        slug: req.params.slug
      },
      returning: true
    })
    res.redirect(`/wiki/${updatedRows[0].slug}`)

  } catch (error) {
    next(error)
  }

})

// hooked up to editPage
router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    if (!page) {
      res.sendStatus(404)
    }
    const author = await page.getAuthor()
    res.send(editPage(page, author))
  } catch (error) {
    next(error)
  }
})




module.exports = router
