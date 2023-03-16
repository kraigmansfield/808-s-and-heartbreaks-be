const express = require('express')
const router = express.Router()
const { User, Genre } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.use(express.json())



router.get('/', (req, res) => {
  User.findAll({
    include: [
      {
        model: Genre,
        as: 'Like',
      },
      {
        model: Genre,
        as: 'Dislike',
      },
    ],
  })
    .then((usersArr) => {
      res.json(usersArr)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        msg: 'Something went wrong',
        err,
      })
    })
}),

//signup
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    age: req.body.age,
  })
    .then((newUser) => {
      const token = jwt.sign(
        {
          username: newUser.username,
          id: newUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '4h',
        },
      )
      res.json({
        token,
        user: newUser,
      })
    })
    .catch((err) => {
      console.log(err)
      res.json({ msg: 'An error has occurred', err })
    })
}),

//Login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ msg: 'Invalid login credentials' })
      }
      const token = jwt.sign(
        {
          username: foundUser.username,
          id: foundUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '4h',
        },
      )
      res.json({
        token,
        user: foundUser,
      })
    })
    .catch((err) => {
      console.log(err)
      res.json({ msg: 'An error has occurred' })
    })
}),

router.get('/isValidToken', (req, res) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    return res
      .status(403)
      .json({ isValid: false, msg: 'You must be logged in' })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    res.json({
      isValid: true,
      user: tokenData,
    })
  } catch (err) {
    res.status(403).json({
      isValid: false,
      msg: 'Invalid token',
    })
  }
}),

//get one with genre
router.get('/:id', (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Genre,
        as: 'Like',
      },
      {
        model: Genre,
        as: 'Dislike',
      },
    ],
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        msg: 'Something went wrong',
        err,
      })
    })
}),

//add like
router.post('/addLike/:userId', async (req, res) => {
  try {
    const userObj = await User.findByPk(req.params.userId)
    console.log(userObj)
    await userObj.addLike(req.body.genreIds)
    return res.json({ msg: 'genre added to likes!' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err })
  }
}),

//add dislike
router.post('/addDislike/:userId', async (req, res) => {
  try {
    const userObj = await User.findByPk(req.params.userId)
    console.log(userObj)
    await userObj.addDislike(req.body.genreIds)
    return res.json({ msg: 'genre added to dislikes!' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err })
  }
}),

//remove like
router.post('/removeLike/:userId', async (req, res) => {
  try {
    const userObj = await User.findByPk(req.params.userId)
    await userObj.removeLike(req.body.genreId)
    return res.json({ msg: 'genre removed from likes!' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err })
  }
}),

//remove dislike
router.post('/removeDislike/:userId', async (req, res) => {
  try {
    const userObj = await User.findByPk(req.params.userId)
    await userObj.removeDislike(req.body.genreId)
    return res.json({ msg: 'genre removed from dislikes!' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err })
  }
}),

router.post('/submit-form', async (req, res) => {
  try {
    const likedGenres = req.body.likedGenres
    const dislikedGenres = req.body.dislikedGenres
    const user = await User.findByPk(req.body.userId)

    for (let i = 0; i < likedGenres.length; i++) {
      console.log(`Liked Genre ${i + 1}: ${likedGenres[i]}`)
      user.addLike(likedGenres[i])
    }

    for (let i = 0; i < dislikedGenres.length; i++) {
      console.log(`Disliked Genre ${i + 1}: ${dislikedGenres[i]}`)

      user.addDislike(dislikedGenres[i])
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Something went wrong',
      err,
    })
  }
})

module.exports = router
