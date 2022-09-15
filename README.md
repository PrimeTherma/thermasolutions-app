
(View Raw will give you the markdown that you can copy to your repos!)


![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# PROJECT NAME
ThermaSolutions Procedure Application
## Description

_Duration: 2 Week Sprint_

During these 2 weeks, Our team set out to create an application that works as a proof of concept for a new medical device prototype. It has the ability to create new procedures. Track Time, Temp, HTUs and other diagnostic data while saving it to a server upon completion. After the surgery, you can view the diagnostic data and add notes for the procedure. If you have the admin access level, you can export the procedure data onto an excel file and delete procedures. 

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](https://thermal-procedure-application.herokuapp.com/#/start)

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.
![ThermaSolutions Chart](/public/images/chart.jpeg)
![ThermaSolutions Diagnostics](/public/images/diagnostics.jpeg)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- npm install (will automatically install other libraries. Such as express, redux, sheetJs, recharts)
- [Postico] (https://eggerapps.at/postico/)

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

If your application has secret keys (for example --  Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a database named `therma_solutions`,
2. The queries in the `database.sql` then the queries in `ThermaDeviceDataFINAL.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. Create Account.
2. Login.
3. Press 'Start Procedure' button.
4. After procedure is finished, click 'Finish Procedure' button which takes you to procedure history page.
5. You can view the current procedure that was completed, edit notes and clicking the 'Diagnostics' button allows you to view the full diagnostics for the procedure.
6. If logged in as admin you can export and delete on the history page. 


## Built With

List technologies and frameworks here
- [React](https://reactjs.org/)
- [Redux](https://maven.apache.org/)
- [Redux-Sagas](https://redux-saga.js.org/)
- [Express](https://expressjs.com/)
- [Passport](http://www.passportjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Material-UI](https://material-ui.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [recharts](https://recharts.org/en-US/)
- [sheetjs](https://sheetjs.com/)

## License
[MIT](https://choosealicense.com/licenses/mit/)

_Note, include this only if you have a license file. GitHub will generate one for you if you want!_

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at [ThermaSolutions](https://www.thermasolutions.com/request-info/)
