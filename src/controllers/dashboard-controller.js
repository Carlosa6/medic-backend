const generals = require('../libs/generals')

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


