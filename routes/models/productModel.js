const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    update,
    add,
    remove    
}

function getAll() {
    return db('saved')
}



function update(id,change) {
    return db('saved')
    .where({})
    //where id matches saved.reg_id
}



async function add(body) {

    const [id] = await db('saved').insert(body,'id')
    return db('saved')
    .where({id})
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