
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'jimmy', cohort_id:"1"},
        {name: 'johns', cohort_id:"3"},
        {name: 'sammiches', cohort_id:"2"}
      ]);
    });
};
