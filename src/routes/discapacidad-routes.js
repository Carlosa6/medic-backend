const { Router } = require("express");
const discapacidadCtrl = require("../controllers/discapacidad-controller");
const auth = require("../helpers/autenticacion");
const router = Router();

router.get(
  "/",
  [auth.verificarToken, auth.isAdmin],
  discapacidadCtrl.getDiscapacidades
);

router.post("/", [auth.verificarToken, auth.isAdmin], discapacidadCtrl.postDiscapacidad);

router.get(
  "/:id",
  [auth.verificarToken, auth.isAdmin],
  discapacidadCtrl.getDiscapacidadById
);

router.delete(
  "/:id",
  [auth.verificarToken, auth.isAdmin],
  discapacidadCtrl.deleteDiscapacidad
);

router.put(
  "/:id",
  [auth.verificarToken, auth.isAdmin],
  discapacidadCtrl.updateDiscapacidad
);

module.exports = router;
