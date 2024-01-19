const express = require('express');
const router = express.Router();

const schemaV4Routes = require('./schemas/schemaV4.routes');
const schemaV5Routes = require('./schemas/schemaV5.routes');

const tableV4Routes = require('./tables/tableV4.routes');
const tableV5Routes = require('./tables/tableV5.routes');
const compareTableRoutes = require('./tables/compareTable.routes');

const donneeV4Routes = require('./donnees/donneeV4.routes');
const donneeV5Routes = require('./donnees/donneeV5.routes');
const compareDataRoutes = require('./donnees/compareData.routes');
const nbRowsRoutes = require('./donnees/nbRows.routes');

router.use('/', schemaV4Routes);
router.use('/', schemaV5Routes);

router.use('/', tableV4Routes);
router.use('/', tableV5Routes);
router.use('/', compareTableRoutes);

router.use('/', donneeV4Routes);
router.use('/', donneeV5Routes);
router.use('/', compareDataRoutes);
router.use('/', nbRowsRoutes);

module.exports = router;

