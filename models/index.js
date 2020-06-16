const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: true
});


db.authenticate()
  .then(() => {
    console.log("Connected to db successfully!")
  })

function generateSlug(title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    //since we are searching, editing, deleting by slug, these need to be unique
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})

//hook for slug
Page.beforeValidate((page) => {
  if (!page.slug) {
    page.slug = generateSlug(page.title)
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  }
})

Page.belongsTo(User, { as: 'author' })
User.hasMany(Page, { foreignKey: 'authorId' })

module.exports = {
  db,
  Page,
  User
}
