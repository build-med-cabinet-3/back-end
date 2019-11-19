const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    // getSavedById,
    //update,
    getByEmail,
    add,
    //remove    
}

function getAll() {
    return db('register')
}

function getSavedById(id) {
    return db('saved')
    .join('register','register_id','saved.register_id')
    .select()
    .where('saved.register_id','=', id)
}

//function update(id,change) {
    return db('saved')
    .where({})
//}

function getByEmail(filter) {
    
    return db('register').where('email', '=', filter)
}

async function add(body) {

    const [register_id] = await db('register').insert(body,'register_id')
    return db('register')
    .where({register_id})
    .first();
    // return db('register').insert(body,'id')
    // .then(([register_id]) => {
    //     return db('register').where({register_id}).first()
    // });
};

//function remove() {
    
//}