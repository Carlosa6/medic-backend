const router = require("express").Router();
const auth = require("../helpers/autenticacion");
const chartsCtrl = require("../controllers/dashboard-controller");

// api/charts
router.get("/", [auth.verificarToken, auth.isAdmin], chartsCtrl.charts);
router.get(
  "/cir_sangre",
  [auth.verificarToken, auth.isAdmin],
  chartsCtrl.charts1
);
router.get(
  "/cir_seguro",
  [auth.verificarToken, auth.isAdmin],
  chartsCtrl.charts2
);

module.exports = router;
