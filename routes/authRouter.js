const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../routes/models/authModel');

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