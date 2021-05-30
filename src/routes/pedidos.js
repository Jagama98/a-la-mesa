const express = require('express');
const router = express.Router();

const Plato = require('../models/Plato');
const { isAuthenticated } = require('../helpers/auth');

router.get('/pedidos/pedirPlato', isAuthenticated, (req, res) => {
    res.render('pedirPlato');
});

router.post('/pedidos/pedirPlato', isAuthenticated, async (req, res) => {
    const { restaurante, plato, cantidad, direccion, telefono }= req.body;
    const errors = [];
    if(!restaurante) {
        errors.push({error: 'Por favor elija un restaurante'});
    }
    if(!plato) {
        errors.push({error: 'Por favor escriba el nombre de un plato'});
    }
    if(!cantidad) {
        errors.push({error: 'Por favor indique una cantidad'});
    }
    if(!direccion) {
        errors.push({error: 'Por favor indique una dirección'});
    }
    if(!telefono) {
        errors.push({error: 'Por favor indique un número de teléfono'});
    }
    if(errors.length > 0) {
        res.render('pedirPlato', {
            errors,
            restaurante,
            plato,
            cantidad,
            direccion,
            telefono
        });
    } else {
        const newPlato = new Plato({ restaurante, plato, cantidad, direccion, telefono });
        await newPlato.save();
        req.flash('success_msg', 'Pedido añadido correctamente');
        res.redirect('/pedidos');
        
    }
});

router.get('/pedidos', isAuthenticated, async (req, res) => {
    const platos = await Plato.find().lean();
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