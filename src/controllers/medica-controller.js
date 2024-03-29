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

  const idTipoSangre = await TipoSangre.findOne({ tipo: tipoSangre })

  if (!idTipoSangre) return res.status(400).json({ message: "El tipo de sangre seleccionado no es válido" })

  newFM.tipoSangre = idTipoSangre._id

  const fm = await newFM.save()

  if (!email) return res.status(400).json({ message: "Fallo al encontrar el correo electrónico del usuario" })

  const usuario = await User.findOne({ email })

  if (!usuario) return res.status(400).json({ message: `${email} no está registrado en la Base de Datos` })

  usuario.fichaMedica.push(fm._id)
  const savedUsuario = await usuario.save()

  res.status(200).json({ error: false, message: 'La ficha medica fue creada correctamente', savedUsuario })
};

const listarFichaMedicaxUsuario = async (req, res) => {
  const usuario = await User.findOne({ codigo: req.params.usuario }).sort({ updatedAt: -1 }).populate('fichaMedica').populate('rol')

  if (!usuario) {
    return res.status(400).json({ error: true, message: `El código ${req.params.usuario} no existe en el sistema` });
  } else {
    const findTipoSangre = await TipoSangre.findById(usuario.tipoSangre)
    return res.status(200).json({ error: false, usuario, tipoSangre: findTipoSangre });
  }

}

const mostrarFichaxId = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Fallo al encontrar el ID de la Ficha Médica! Acceso Denegado!" })
  } else {
    const ficha = await FichaMedica.findById(req.params.id)
    if (!ficha) {
      return res.status(400).json({ message: "El ID proporcionado no es válido" })
    } else {
      return res.status(200).json({ ficha })
    }
  }
}

const updateFichaMedica = async (req, res) => {

  const { id } = req.params

  if (!id) return res.status(400).json({ message: "Debe proporcionar el ID de la Ficha Médica" })

  const {
    diagnostico,
    tipoSangre,
    medicamentoHabitual,
    medicamentosAlergicos,
    seguroMedico,
    anio,
    email,
  } = req.body;

  const idTipoSangre = await TipoSangre.findOne({ tipo: tipoSangre })

  if (!idTipoSangre) return res.status(400).json({ message: "El tipo de sangre seleccionado no es válido" })

  if (!email) return res.status(400).json({ message: "Fallo al encontrar el correo electrónico del usuario" })

  const updateFicha = await FichaMedica.findByIdAndUpdate(id, {
    diagnostico,
    tipoSangre: idTipoSangre._id,
    medicamentoHabitual,
    medicamentosAlergicos,
    seguroMedico,
    anio
  }, {
    new: true
  })

  res.status(200).json(updateFicha)

}

const deleteFichaMedica = async (req, res) => {
  const { id, usuario } = req.params //id: de la ficha medica, usuario: dni del usuario

  if (!usuario) return res.status(400).json({ message: "Debe proporcionar el Número de DNI del Usuario" })
  if (!id) return res.status(400).json({ message: "Debe proporcionar el ID de la Ficha Médica" })

  //VALIDAR QUE EL ID DE LA FICHA MÉDICA EXISTA EN LA BD
  const isIDValid = await FichaMedica.findById(id)

  if (!isIDValid) return res.status(400).json({ message: `El ID ${id} no está registrado` })

  //Eliminar de la colección de Ficha Médica
  await FichaMedica.findByIdAndDelete(id)

  //Eliminar el id del campo fichaMedica de usuarios
  const userFichaMedica = await User.findOne({ dni: usuario })
  //validar que exista el número de DNI
  if (!userFichaMedica) return res.status(400).json({ message: `El N° de DNI ${usuario} no está registrado` })

  let fichasMedicaDelUsuario = userFichaMedica.fichaMedica

  if (!fichasMedicaDelUsuario.includes(id)) { //si el id de la ficha médica no pertenece al usuario
    return res.status(400).json({ message: `La Ficha Médica no le pertenece al Usuario` })
  } else {
    let it = fichasMedicaDelUsuario.indexOf(id) //buscar el índice
    fichasMedicaDelUsuario.splice(it, 1) //eliminar
    await userFichaMedica.save()
  }

  res.status(200).json({ message: "Ficha Médica Eliminada correctamente" })

}

module.exports = {
  createFichaMedica,
  listarFichaMedicaxUsuario,
  mostrarFichaxId,
  updateFichaMedica,
  deleteFichaMedica
};
