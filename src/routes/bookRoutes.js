const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes')
const { Pool, Client } = require('pg');
const pool = new Pool()



function router(nav) {
	// const books = [
	// 	{
	// 		title: 'War and Peace',
	// 		genre: 'Historical Fiction',
	// 		author: 'Lev Niko Tolstoy',
	// 		read: false
	// 	},
	// 	{
	// 		title: 'Saw and Peace',
	// 		genre: 'Historical Fiction',
	// 		author: 'Lev Niko Tolstoy',
	// 		read: false
	// 	},
	// 	{
	// 		title: 'Par and Peace',
	// 		genre: 'Historical Fiction',
	// 		author: 'Lev Niko Tolstoy',
	// 		read: false
	// 	},
	// 	{
	// 		title: 'Car and Peace',
	// 		genre: 'Historical Fiction',
	// 		author: 'Lev Niko Tolstoy',
	// 		read: false
	// 	}
	// ];


	bookRouter.route('/')
		.get((req, res) => {
			(async function query() {
				const result = await pool.query('SELECT * FROM BOOKS');
				debug(result);
				res.render('bookListView',
					{
						nav,
						title: 'Library',
						books: result.rows
					}
				);
			}());
		});

	bookRouter.route('/:id')
		.get((req, res) => {
			(async function query() {
				const { id } = req.params;

				const { rows } = await pool.query('SELECT * FROM BOOKS WHERE ID=$1', [id]);

				debug(rows);
				res.render('bookView',
					{
						nav,
						title: 'Library',
						book: rows[0]
					}
				);

			}());


		});

	return bookRouter;
}


module.exports = router;