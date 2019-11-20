const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../routes/models/authModel');
const savedDB = require('../routes/models/savedModel');



router.get('/:id/saved', (req,res) =>{
    let id = req.params.id;
    savedDB.getSavedById(id)
    .then(saved => {
        res.status(200).json(saved)
    })
    .catch(err => {
        res.status(500).json({message:err.toString()})
    })
})
router.post('/:id/saved', (req,res) =>{
    let body = req.body;
    savedDB.add(body)
    .then(saved => {
        res.status(200).json(saved)
    })
    .catch(err => {
        res.status(500).json({message:err.toString()})
    })
})

router.get('/register', (req,res) =>{
    db.getAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message:err.toString()})
    })
})


router.post('/register',(req,res) => {
    const body = req.body;

    const hash = bcrypt.hashSync(body.password,10)

    body.password = hash

    db.add(body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({ message: error.toString() });
    });
})

router.post('/login',(req,res) => {
    const {email,password} = req.body;
    console.log(req.body);
    db.getByEmail(email)
    .first()
    .then(user => {
        console.log("user",user)
        if(user && bcrypt.compareSync(password,user.password)){
            const token = getJwtToken(user);
            res.status(200).json({message:`Welcome ${user.first_name}`, token});
        }else{
            res.status(401).json({message:'invalid login information'})
        }
        
    })
    .catch(error => {
        res.status(500).json({ message: error.toString() });
    });
})
//GRAB token in front end send ID in post to saved db
// front end sets token in local storage get reg ID from local storage token
function getJwtToken(user){
    const payload = {
        id: user.register_id,
        firstName: user.first_name,
        lastName: user.last_name
    };
    const secret = process.env.JWT_SECRET || 'NO SEE'
    const options = {
        expiresIn:'1h'
    };

    return jwt.sign(payload,secret,options) 
}


module.exports = router;