
exports.seed = function(knex) {last_
      return knex('register').insert([
        {first_name: 'josh',lastName: 'holtsclaw',email:"fake@email.com",password:"pass"},
        {first_name: 'dani',lastName: 'como',email:"fake2@email.com",password:"pass"},
        {first_name: 'rach',lastName: 'como',email:"fake3@email.com",password:"pass"}
      ]);
};
