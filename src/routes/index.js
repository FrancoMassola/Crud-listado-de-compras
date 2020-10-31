const express = require('express');
const router = express.Router();

const Producto_compra = require('../models/producto_compra');

//consulta a la base de datos cada vez que refresco la pagina 
router.get('/', async (req, res) => {
    const productos_compras = await Producto_compra.find();
    console.log(productos_compras);
    res.render('index', {
        productos_compras: productos_compras
    });
});

router.post('/add', async (req, res) => { //nueva funcionalidad llamada async await en javaSc para evaluar si fue efectivo, una promesa
    // console.log(new Producto_compra(req.body));
    const producto_compra = new Producto_compra(req.body);
    await producto_compra.save();
    res.redirect('/');
});

router.get('/buscar', async (req, res) => {
    const buscador = req.query.buscador; //requerir valor del name del formulario
    const productos_compras = await Producto_compra.find({ title: buscador });
    console.log(productos_compras);
    res.render('buscador', {
        buscador: buscador,
        productos_compras: productos_compras
    });

});

router.get('/ordenar', async (req, res) => {
    const productos_compras = await Producto_compra.find().sort({ title: 1 });
    console.log(productos_compras);
    res.render('orden_alfabetico', {
        productos_compras: productos_compras
    });

});

router.get('/done/:id', async (req, res) => {

    const { id } = req.params;
    const producto_compra = await Producto_compra.findById(id);
    producto_compra.status = !producto_compra.status;
    await producto_compra.save();
    res.redirect('/');


});

router.get('/edit/:id', async (req, res) => {

    const { id } = req.params;
    const producto_compra = await Producto_compra.findById(id);
    res.render('edit', {
        producto_compra
    });
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    await Producto_compra.update({ _id: id }, req.body);
    res.redirect('/');


});

router.get('/delete/:id', async (req, res) => {

    const { id } = req.params;
    await Producto_compra.remove({ _id: id });
    res.redirect('/');
});

module.exports = router;