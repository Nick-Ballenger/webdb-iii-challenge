
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'web18'},
        {name: 'web19'},
        {name: 'web20'}
      ]);
    });
};
