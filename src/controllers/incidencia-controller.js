const Incidencia = require("../model/Incidencia");
const User = require("../model/User");

const createIncidencia = async (req, res) => {
  const { titulo, descripcion, fecha, accion, email } = req.body;

  const nwIncidencia = new Incidencia({
    titulo,
    descripcion,
    fecha,
    accion,
  });

  const usuario = await User.findOne({ email });

  if (!usuario) {
    return res
      .status(400)
      .json({ message: `${email} no está registrado en la Base de Datos` });
  }

  const incidencia = await nwIncidencia.save();

  usuario.incidencia.push(incidencia._id);
  const sv_usuario = await usuario.save();

  res.status(200).json({
    error: false,
    message: "La Incidencia fue creada correctamente",
    sv_usuario,
  });
};

const mostrarIncidenciaxId = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({
        message:
          "Fallo al encontrar el ID de la incidencia! Acceso Denegado!",
      });
  } else {
    const incidencia = await Incidencia.findById(req.params.id);
    if (!incidencia) {
      return res
        .status(400)
        .json({ message: "El ID proporcionado no es válido" });
    } else {
      return res.status(200).json({ incidencia });
    }
  }
};

const incidenciasxUsuario = async (req,res) => {
  if(!req.params.codigo) return res.status(400).json({message:"Debe proporcionar el Código del usuario"})

  const incidenciasUser = await User.findOne({codigo: req.params.codigo}).populate('incidencia')

  if(!incidenciasUser){
    return res.status(400).json({message:`El Código ${req.params.codigo} no está registrado. Ingrese otro por favor`})
  }else{
    return res.status(200).json(incidenciasUser)
  }

}

module.exports={
    createIncidencia,
    mostrarIncidenciaxId,
    incidenciasxUsuario
}