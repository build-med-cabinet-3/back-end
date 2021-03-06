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
    .select('saved.strain','saved.Description1','saved.THC_Percent','saved.Type','saved.effect','saved.flavor','saved.CBD','saved.id','saved.Score','saved.Recommendation','saved.medical_effect_plain')
    .from('saved')
    .join('register','register.id','saved.registerId')
    
    .where('saved.registerId','=', id)
}

function update(id,change) {
    return db('saved')
    .where({id})
    .update(change)
    //where id matches saved.reg_id
}


async function add(body) {

    const [id] = await db('saved').insert(body,'id')
    // possibly change back to saved_id
    return db('saved')
    .where({id})
    .first();
    // return db('register').insert(body,'id')
    // .then(([register_id]) => {
    //     return db('register').where({register_id}).first()
    // });
};

function remove(id) {
    return db('saved')
    .where('id', id)
    .del();
}