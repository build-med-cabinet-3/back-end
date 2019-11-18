const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    //getById,
    //update,
    getByEmail,
    add,
    //remove    
}

function getAll() {
    return db('register')
}

//function getById() {
    
//}

//function update() {
    
//}

function getByEmail(filter) {
    
    return db('register').where('email', '=', filter)
}

async function add(body) {


    return db('register').insert(body)
    .then(([register_id]) => {
        return db('register').where({register_id}).first()
    });
};

//function remove() {
    
//}