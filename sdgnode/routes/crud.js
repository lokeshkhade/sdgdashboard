const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');


// router.get('/getStudentDetails', async (req, res) => {

//     //var query = "SELECT * FROM studentdetails";
//     var query = `SELECT s.student_id,s.student_name,s.dob,c.name AS course_name,s.course_id,s.mobile_no FROM studentdetails s INNER JOIN courses c ON s.course_id=c.id`

//     try {
//         let result = await mysql.exec(query);
//         if (result.length == 0) {
//             return res.status(404).send("Course Not Found");
//         }
//         return res.json(result);
//     } catch (err) {

//         return res.status(404).json(err);
//     }
// });

// router.get('/getStudentDetailsById/:id', async (req, res) => {
//     var id = req.params.id;
    
//         var query = "SELECT * FROM studentdetails WHERE student_id = ?";

//     try {
//         let result = await mysql.exec(query, [id]);
//         if (result.length == 0) {
//             return res.status(404).send("Course Not Found");
//         }
//         return res.json(result);
//     } catch (err) {

//         return res.status(404).json(err);
//     }
// });

// router.post('/', async (req, res) => {
//     console.log(req.body);
//     const { error } = validateStudentDetails(req.body);
//     if (error) {
//         res.status(404).send(error.details[0].message);
//     }
//     var values = req.body;
//     var query = "INSERT INTO studentdetails SET ? ";

//     try {

//         let data = await mysql.exec(query, values);
//         res.json({
//             student_id: data.insertId

//         });
//     } catch (err) {

//         return res.status(404).json(err);
//     }


// });


//---------DIF ENTRY (INSERT) AT DISTRICT----------//

router.post('/difinsert', async (req, res) => 
{  
    var values = req.body;
    var count = Object.keys(values.diffentry).length;
    for (let index = 0; index < count; index++) 
    {
        var diffdata = values.diffentry[index];
        diffdata.valueyear = values.valueyear;
        diffdata.district = values.district;  
        var query = "INSERT INTO dif_indicator_values SET ? ";
        var data = await mysql.exec(query, diffdata);
    }
    try 
    {
       // let data = await mysql.exec(query, diffdata);
        res.json({
            student_id: data.insertId

        });
    } 
    catch (err) 
    {
        return res.status(404).json(err);
    }
});

//---------DIF ENTRY (UPDATE) AT DISTRICT----------//

router.put('/difinsert', async (req, res) => {

    var values = req.body;
    var count = Object.keys(values.diffentry).length;
    for (let index = 0; index < count; index++) 
    {
        var diffdata = values.diffentry[index];
        diffdata.valueyear = values.valueyear;
        diffdata.district = values.district;
            var district_indicator_master_id = values.diffentry[index].district_indicator_master_id
            var query = "UPDATE dif_indicator_values SET ? WHERE  valueyear= ? and district =? and district_indicator_master_id=? ";
            var data = await mysql.exec(query, [diffdata, values.valueyear, values.district, district_indicator_master_id ]);
    }    
   try
   {  
        if (data.affectedRows < 1) {
            return res.status(404).send('error');
        }
        res.json({ success: "Data" });
   }   
   catch (err) 
   {
    return res.status(404).json(err);
   }
});


router.delete('/:id', (req, res) => {

    var id = req.params.id;
    var query = "DELETE FROM courses WHERE id = ?";
    mysql.exec(query, [id], function (err, data) {
        if (err) { if (err) res.status(404).send('error'); return; };
        if (data.affectedRows < 1) {

            res.status(404).send('error'); return;
        }
        res.json({ success: true });
    });

});


function validateStudentDetails(studentdetails) {
    const schema = Joi.object({
        student_name: Joi.string().min(3).required(),
        dob: Joi.date().required(),
        course_id: Joi.number().required(),
        mobile_no: Joi.number().min(10).required()
    }).unknown(true);
    return schema.validate(studentdetails);

}



module.exports = router;