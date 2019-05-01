const router = require('express').Router();
const knex = require('knex');



const knexConfig = require('../knexfile')
  const db = knex(knexConfig.development);
//get Cohorts
  router.get('/', async (req, res) => {
    
    try {
		const cohorts = await db('cohorts');
		res.status(200).json(cohorts);
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Something went wrong getting the data from the server' });
	}
});


//get Cohorts by ID

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		db('cohorts').where({ id }).then((cohort) => {
			res.status(200).json(cohort);
		});
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Something went wrong getting data from server' });
	}
});

//Get by ID
router.get('/:id/students', async (req, res) => {
    
    try {
      const students = await db('students')
        .where({ cohort_id: req.params.id })
      res.status(200).json(students);
    } 
    
    catch (error) {
      res.status(500).json({ error: 'Something went wrong getting data from server' });
    }
  });





//Add Cohort
router.post('/', async (req, res) => {
    
    try {
		const { id } = await db('cohorts').insert(req.body);
		const cohort = await db('cohorts').where({ id }).first();
		res.status(201).json(cohort);
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Server error while trying to add new data' });
	}
});

//delete by Id
router.delete('/:id', async (req, res) => {
	
	try {
		const { id } = req.params;
		const del = await db('cohorts').where({ id }).delete();
		res.status(404).json({ message: 'cohort deleted ' });
	} 
	
	catch (error) {
		res.status(500).json({ error: 'Sever error, could not delete.' });
	}
});

//update by ID

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const edit = await db('cohorts').where({ id }).update(req.body);

		if (edit > 0) {
			const zoo = await db('cohorts').where({ id }).first();
			res.status(200).json(edit);
		} else {
			res.status(404).json({ message: 'ID for cohort not found. Name required' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server error could not update.' });
	}
});

module.exports = router;