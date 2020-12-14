const Discapacidad = require('../model/Discapacidad');

const getDiscapacidades = async (req, res) => {
    const discapacidades = await Discapacidad.find().sort({ name: 1});
    if (discapacidades) {
        res.status(200).json({ error: false, discapacidades })
    } else {
        return res.status(400).json({ error: true, message: "No hay discapacidades registradas en el sistema" })
    }
}

module.exports = {
    getDiscapacidades,
  };