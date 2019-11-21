const express = require('express')
const router = require('express').Router();
const savedDb = require('../routes/models/savedModel');
const authenticateMW = require('../routes/authenticateMW')


router.post('/',authenticateMW ,(req,res) =>{
    let body = req.body;
    savedDb.add(body)
    .then(saved => {
        res.status(200).json(saved)
    })
    .catch(err => {
        res.status(500).json({message:err.toString()})
    })
})

router.get('/',authenticateMW,(req,res) =>{
    //     console.log(req.header.authorization)
    //     let realToken = req.header.authorization;
    //     var decoded = jwt_decode(realToken);
    const {firstName, registerId} = req.decodedJwt;
    console.log(registerId);
        let id = registerId;
        savedDb.getSavedById(id)
        .then(saved => {
            res.status(200).json(saved)
        })
        .catch(err => {
            res.status(500).json({message:err.toString()})
        })
    })

    router.put('/:id',authenticateMW ,(req,res) =>{
        let body = req.body;
        let id = req.params.id
        savedDb.update(id, body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({message:err.toString()})
        })
    })

    router.delete('/:id',authenticateMW ,(req,res) =>{
        let id = req.params.id;
        savedDb.remove(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({message:err.toString()})
        })
    })








module.exports = router;