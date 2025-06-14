const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/cadastro-cliente', (req, res) => {
  res.render('cadastro-cliente');
});

router.get('/cadastro-produto', (req, res) => {
  res.render('cadastro-produto');
});

router.get('/cadastro-fornecedor', (req, res) => {
  res.render('cadastro-fornecedor');
});

router.get('/listar-clientes', (req, res) => {
  res.render('listar-clientes');
});

router.get('/listar-produtos', (req, res) => {
  res.render('listar-produtos');
});

router.get('/listar-fornecedores', (req, res) => {
  res.render('listar-fornecedores');
});

module.exports = router;