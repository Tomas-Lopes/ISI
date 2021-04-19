const router = express('express').Router();
const hubspotController = require ('../Controllers/hubspotController.js');

router.get('/listusers', hubspotController.getClients);
router.post('/adduser', hubspotController.addClient);
router.put('/updateuser', hubspotController.updateClient)

module.exports = router;