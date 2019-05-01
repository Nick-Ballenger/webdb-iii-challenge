const router = require('express').Router();
const knex = require('knex');



const knexConfig = require('../knexfile')
  const db = knex(knexConfig.development);

  
//get students
  router.get('/', async (req, res) => {
    
    try {
		const students = await db('students');
		res.status(200).json(students);
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Something went wrong getting the data from the server' });
	}
});


//get students by ID

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		db('students').where({ id }).then((student) => {
			res.status(200).json(student);
		});
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Something went wrong getting data from server' });
	}
});

//Add student

router.post('/', async (req, res) => {
    
    try {
		const { id } = await db('students').insert(req.body);
		const student = await db('students').where({ id }).first();
		res.status(201).json(student);
    } 
    
    catch (error) {
		res.status(500).json({ error: 'Server error while trying to add new data' });
	}
});

//delete by Id
router.delete('/:id', async (req, res) => {
	
	try {
		const { id } = req.params;
		const del = await db('students').where({ id }).delete();
		res.status(404).json({ message: 'student deleted ' });
	} 
	
	catch (error) {
		res.status(500).json({ error: 'Sever error, could not delete.' });
	}
});

//update by ID

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const edit = await db('students').where({ id }).update(req.body);

		if (edit > 0) {
			const zoo = await db('students').where({ id }).first();
			res.status(200).json(edit);
		} else {
			res.status(404).json({ message: 'ID for student not found. Name required' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server error could not update.' });
	}
});

module.exports = router;