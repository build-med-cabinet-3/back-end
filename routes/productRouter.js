const router = require('express').Router();

router.get('/', (req,res) =>{
    db.getAll()
    .then(product => {
        res.status(200).json(product)
    })
    .catch(err => {
        res.status(500).json({message:'error getting product'})
    })
})

router.post('/', (req,res) =>{
    let body = req.body;
    db.add(body)
    .then(posted => {
        res.status(200).json(posted)
    })
    .catch(err => {
        res.status(500).json({message:'error getting posting product'})
    })
})

router.put('/', (req,res) =>{
    let body = req.body;
    let id = req.params.id;
    db.update(id,body)
    .then(posted => {
        res.status(200).json(posted)
    })
    .catch(err => {
        res.status(500).json({message:'error updating product'})
    })
})

router.delete('/:id', (req,res) =>{
    let id = req.params.id;
    db.remove(id)
    .then(removed => {
        res.status(200).json(removed)
    })
    .catch(err => {
        res.status(500).json({message:'error removing product'})
    })
})






module.exports = router;