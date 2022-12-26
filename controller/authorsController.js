const express = require('express');
const Author = require('../models/authorModel');

const authorsIndex = (req, res) => {
    Author.find().sort({createdAt: -1})
    .then(result => {
        res.render('authors/index', {authors: result});
    })
    .catch(e => {
        console.log(e);
        res.redirect('index')
    });
};

const authorsAddGet = (req, res) => {
    res.render('authors/add');
};

const authorsAddPost = (req, res) => {
    const author = new Author(req.body);
    author.save()
    .then(result => {
        res.redirect('authors');
    })
    .catch(e => {
        console.log(e);
        res.redirect('index');
    });
};

const authorsDetails = (req, res) => {
    const id = req.params.id;
    Author.findById(id)
    .then(result => {
        res.render('authors/details', {author: result});
    })
    .catch(e => {
        console.log(e);
        res.redirect('index');
    });
};

const authorsDelete = (req, res) => {
    const id = req.params.id;
    Author.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/authors' });
    })
    .catch(e => {
        console.log(e);
        res.redirect('index');
    });
};

module.exports = {
    authorsIndex,
    authorsAddGet,
    authorsAddPost,
    authorsDetails,
    authorsDelete,
};