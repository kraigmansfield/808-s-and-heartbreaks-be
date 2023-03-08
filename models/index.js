const User = require('./User');
const Genre = require('./Genre');

User.belongsToMany(Genre,{
    through:"UserGenre"
});
Genre.belongsToMany(User,{
    through:"UserGenre"
});

module.exports = {
    User,
    Genre
}