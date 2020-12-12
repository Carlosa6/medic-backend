const FichaMedica = require("../model/FichaMedica");
const User = require("../model/User");
const TipoSangre = require('../model/TipoSangre')

const createFichaMedica = async (req, res) => {
  const {
    diagnostico,
    tipoSangre,
    medicamentoHabitual,
    medicamentosAlergicos,
    seguroMedico,
    anio,
    email,
  } = req.body;

  const newFM = new FichaMedica({
    diagnostico,
    medicamentoHabitual,
    medicamentosAlergicos,
    seguroMedico,
    anio
  });

  const idTipoSangre = await TipoSangre.findOne({tipo:tipoSangre})

  if(!idTipoSangre) return res.status(400).json({message:"El tipo de sangre seleccionado no es válido"})

  newFM.tipoSangre = idTipoSangre._id

  const fm = await newFM.save()

  if(!email) return res.status(400).json({message:"Fallo al encontrar el correo electrónico del usuario"})

  const usuario = await User.findOne({ email })
  usuario.fichaMedica.push(fm._id)
  const savedUsuario = await usuario.save()

  res.status(200).json({ error: false, message: 'La ficha medica fue creada correctamente', savedUsuario })
};

const listarFichaMedicaxUsuario = async (req, res) => {
  const usuario = await User.findOne({ codigo: req.params.usuario }).sort({updatedAt:-1}).populate('fichaMedica').populate('rol')

  if (!usuario) {
    return res.status(400).json({ error: true, message: `El código ${req.params.usuario} no existe en el sistema` });
  } else {
    const findTipoSangre = await TipoSangre.findById(usuario.tipoSangre)
    return res.status(200).json({ error: false, usuario,tipoSangre:findTipoSangre });
  }

}

const mostrarFichaxId = async (req,res) => {
  if(!req.params.id){
    return res.status(400).json({message:"Fallo al encontrar el ID de la Ficha Médica! Acceso Denegado!"})
  }else{
    const ficha = await FichaMedica.findById(req.params.id)
    if(!ficha){
      return res.status(400).json({message:"El ID proporcionado no es válido"})
    }else{
      return res.status(200).json({ficha})
    }
  }
}

module.exports = { createFichaMedica,listarFichaMedicaxUsuario,mostrarFichaxId };
