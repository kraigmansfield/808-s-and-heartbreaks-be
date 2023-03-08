const sequelize = require("../config/connection");
const { User, Genre } = require("../models");

const genreSeeds = require('./genre.json')

const seed = async ()=> {
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            username:"Kraig",
            email:"Kraig@kraig.kraig",
            password:"password1",
            age: 35
        },
        {
            username:"Bret",
            email:"Bret@Bret.Bret",
            password:"password2",
            age: 24
        },
        {
            username:"Rickie",
            email:"Rickie@rickie.rickie",
            password:"password3",
            age: 28
        },
        {
            username:"Johnny",
            email:"Johnny@Johnny.Johnny",
            password:"password4",
            age: 29
        },
    ],{
        individualHooks:true
    })
    const genres = await Genre.bulkCreate(genreSeeds);

    await genres[4].addLikedBy(0)
    await users[0].addLike([2,3])

    await users[0].addDislike([1,5])
    const finalResults = await User.findByPk(1,{
        include:[{
            model:Genre,
            as:"Like"
        },{
            model:Genre,
            as:"Dislike"
        }]
    })
    
    process.exit(1)
}

seed();