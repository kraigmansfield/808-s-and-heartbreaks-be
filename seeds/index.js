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
    ])
    const genres = await Genre.bulkCreate(genreSeeds);

    process.exit(1)
}

seed();