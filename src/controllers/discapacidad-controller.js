const Discapacidad = require("../model/Discapacidad");

const getDiscapacidades = async (req, res) => {
  const discapacidades = await Discapacidad.find().sort({ name: 1 });
  if (discapacidades) {
    res.status(200).json({ error: false, discapacidades });
  } else {
    return res.status(400).json({
      error: true,
      message: "No hay discapacidades registradas en el sistema",
    });
  }
};

const postDiscapacidad = async (req, res) => {
  const { name } = req.body;

  const newDiscapacidad = new Discapacidad({
    name,
  });

  const savedDiscapacidad = await newDiscapacidad.save();

  res.status(200).json({
    error: false,
    message: "La discapacidad " + name + " fue creada correctamente",
  });
};

const updateDiscapacidad = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  const foundDiscapacidad = await Discapacidad.findOne({ _id: id });

  foundDiscapacidad.name = name;

  const saveDiscapacidad = await foundDiscapacidad.save();

  res
    .status(200)
    .json({ error: false, message: "La discapacidad fue actualizada correctamente" });
};

const deleteDiscapacidad = async (req, res) => {
  const id = req.params.id;

  await Discapacidad.deleteOne({ _id: id });
  res
    .status(200)
    .json({ error: false, message: "La discapacidad  fue eliminada correctamente" });
};

const getDiscapacidadById = async (req, res) => {
  const id = req.params.id;
  const foundDiscapacidad = await Discapacidad.findOne({ _id: id });
  if (foundDiscapacidad) {
    res.status(200).json({ error: false, foundDiscapacidad });
  } else {
    return res.status(400).json({
      error: true,
      message: "No hay esta discapacidad registrada en el sistema",
    });
  }
};

module.exports = {
  getDiscapacidades,
  postDiscapacidad,
  getDiscapacidadById,
  updateDiscapacidad,
  deleteDiscapacidad,
};
