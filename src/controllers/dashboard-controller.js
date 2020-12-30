const FichaMedica = require('../model/FichaMedica');
const TipoSangre = require('../model/TipoSangre');

async function cantidadUsuariosxTipoSangre(tipo, anio) {
    const cantidad = await FichaMedica.find({ tipoSangre: tipo, anio: anio }).countDocuments()
    return cantidad;
}

async function idDelTipoDeSangre(tipo) {
    const elid = await TipoSangre.findOne({ tipo: tipo })
    return elid._id
}

exports.chartTipoSangre = (req, res) => {

    // const labels = ["A+", "A-", "O+"]

    // let amas = {
    //     a2017: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Amas"), 2017),
    //     a2018: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Amas"), 2018),
    //     a2019: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Amas"), 2019),
    //     a2020: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Amas"), 2020)
    // }

    // let amenos = {
    //     a2017: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Amenos"), 2017),
    //     a2018: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Amenos"), 2018),
    //     a2019: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Amenos"), 2019),
    //     a2020: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Amenos"), 2020),
    // }

    // let omas = {
    //     o2017: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Omas"), 2017),
    //     o2018: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Omas"), 2018),
    //     o2019: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Omas"), 2019),
    //     o2020: cantidadUsuariosxTipoSangre(idDelTipoDeSangre("Omas"), 2020),
    // }

    // res.render('chart', {
    //     labels: JSON.stringify(labels),
    //     amas: JSON.stringify([amas.a2017, amas.a2018, amas.a2019, amas.a2020]),
    //     amenos: JSON.stringify([amenos.a2017, amenos.a2018, amenos.a2019, amenos.a2020]),
    //     omas: JSON.stringify([omas.o2017, omas.o2018, omas.o2019, omas.o2020])
    // })

}

// FUNCIÓN QUE RETORNA LA CANTDAD DE USUARIOS POR TIPO DE SEGURO MÉDICO UNMSM Y AÑO
async function countUNMSMByYear(anio) {
    const cantidad = await FichaMedica.find({ "seguroMedico.UNMSM": true, anio: anio }).countDocuments()
    return cantidad
}

// FUNCIÓN QUE RETORNA LA CANTDAD DE USUARIOS POR TIPO DE SEGURO MÉDICO MINSA Y AÑO
async function countMINSAyYear(anio) {
    const cantidad = await FichaMedica.find({ "seguroMedico.MINSA": true, anio: anio }).countDocuments()
    return cantidad
}

// FUNCIÓN QUE RETORNA LA CANTDAD DE USUARIOS POR TIPO DE SEGURO MÉDICO ESSALUD Y AÑO
async function countESSALUDByYear(anio) {
    const cantidad = await FichaMedica.find({ "seguroMedico.ESSALUD": true, anio: anio }).countDocuments()
    return cantidad
}

exports.seguroMedico = async (req, res) => {
    let unmsm = {
        unmsm2017: await countUNMSMByYear(2017),
        unmsm2018: await countUNMSMByYear(2018),
        unmsm2019: await countUNMSMByYear(2019),
        unmsm2020: await countUNMSMByYear(2020)
    }
    let minsa = {
        minsa2017: await countMINSAyYear(2017),
        minsa2018: await countMINSAyYear(2018),
        minsa2019: await countMINSAyYear(2019),
        minsa2020: await countMINSAyYear(2020)
    }
    let essalud = {
        essalud2017: await countESSALUDByYear(2017),
        essalud2018: await countESSALUDByYear(2018),
        essalud2019: await countESSALUDByYear(2019),
        essalud2020: await countESSALUDByYear(2020)
    }
    const seguros = ["UNMSM", "MINSA", "ESSALUD"]
    const anios = ["2017", "2018", "2019", "2020"]
    res.render('seguroMedico', {
        seguros: JSON.stringify(seguros),
        anios: JSON.stringify(anios),
        unmsm: JSON.stringify([unmsm.unmsm2017, unmsm.unmsm2018, unmsm.unmsm2019, unmsm.unmsm2020]),
        minsa: JSON.stringify([minsa.minsa2017, minsa.minsa2018, minsa.minsa2019, minsa.minsa2020]),
        essalud: JSON.stringify([essalud.essalud2017, essalud.essalud2018, essalud.essalud2019, essalud.essalud2020]),
    })
}
