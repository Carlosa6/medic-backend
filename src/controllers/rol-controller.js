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

const postRol = async (req,res)=>{

  const {name,description} = req.body

  const newRol = new Rol({
    name,description
  })

  const savedRol = await newRol.save();

  res.status(200).json({ error: false, message: 'El rol ' + name + ' fue creado correctamente' })

}

const updateRol = async(req,res)=>{

  const id = req.params.id
  const {name,description}=req.body

  const foundRol = await Rol.findOne({_id:id})

  foundRol.name=name
  foundRol.description=description

  const saveRol = await foundRol.save();
  
  res.status(200).json({ error: false, message: 'El rol  fue actualizado correctamente' })

}

const deleteRol = async(req,res)=>{

  const id = req.params.id

  await Rol.deleteOne({_id:id})
  res.status(200).json({ error: false, message: 'El rol  fue eliminado correctamente' })

}

const getRolById = async (req, res) => {
  const id = req.params.id
  const foundRol = await Rol.findOne({_id:id})
  if (foundRol) {
    res.status(200).json({ error: false, foundRol });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "No hay este rol registrado en el sistema" });
  }
};

module.exports = {
  getRols,postRol,updateRol,deleteRol,getRolById
};
