const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");

// This route returns diagnostics
router.get("/", (req, res) => {
  // console.log("user.id logged in: ", req.user.id);

  const queryText = 'SELECT * FROM "diagnostics" ORDER BY "procedure_id";';
  pool
    .query(queryText)
    .then(function (result) {
      res.send(result.rows);
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
});

// Post template
// router.post("/", async (req, res) => {
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN");
//     const results = await client.query(
//     );
//     const clientId = results.rows[0].id;

//     await client.query("COMMIT");
//     res.sendStatus(201);
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.log("Error POST /diagnostics", error);
//     res.sendStatus(500);
//   } finally {
//     client.release();
//   }
// });

// Updates notes
router.put("/", (req, res) => {
    // console.log('this is req.body', req.body);
    const notes = req.body.notes;
    const procedure_id = req.body.procedure_id;
    
    const queryText = `UPDATE "diagnostics" SET "notes" = $1 WHERE procedure_id = $2;`;
    pool
      .query(queryText, [notes, procedure_id])
      .then(function (response) {
        res.sendStatus(200);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

// Deletes all of diagnostics data
router.delete("/", (req, res) => {
  
    const queryText = `DELETE * FROM "diagnostics";`;
    pool
      .query(queryText, [req.params.placeId, req.user.id])
      .then(function (response) {
        res.sendStatus(200);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

module.exports = router;