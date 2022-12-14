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
router.post("/", async (req, res) => {
  const client = await pool.connect();

  const procedureId = req.body.procedure_id;
  const intervalTime = req.body.interval_time;
  const avgTemp = req.body.avg_temp;
  const intervalHTU = req.body.interval_htu;
  const t1 = req.body.t1;
  const t2 = req.body.t2;
  const t3 = req.body.t3;
  const t4 = req.body.t4;
  const t5 = req.body.t5;
  const t6 = req.body.t6;
  const t7 = req.body.t7;

  try {
    await client.query("BEGIN");
    const results = await client.query('INSERT INTO "diagnostics" ("procedure_id", "interval_time", "avg_temp", "interval_htu", "t1", "t2", "t3", "t4", "t5", "t6", "t7") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
    [procedureId, intervalTime, avgTemp, intervalHTU, t1, t2, t3, t4, t5, t6, t7]
    );

    await client.query("COMMIT");
    res.sendStatus(201);
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Error POST /diagnostics", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// // Updates notes
// router.put("/:id", (req, res) => {
//     console.log('this is req.params', req.params);

//     const notes = req.body.notes;
//     const id = req.params.id;
    
//     const queryText = 'UPDATE "procedure" SET "notes" = $1 WHERE "id" = $2;';
//     pool
//       .query(queryText, [notes, id])
//       .then(function (response) {
//         res.sendStatus(200);
//       })
//       .catch(function (error) {
//         console.log(error);
//         res.sendStatus(500);
//       });
// });

// Deletes individual diagnostics
router.delete("/individual-procedure/:id", (req, res) => {
    console.log('this is req.params', req.params);

    const procedure_id = req.params.id;
  
    const queryText = `DELETE FROM "diagnostics" WHERE procedure_id = $1;`;
    pool
      .query(queryText, [procedure_id])
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
  
    const queryText = `DELETE FROM "diagnostics";`;
    pool
      .query(queryText)
      .then(function (response) {
        res.sendStatus(200);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

module.exports = router;