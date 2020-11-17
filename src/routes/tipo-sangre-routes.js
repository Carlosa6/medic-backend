const router = require('express').Router()
const tipoSangreCtrl = require('../controllers/tipo-sangre-controller') 

//agregar nuevo tipo de sangre => POST /api/tipo-sangre
router.post('/', tipoSangreCtrl.nuevoTipoSangre)

//listar todos los tipos de sangre => GET /api/tipo-sangre
router.get('/', tipoSangreCtrl.listarTiposSangre)

//mostrar info de un tipo de sangre por id => GET /api/tipo-sangre/elidsddsdef
router.get('/:id', tipoSangreCtrl.listarTipoSangrePorId)

//actualizar la info de un tipo de sangre por id => PUT /api/tipo-sangre/elids9dsdf
router.put('/:id', tipoSangreCtrl.actualizarTipoSangrePorId)

//eliminar un tipo de sangre por id => DELETE /api/tipo-sangre/elid8dsbdsudc
router.delete('/:id', tipoSangreCtrl.eliminarTipoSangre)

module.exports = router