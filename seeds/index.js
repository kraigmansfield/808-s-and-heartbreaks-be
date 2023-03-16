const sequelize = require("../config/connection");
const { User, Genre } = require("../models");

const genreSeeds = require('./genre.json')

const seed = async ()=> {
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            username:"Kraig",
            email:"Kraig@kraig.kraig",
            password:"password",
            age: 35
        },
        {
            username:"Bret",
            email:"Bret@Bret.Bret",
            password:"password",
            age: 24
        },
        {
            username:"Rickie",
            email:"Rickie@rickie.rickie",
            password:"password",
            age: 28
        },
        {
            username:"Johnny",
            email:"Johnny@Johnny.Johnny",
            password:"password",
            age: 29
        },
        {
            username:"Alisa",
            email:"Alisa@Alisa.Alisa",
            password:"password",
            age: 35
        },
        {
            username:"Charlie",
            email:"Charlie@Charlie.Charlie",
            password:"password",
            age: 24
        },
        {
            username:"Ben",
            email:"Ben@Ben.Ben",
            password:"password",
            age: 28
        },
        {
            username:"Sophie",
            email:"Sophie@Sophie.Sophie",
            password:"password",
            age: 29
        },
        {
            username:"Jim",
            email:"Jim@Jim.Jim",
            password:"password",
            age: 35
        },
        {
            username:"Pam",
            email:"Pam@Pam.Pam",
            password:"password",
            age: 24
        },
        {
            username:"Oscar",
            email:"Oscar@Oscar.Oscar",
            password:"password",
            age: 28
        },
        {
            username:"April",
            email:"April@April.April",
            password:"password",
            age: 29
        },
    ],{
        individualHooks:true
    })
    const genres = await Genre.bulkCreate(genreSeeds);

    await users[0].addLike([2])
    await users[0].addDislike([5])

    
    await users[1].addLike([1])
    await users[1].addDislike([3])

    await users[2].addLike([2])
    await users[2].addDislike([4])

    await users[3].addLike([5])
    await users[3].addDislike([1])
    
    await users[4].addLike([2])
    await users[4].addDislike([5])

    
    await users[5].addLike([1])
    await users[5].addDislike([3])

    await users[6].addLike([2])
    await users[6].addDislike([4])

    await users[7].addLike([5])
    await users[7].addDislike([1])
    
    await users[8].addLike([2])
    await users[8].addDislike([5])

    
    await users[9].addLike([1])
    await users[9].addDislike([3])

    await users[10].addLike([2])
    await users[10].addDislike([4])

    await users[11].addLike([5])
    await users[11].addDislike([1])




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