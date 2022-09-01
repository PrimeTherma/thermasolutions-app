const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    console.log( 'in router.get deviceDiagnostics router: ');
    const queryText = `SELECT * FROM "thermadevice" WHERE "procedure_id" = $1 ORDER BY "id" ASC;`;
    pool.query(queryText, [1])
    .then(results => {
        res.send(results.rows);
    }).catch( ( error ) => {
        console.log('error in router.get deviceDiagnostics: ', error);
        res.sendStatus( 500 );
    });
});

module.exports = router;