
exports.up = function(knex) {
    return knex.schema.createTable('login', tbl =>{
        tbl.increments();
        tbl.string('email',255).notNullable();
        tbl.string('password',255).notNullable();
    })
    .createTable('register', tbl => {
        tbl.increments('id');
        tbl.string('first_name',255).notNullable();
        tbl.string('lastName',255).notNullable();
        tbl.string('email',255).notNullable().unique();
        tbl.string('password',255).notNullable();
    })
    .createTable('strainForm', tbl => {
        tbl.increments();
        tbl.string('strain',255).notNullable();
        tbl.string('effect',255).notNullable();
        tbl.string('medical_effect_plain',255).notNullable()
        tbl.string('flavor',255).notNullable();
        tbl.string('Type',255).notNullable();
        tbl.string('THC_Percent',255).notNullable();
        tbl.string('CBD',255).notNullable();
        tbl.string('Description1',255).notNullable();
    })
    .createTable('saved', tbl => {
        tbl.increments();
        tbl.string('strain',255).notNullable();
        tbl.string('effect',255).notNullable();
        tbl.string('medical_effect_plain',255).notNullable()
        tbl.string('flavor',255).notNullable();
        tbl.string('Type',255).notNullable();
        tbl.string('THC_Percent',255).notNullable();
        tbl.string('CBD',255).notNullable();
        tbl.string('Description1',255).notNullable();
        tbl.integer('Score').notNullable();
        tbl.integer('Recommendation');
        tbl.integer('exp');
        tbl.integer('iat');
        tbl.string('firstName',255).notNullable();
        tbl.string('lastName',255).notNullable();
        
        
        tbl.integer('registerId')
        .references('register.id')
        .onDelete('cascade')
        .onUpdate('cascade');
    })
};
//[{1: [{'strain': 'afternoon-delight'}, {'effect': 'Creative Euphoric Focused Happy Relaxed Talkative Tingly Uplifted'}, {'medical_effect_plain': 'Pain relief Anorectic Inhibits bacteria Antiemetic Antiepileptic Reduces inflammation Aids sleep Inhibits cancer growth Suppresses muscle spasms Increases appetite Stimulates bone growth Reduces acid reflux'}, {'flavor': 'Apple Berry Citrus Diesel Earthy Fruity Nutty Pine Pungent Skunk Tropical'}, {'Type': 'hybrid'}, {'THC_Percent': '0.19'}, {'CBD': '0.09333333333333334'}, {'Description1': 'Afternoon Delight is a sativa dominant hybrid strain created through a cross of the insanely delicious'}, {'Score': 2.29822077}]}]

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('saved')
    .dropTableIfExists('strainForm')
    .dropTableIfExists('register')
    .dropTableIfExists('login')
};
