const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    getSavedById,
    update,
    add,
    remove    
}

function getAll() {
    return db('saved')
}

function getSavedById(id) {
    return db
    .select('saved.strain')
    .from('saved')
    .join('register','register.register_id','saved.register_id')
    
    .where('saved.register_id','=', id)
}

function update(id,change) {
    return db('saved')
    .where({id})
    .update(change)
    //where id matches saved.reg_id
}


async function add(body) {

    const [saved_id] = await db('saved').insert(body,'id')
    return db('saved')
    .where({saved_id})
    .first();
    // return db('register').insert(body,'id')
    // .then(([register_id]) => {
    //     return db('register').where({register_id}).first()
    // });
};

function remove() {
    return db('saved')
    .where('id', id)
    .del();
}