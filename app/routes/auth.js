const router = require('express').Router();
const User = require('../models/User');
//validadcion de usuario
const Joi = require('@hapi/joi');
//encrptador de constraseña
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const schemaLogin = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(8).max(1024).required()
});

const schemasigup = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(8).max(255).required()
});

router.post('/signup', async (req, res) => {
    const {error} = schemasigup.validate(req.body)
    if (error) {
        console.log(req.body)
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const isUseNameExist = await User.findOne({username: req.body.username});
    if (isUseNameExist) {
        return res.status(400).json(
            {error: 'Usuario ya registrado'}
        )
    }
    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: password
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

router.post('/login', async (req, res) => {
    // validaciones
    const {error} = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message})

    const user = await User.findOne({username: req.body.username});

    if (!user) return res.status(400).json({error: 'Usuario no encontrado'});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({error: 'contraseña no válida'})


    // create token
    const token = jwt.sign({
        username: user.username,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
})

module.exports = router;
