var express = require('express');
var router  = express.Router();

// GET HOMEPAGE
// ==============================================

router.get('/', function(req, res)
{
  res.send('Users page');
});

// EXPORT
// ==============================================

module.exports = router;
