const TipoSangre = require("../model/TipoSangre");

//agregar nuevo tipo de sangre
exports.nuevoTipoSangre = async (req, res) => {
    const { tipo, representation } = req.body;

    //validar que representation no exista en la BD
    const representationFound = await TipoSangre.findOne({ representation })

    if (representationFound) return res.status(400).json({ error: true, message: 'El Tipo de Sangre ' + tipo + ' con la representación [' + representation + '] ya existe en el sistema' })

    const newTipoSangre = new TipoSangre({ tipo, representation });
    await newTipoSangre.save();

    status(200).json({ error: false, message: 'El Tipo de Sangre [' + tipo + '] fue creado correctamente' })
}

//listar todos los tipos de sangre
exports.listarTiposSangre = async (req, res) => {
    const listadoTipoSangre = await TipoSangre.find().sort({representation:1});
    res.status(200).json({listado: listadoTipoSangre })
}

//mostrar info de un tipo de sangre por id
exports.listarTipoSangrePorId = async (req, res) => {
    const buscarPorId = await TipoSangre.findById(req.params.id)
    res.status(200).json({tipo: buscarPorId })
}

//actualizar la info de un tipo de sangre por id
exports.actualizarTipoSangrePorId = async (req, res) => {
    const actualizarTipoSangre = await TipoSangre.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json(actualizarTipoSangre)
}

//eliminar un tipo de sangre por id
exports.eliminarTipoSangre = async (req, res) => {
    await TipoSangre.findByIdAndDelete(req.params.id)
    res.status(204).json({message:"El Tipo de Sangre fue eliminado correctamente"})
}
