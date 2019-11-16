
exports.up = function(knex) {
    return knex.schema.createTable('login', tbl =>{
        tbl.increments('login_id');
        tbl.string('email',255).notNullable();
        tbl.string('password',255).notNullable();
    })
    .createTable('register', tbl => {
        tbl.increments('register_id');
        tbl.string('first_name',255).notNullable();
        tbl.string('lastName',255).notNullable();
        tbl.string('email',255).notNullable().unique();
        tbl.string('password',255).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('register')
    .dropTableIfExists('login')
};
