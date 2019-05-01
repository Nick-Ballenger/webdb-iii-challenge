
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students',tbl =>{
        tbl.increments()
        tbl.string('name', 128).notNullable().unique()
         
           // add a foreign key
    tbl
    .integer('cohort_id')
    .unsigned()
    .references('id') // column
    .inTable('cohorts') // table
    .onDelete('CASCADE')
    .onUpdate('CASCADE');

    tbl
    .string('cohort')
    .references('name') // column
    .inTable('cohorts') // table
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
    
    tbl.timestamps(true,true)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('students')
    
    
  };
  