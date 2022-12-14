const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const procedureRouter = require('./routes/procedure.router');

const diagnosticsRouter = require('./routes/diagnostics.router');

const deviceDiagnosticsRouter = require('./routes/deviceDiagnostics.router');



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/procedure', procedureRouter);
app.use('/api/procedure/htu', procedureRouter);
app.use('/api/procedure/time', procedureRouter);

app.use('/diagnostics', diagnosticsRouter);

app.use('/api/device', deviceDiagnosticsRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
