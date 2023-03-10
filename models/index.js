const User = require('./User');
const Genre = require('./Genre');

User.belongsToMany(Genre,{
    through:"LikedGenre",
    as:"Like",
    
});
Genre.belongsToMany(User,{
    through:"LikedGenre",
    as:"LikedBy",

});
User.belongsToMany(Genre,{
    through:"DislikedGenre",
    as:"Dislike",

});
Genre.belongsToMany(User,{
    through:"DislikedGenre",
    as:"DislikedBy",

});

module.exports = {
    User,
    Genre
}