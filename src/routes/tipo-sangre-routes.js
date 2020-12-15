const router = require('express').Router()
const tipoSangreCtrl = require('../controllers/tipo-sangre-controller') 
const auth = require('../helpers/autenticacion')

//agregar nuevo tipo de sangre => POST /api/tipo-sangre
router.post('/',[
    auth.verificarToken,
    auth.isAdmin
], tipoSangreCtrl.nuevoTipoSangre)

//listar todos los tipos de sangre => GET /api/tipo-sangre
router.get('/',[
    auth.verificarToken,
    auth.isAdmin
], tipoSangreCtrl.listarTiposSangre)

//mostrar info de un tipo de sangre por id => GET /api/tipo-sangre/elidsddsdef
router.get('/:id',[
    auth.verificarToken,
    //auth.isAdmin
], tipoSangreCtrl.listarTipoSangrePorId)

//actualizar la info de un tipo de sangre por id => PUT /api/tipo-sangre/elids9dsdf
router.put('/:id',[
    auth.verificarToken,
    auth.isAdmin
], tipoSangreCtrl.actualizarTipoSangrePorId)

//eliminar un tipo de sangre por id => DELETE /api/tipo-sangre/elid8dsbdsudc
router.delete('/:id',[
    auth.verificarToken,
    auth.isAdmin
], tipoSangreCtrl.eliminarTipoSangre)

module.exports = router