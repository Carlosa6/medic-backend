const Rol = require('../model/Rol');
const User = require('../model/User')

const createUser = async (req, res) => {
    const { codigo, nombres, apellidos, dni, email, password, direccion, telefono, rol } = req.body
    const newUser = new User({
        codigo, nombres, apellidos, dni,
         email, password: await User.encryptPassword(password), 
         direccion, telefono
    });
    //si al usuario se le asignó algún rol
    //se verifica con el esquema de roles
    //para obtener su id y guardarlos en el esquema de usuarios
    if(rol){
        const foundRol = await Rol.find({name:rol})
        if(foundRol){
            newUser.rol = rol._id;
        }else{
            return res.status(400).json({error:true,message:`El rol ${rol} no es válido`})
        }
    }else{
        //si no se le asigna un rol
        //asignar el rol de "user"
        const role = await Rol.findOne({name:"user"}) //buscar la info del rol "user"
        newUser.rol = role._id //GUARDAR EL ID
    }

    //guardar el usuario en la bd
    const savedUser = await newUser.save();
    console.log(savedUser)
    res.status(200).json({error:false,user:savedUser})
}


module.exports = {
    createUser
}