const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');


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
        //let data = await mysql.exec(query, diffdata);
        return res.json({
            success: "Data" 
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
        return res.json({ success: "Data" });
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
            return res.status(404).send('error'); return;
        }
        return res.json({ success: true });
    });
});

//--------------- STATE - CG DIF INSERT -----------------//

//---------DIF ENTRY (INSERT) AT DISTRICT----------//

router.post('/statedifinsert', async (req, res) => {
    var values = req.body;
    var count = Object.keys(values.diffentry).length;
    for (let index = 0; index < count; index++) {
        var diffdata = values.diffentry[index];
        diffdata.cg_year = values.cg_year;
        var query = "INSERT INTO dif_cg_averagedata SET ? ";
        var data = await mysql.exec(query, diffdata);
    }
    try {
        //let data = await mysql.exec(query, diffdata);
        return res.json({
            success: "Data"
        });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});

//---------DIF ENTRY (UPDATE) AT DISTRICT----------//

router.put('/statedifinsert', async (req, res) => {

    var values = req.body;
    var count = Object.keys(values.diffentry).length;
    for (let index = 0; index < count; index++) 
    {
        var diffdata = values.diffentry[index];
        diffdata.cg_year = values.cg_year;
        var district_indicator_master_id = values.diffentry[index].district_indicator_master_id
        var query = "UPDATE dif_cg_averagedata SET ? WHERE  cg_year= ? and district_indicator_master_id=? ";
        var data = await mysql.exec(query, [diffdata, values.cg_year,  district_indicator_master_id]);
    }
    try {
        if (data.affectedRows < 1) {
            return res.status(404).send('error');
        }
        return res.json({ success: "Data" });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});


////////////////////////////////////////////////////


router.post('/sifinsert', async (req, res) => {
    var values = req.body;
    var count = Object.keys(values.diffentry).length;
   
    for (let index = 0; index < count; index++) {
        var diffdata = values.diffentry[index];
        diffdata.Year = values.Year;
        var query = "INSERT INTO sif_indicator_values SET ? ";
        var data = await mysql.exec(query, diffdata);
    }
    try {
        //let data = await mysql.exec(query, diffdata);
        return res.json({
            success: "Data"
        });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});





//---------DIF ENTRY (UPDATE) AT DISTRICT----------//

router.put('/sifinsert', async (req, res) => {
    var values = req.body;
    var count = Object.keys(values.sifentry).length;
    //console.log(req.body,count);
    for (let index = 0; index < count; index++) 
    {
        var diffdata = values.sifentry[index];
        diffdata.Year = values.Year;
        var indicator_id = values.sifentry[index].indicator_id
        var query = "UPDATE sif_indicator_values SET ? WHERE  Year= ? and indicator_id=? ";
        var data = await mysql.exec(query, [diffdata, values.Year, indicator_id]);
    }
    try {
        if (data.affectedRows < 1) {
            return res.status(404).send('error');
        }
        return res.json({ success: "Data" });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});


// --------------- UPDATE VISITOR COUNT ------------------ //

router.put('/updatevisitorcount', async (req, res) => 
{
    var values = req.body;   
    var visitor_count = values.visitor_count;
    //var status = 'A';
    var query = "UPDATE visitor_count SET visitor_count = ? WHERE  id = 1";
    var data = await mysql.exec(query, [visitor_count]);
    
    try {
        if (data.affectedRows < 1) {
            res.status(200).json("Data Not Found");
        }
        res.json({ success: "Data" });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});

// --------------- UPDATE INDICATOR FLAG  ------------------ / /


router.put('/updateIndicatorflag', async (req, res) => 
{   
    var values = req.body;
    var indicator_master_id = values.indicator_master_id;
    var delete_flag = values.delete_flag;
    var query = "UPDATE dif_district_indicator_master SET delete_flag = ? WHERE  indicator_master_id = ?";
    var data = await mysql.exec(query, [delete_flag,indicator_master_id]);
    try {
        if (data.affectedRows < 1) 
        {
            res.status(200).json("Data Not Found");
        }
        res.json({ success: "Data" });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});


// ---------- UPDATE FREEZ-UNFREEZ FLAG ----------//


router.put('/updatefreezreq', async (req, res) => 
{
    var values = req.body;
    var freezefrom = values.freezefrom;
    var freezeto = values.freezeto;
    var createdby = values.createdby;
    var districtcode = values.districtcode;
    var dif_year = values.dif_year;
    var department_id = values.department_id;

    var query = `UPDATE dif_modify_freeze_data SET freezeflag = 'F', freezefrom = ?, freezeto = ? , createdby = ?
                 WHERE  districtcode = ? and dif_year = ? and department_id = ?`;
    var data = await mysql.exec(query, [freezefrom, freezeto, createdby, districtcode, dif_year, department_id]);
    try {
        if (data.affectedRows < 1) 
        {
            return res.status(200).json("Data Not Found");
        }
        return res.json({ success: "Data" });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});

router.put('/updatedeptfreezreq', async (req, res) => {
    var values = req.body;
    var freezefrom = values.freezefrom;
    var freezeto = values.freezeto;
    var createdby = values.createdby;
    var dif_year = values.dif_year;
    var department_id = values.department_id;

    var query = `UPDATE dif_modify_freeze_data SET freezeflag = 'F', freezefrom = ?, freezeto = ? , createdby = ?
                 WHERE  dif_year = ? and department_id = ?`;
    var data = await mysql.exec(query, [freezefrom, freezeto, createdby, dif_year, department_id]);
    try {
        if (data.affectedRows < 1) {
            return res.status(200).json("Data Not Found");
        }
        return res.json({ success: "Data" });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});


router.put('/updatedistrictfreezreq', async (req, res) => 
{
    var values = req.body;
    var freezefrom = values.freezefrom;
    var freezeto = values.freezeto;
    var createdby = values.createdby;
    var districtcode = values.districtcode;
    var dif_year = values.dif_year;

    var query = `UPDATE dif_modify_freeze_data SET freezeflag = 'F', freezefrom = ?, freezeto = ? , createdby = ?
                 WHERE  districtcode = ? and dif_year = ?`;

    var data = await mysql.exec(query, [freezefrom, freezeto, createdby, districtcode, dif_year]);
    try {
        if (data.affectedRows < 1) 
        {
            return res.status(200).json("Data Not Found");
        }
        return res.json({ success: "Data" });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});


router.put('/updateallfreezreq', async (req, res) => 
{
    var values = req.body;
    var freezefrom = values.freezefrom;
    var freezeto = values.freezeto;
    var createdby = values.createdby;
    var dif_year = values.dif_year;

    var query = `UPDATE dif_modify_freeze_data SET freezeflag = 'F', freezefrom = ?, freezeto = ? , 
                 createdby = ? WHERE dif_year = ?`;
    var data = await mysql.exec(query, [freezefrom, freezeto, createdby, dif_year]);
    try {
        if (data.affectedRows < 1) {
            return res.status(200).json("Data Not Found");
        }
        return res.json({ success: "Data" });
    }
    catch (err) {
        return res.status(404).json(err);
    }
});



function validateStudentDetails(studentdetails) 
{
    const schema = Joi.object({
        student_name: Joi.string().min(3).required(),
        dob: Joi.date().required(),
        course_id: Joi.number().required(),
        mobile_no: Joi.number().min(10).required()
    }).unknown(true);
    return schema.validate(studentdetails);

}



module.exports = router;