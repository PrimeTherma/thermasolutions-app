const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    console.log( 'in router.get history/id:', req.params.procedureId );
    let id = req.params.procedureId
    const queryText = `SELECT * FROM "thermadevice" WHERE "procedure_id" = $1 ORDER BY "id" ASC;`;
    pool.query(queryText, [id])
    .then(results => {
        res.send(results.rows);
    }).catch( ( error ) => {
        console.log('error in router.get/:id', error);
        res.sendStatus( 500 );
    });
});

module.exports = router;