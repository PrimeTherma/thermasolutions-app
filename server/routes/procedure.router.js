const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// On button press, add new procedure from StartProcedurePage.  
router.post('/', (req, res) => {
    const sqlText = `INSERT INTO procedure (user_id)
    VALUES($1);`;
    pool.query(sqlText, [req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`ERROR making new procedure in procedure router:`, error);
            res.sendStatus(500);
        })
});

router.get('/', (req, res) => {
    const sqlText = `SELECT MAX(id) FROM "procedure";`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
                })
        .catch((error) => {
            console.log(`ERROR saving new procedure id. in the Get procedure router`, error);
            res.sendStatus(500);
        })
})

module.exports = router;
