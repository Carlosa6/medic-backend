const generals = require('../libs/generals')
const FichaMedica = require('../model/FichaMedica')

exports.chartTipoSangre = (req,res) => {

    const label1 = ["A+","A-","B+","B-","AB+","AB-","O+","O-"]
    const data1 = [23,45,18,56,28,39,100,62]

    const label2 = generals.SEGURO_MEDICO
    const data2 = [63,90,2,34,45,13,18,8]

    res.render('chart',{
        label1:JSON.stringify(label1),
        data1:JSON.stringify(data1),
        label2: JSON.stringify(label2),
        data2: JSON.stringify(data2)
    })

}

// FUNCIÓN QUE RETORNA LA CANTDAD DE USUARIOS POR TIPO DE SEGURO MÉDICO UNMSM Y AÑO
async function countUNMSMByYear(anio){
    const cantidad = await FichaMedica.find({"seguroMedico.UNMSM":true,anio:anio}).countDocuments()
    return cantidad
}

// FUNCIÓN QUE RETORNA LA CANTDAD DE USUARIOS POR TIPO DE SEGURO MÉDICO MINSA Y AÑO
async function countMINSAyYear(anio){
    const cantidad = await FichaMedica.find({"seguroMedico.MINSA":true,anio:anio}).countDocuments()
    return cantidad
}

// FUNCIÓN QUE RETORNA LA CANTDAD DE USUARIOS POR TIPO DE SEGURO MÉDICO ESSALUD Y AÑO
async function countESSALUDByYear(anio){
    const cantidad = await FichaMedica.find({"seguroMedico.ESSALUD":true,anio:anio}).countDocuments()
    return cantidad
}

exports.seguroMedico = async (req,res) => {
    let unmsm = {
        unmsm2017:await countUNMSMByYear(2017),
        unmsm2018:await countUNMSMByYear(2018),
        unmsm2019:await countUNMSMByYear(2019),
        unmsm2020:await countUNMSMByYear(2020)
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
    const seguros = ["UNMSM","MINSA","ESSALUD"]
    const anios = ["2017","2018","2019","2020"]
    res.render('seguroMedico',{
        seguros: JSON.stringify(seguros),
        anios: JSON.stringify(anios),
        unmsm:JSON.stringify([unmsm.unmsm2017,unmsm.unmsm2018,unmsm.unmsm2019,unmsm.unmsm2020]),
        minsa:JSON.stringify([minsa.minsa2017,minsa.minsa2018,minsa.minsa2019,minsa.minsa2020]),
        essalud:JSON.stringify([essalud.essalud2017,essalud.essalud2018,essalud.essalud2019,essalud.essalud2020]),
    })
}
