const helpers = {}

helpers.isAuthenticated = (req,res,next) => {
    if (req.usuario) {
        return next();
    }
    return res.json({error:true,message:"No ha iniciado sesión"})
}

module.exports = helpers;
