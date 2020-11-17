const FichaMedica = require("../model/FichaMedica");
const User = require("../model/User");

const createFichaMedica = async (req, res) => {

    const { diagnostico,tipoSangre,medicamentoHabitual,medicamentosAlergicos,seguroMedico,email } = req.body;

    
    usuario.fichaMedica.add(fm._id)
    usuario.save()

    fm = new FichaMedica()

    ususario=User.find({email}),
    usuario.fichaMedica.push(fm._id)
    usuario
}

module.exports = { createFichaMedica }