const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../routes/models/authModel');
const savedDB = require('../routes/models/savedModel');
const jwt_decode = require('jwt-decode');
const authenticateMW = require('../routes/authenticateMW')

const secret = process.env.JWT_SECRET || 'NO SEE'

// router.get('/saved', (req,res) =>{
//     let id = decoded.id;
//     savedDB.getSavedById(id)
//     .then(saved => {
//         res.status(200).json(saved)
//     })
//     .catch(err => {
//         res.status(500).json({message:err.toString()})
//     })
// })


router.get('/register',(req,res) =>{
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
            let token = getJwtToken(user);
            
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
        registerId: user.id,
        firstName: user.first_name,
        lastName: user.lastName
    };
    const secret = process.env.JWT_SECRET || 'NO SEE'
    const options = {
        expiresIn:'1h'
    };

    return jwt.sign(payload,secret,options) 
}


module.exports = router;