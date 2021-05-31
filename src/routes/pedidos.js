const express = require('express');
const router = express.Router();

const Plato = require('../models/Plato');
const { isAuthenticated } = require('../helpers/auth');

router.get('/pedidos/pedirPlato', isAuthenticated, (req, res) => {
    res.render('pedirPlato');
});

router.post('/pedidos/pedirPlato', isAuthenticated, async (req, res) => {
    const { restaurante, plato, cantidad, direccion, telefono }= req.body;
    if(!restaurante) {
        req.flash('error_msg', 'Por favor elija un restaurante');
        res.redirect('/pedidos/pedirPlato');
    }
    if(!plato) {
        req.flash('error_msg', 'Por favor elija un plato');
        res.redirect('/pedidos/pedirPlato');
    }
    if(!cantidad) {
        req.flash('error_msg', 'Por favor indique una cantidad');
        res.redirect('/pedidos/pedirPlato');
    }
    if(!direccion) {
        req.flash('error_msg', 'Por favor indique una dirección');
        res.redirect('/pedidos/pedirPlato');
    }
    if(!telefono) {
        req.flash('error_msg', 'Por favor indique un número de teléfono');
        res.redirect('/pedidos/pedirPlato');
    } else {
        const newPlato = new Plato({ restaurante, plato, cantidad, direccion, telefono });
        newPlato.user = req.user.id;
        await newPlato.save();
        req.flash('success_msg', 'Pedido añadido correctamente');
        res.redirect('/pedidos');    
    }
});

router.get('/pedidos', isAuthenticated, async (req, res) => {
    const platos = await Plato.find({user: req.user.id}).lean();
    res.render('all-pedidos', { platos });
});

router.get('/pedidos/edit/:id', isAuthenticated, async (req, res) => {
    const plato = await Plato.findById(req.params.id).lean();
    res.render('edit-pedido', { plato });
});

router.put('/pedidos/edit-pedido/:id', isAuthenticated, async (req, res) => {
    const { plato, cantidad} = req.body;
    await Plato.findByIdAndUpdate(req.params.id, {plato, cantidad}).lean();
    req.flash('success_msg', 'Pedido actualizado correctamente');
    res.redirect('/pedidos');
});

router.delete('/pedidos/delete/:id', isAuthenticated, async (req, res) => {
    await Plato.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Pedido eliminado correctamente');
    res.redirect('/pedidos')
});

module.exports = router;