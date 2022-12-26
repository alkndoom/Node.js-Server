const express = require('express');
const router = express.Router();
const authorsController = require('../controller/authorsController');

router.get('/', authorsController.authorsIndex);

router.get('/add', authorsController.authorsAddGet);

router.post('/', authorsController.authorsAddPost);

router.get('/:id', authorsController.authorsDetails);

router.delete('/:id', authorsController.authorsDelete);

module.exports = router;