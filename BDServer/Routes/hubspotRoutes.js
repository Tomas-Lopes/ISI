const router = express('express').Router();
const hubspotController = require ('../Controllers/hubspotController.js');

router.get('/users', hubspotController.getUsers);
router.post('/adduser', hubspotController.addUser);

module.exports = router;