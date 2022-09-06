const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Gets MAX id
router.get("/", (req, res) => {
  const sqlText = `SELECT MAX(id) FROM "procedure";`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(
        `ERROR saving new procedure id. in the Get procedure router`,
        error
      );
      res.sendStatus(500);
    });
});

// Gets procedure information
router.get("/all", (req, res) => {
  const sqlText = `SELECT id, total_time, total_htu, date, notes 
    FROM "procedure" WHERE id = (SELECT MAX(id) FROM "procedure") 
    ;`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(
        `ERROR saving new procedure id. in the Get procedure router`,
        error
      );
      res.sendStatus(500);
    });
});

// Gets history information for all procedures
router.get("/all-history", (req, res) => {
  const sqlText = 'SELECT * FROM procedure ORDER BY id';
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(
        'ERROR saving new procedure id. in the Get procedure router',
        error
      );
      res.sendStatus(500);
    });
});

// Updates notes
router.put("/:id", (req, res) => {
  console.log("this is req.params", req.params);
  console.log("this is req.body", req.body);
  
  const notes = req.body.notes;
  const id = req.params.id;

  const queryText = 'UPDATE "procedure" SET "notes" = $1 WHERE "id" = $2;';
  pool
    .query(queryText, [notes, id])
    .then(function (response) {
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
});

// On button press, add new procedure from StartProcedurePage.
router.post("/", (req, res) => {
  const sqlText = `INSERT INTO procedure (user_id)
    VALUES($1);`;
  pool
    .query(sqlText, [req.user.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`ERROR making new procedure in procedure router:`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
