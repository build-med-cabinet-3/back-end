const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    getById,
    update,
    add,
    remove    
}

function getAll() {
    return db('saved')
}

function getSavedById(id) {
    return db('saved')
    .join('register','register_id','saved.register_id')
    .select()
    .where('saved.register_id','=', id)
}

function update(id,change) {
    return db('saved')
    .where({})
    //where id matches saved.reg_id
}

// function getByEmail(filter) {
    
//     return db('register').where('email', '=', filter)
// }

async function add(body) {

    const [saved_id] = await db('saved').insert(body,'saved_id')
    return db('saved')
    .where({saved_id})
    .first();
    // return db('register').insert(body,'id')
    // .then(([register_id]) => {
    //     return db('register').where({register_id}).first()
    // });
};

//function remove() {
    
//}