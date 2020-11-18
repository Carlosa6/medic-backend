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

  const fm = await newFM.save()
  const usuario = await User.findOne({email})
  usuario.fichaMedica.push(fm._id)
  const savedUsuario = await usuario.save()
  
  res.status(200).json({ error: false, message:'La ficha medica fue creada correctamente',savedUsuario})
};

module.exports = { createFichaMedica };
