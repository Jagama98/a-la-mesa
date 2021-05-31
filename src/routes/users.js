const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin.hbs');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup.hbs');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    if(name.length <= 0){
        req.flash('error_msg', 'Introduzca un nombre');
        res.redirect('/users/signup');
    }
    if(email.length <= 0){
        req.flash('error_msg', 'Introduzca un email');
        res.redirect('/users/signup');
    }
    if(password.length <= 0){
        req.flash('error_msg', 'Introduzca una contraseña');
        res.redirect('/users/signup');
    }
    if(password != confirm_password) {
        req.flash('error_msg', 'Las contraseñas no coinciden');
        res.redirect('/users/signup');
    }
    if(password.length < 4){
        req.flash('error_msg', 'La contraseña debe tener mínimo 4 caracteres');
        res.redirect('/users/signup');
    } else{
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', 'Email ya registrado');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Te has registrado');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;