const Sequelize = require('sequelize');
const PlayerSchema = require('./schemas/player-schema')
const ChampionSchema = require('./schemas/Champion-schema')
const SevenBalled = require('./schemas/sevenBalled-schema')

const sequelize = new Sequelize(
    'pooldb', //database
    'root', //username
    'password' ,//password
    {
        host: 'localhost',
        dialect: 'mysql'
    });
sequelize
.authenticate()
.then(() => {
    console.log('connected');
})
.catch(err => {
    console.error('EVERYTHING IS ON FIRE', err);
});


const User = UserModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Blog.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Blog,
  Tag
}