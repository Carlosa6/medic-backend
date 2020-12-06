const FichaMedica = require("../model/FichaMedica");
const User = require("../model/User");

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
    tipoSangre,
    medicamentoHabitual,
    medicamentosAlergicos,
    seguroMedico,
    anio
  });
  console.log(seguroMedico)
  const fm = await newFM.save()
  const usuario = await User.findOne({ email })
  usuario.fichaMedica.push(fm._id)
  const savedUsuario = await usuario.save()

  res.status(200).json({ error: false, message: 'La ficha medica fue creada correctamente', savedUsuario })
};

const listarFichaMedicaxUsuario = async (req, res) => {
  const usuario = await User.findOne({ codigo: req.params.usuario }).populate('fichaMedica')

  if (!usuario) {
    return res.status(400).json({ error: true, message: "El código del usuario no existe" });
  } else {
    return res.status(200).json({ error: false, usuario });
  }

}

const mostrarFichaxId = async (req,res) => {
  if(!req.params.id){
    return res.status(400).json({message:"Debe proporcionar el id de la ficha médica"})
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
