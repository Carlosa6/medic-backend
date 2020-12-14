const Rol = require("../model/Rol");

const getRols = async (req, res) => {
  const rols = await Rol.find().sort({ name: 1, description: 1 });
  if (rols) {
    res.status(200).json({ error: false, rols });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "No hay roles registrados en el sistema" });
  }
};

module.exports = {
  getRols,
};
