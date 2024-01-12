
const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');


router.get('/getpopulatedata/:year/:district', async (req, res) => 
{
    var id1 = req.params.year;
    var id2 = req.params.district;
    var id3 = req.params.year;
    var id4 = req.params.district;

    var query = `SELECT df.indicator_master_id,
                    dv.district_indicator_master_id,
                    df.district_indicator_desc,dv.indicators_value,
                    ds.normalize_value
                    FROM dif_district_indicator_master df  
                    LEFT JOIN dif_indicator_values dv 
                    ON df.indicator_master_id = dv.district_indicator_master_id
                    LEFT JOIN dif_normalize_score ds
                    ON df.indicator_master_id = ds.district_indicator_master_id
                    WHERE dv.valueyear=? AND dv.district=? AND ds.valueyear=? AND ds.district_code = ?
                    ORDER BY df.goal_id,df.district_indicator_desc`;
    try 
    {
        let result = await mysql.exec(query, [id1, id2, id3, id4]);
        if (result.length == 0) 
        {
            return res.status(200).send("Data Not Found");
        }
        return res.json(result);
    } 
    catch (err) 
    {
        return res.status(404).json(err);
    }



});


router.get('/getmaxindicatorevalue/:year/:indicatorid', async (req, res) => {
    var id1 = req.params.year;
    var id2 = req.params.indicatorid;

    var query = `SELECT MAX(df.indicators_value) as maxindivalue FROM dif_indicator_values 
                    df WHERE df.valueyear=? AND df.district_indicator_master_id=?`;
    try 
    {
        let result = await mysql.exec(query, [id1, id2]);
        if (result.length == 0) {
            return res.status(200).send("Data Not Found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }



});

router.get('/getminindicatorevalue/:year/:indicatorid', async (req, res) => {
    var id1 = req.params.year;
    var id2 = req.params.indicatorid;

    var query = `SELECT MIN(df.indicators_value) as minindivalue FROM dif_indicator_values 
                    df WHERE df.valueyear=? AND df.district_indicator_master_id=?`;
    try 
    {
        let result = await mysql.exec(query, [id1, id2]);
        if (result.length == 0) 
        {
            return res.status(200).send("Data Not Found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }



});


router.get('/getindicatorevalue/:year/:indicatorid', async (req, res) => {
    var id1 = req.params.year;
    var id2 = req.params.indicatorid;

    var query = `SELECT * FROM dif_indicator_values 
                df WHERE df.valueyear=? AND df.district_indicator_master_id=? 
                ORDER BY df.district asc`;
    try 
    {
        let result = await mysql.exec(query, [id1, id2]);
        if (result.length == 0) 
        {
            return res.status(200).send("Data Not Found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});



router.get('/getindicatoredata/:year', async (req, res) => 
{
    var id1 = req.params.year;
    var id2 = req.params.year;
    var id3 = req.params.year;
    var query = `SELECT df.indicators_value,df.district,df.valueyear,
                    df.district_indicator_master_id,t.district_indicator_desc,t.dif_maxvalue, t.dif_minvalue,t.kpi_target2030,t.kpi_negation,
                    t.cg_value,t.dif_maxvalue, t.dif_minvalue,t.goal_id,t.indicount,t.dept_id,t.baseline_value
                    ,t.district, t.goal_name
                    FROM dif_indicator_values df 
                    LEFT JOIN 
                    (SELECT MAX(df.indicators_value) as dif_maxvalue,MIN(df.indicators_value) as dif_minvalue,  
                    df.district_indicator_master_id,
                    dm.indicator_master_id, dm.kpi_negation,dm.kpi_target2030,dg.cg_value,
                    dm.district_indicator_desc,dm.goal_id,t2.indicount ,dm.dept_id,dm.baseline_value
                    ,df.district,df.valueyear, t2.goal_name
                    FROM dif_indicator_values df
                    LEFT JOIN dif_district_indicator_master dm                   
                    ON df.district_indicator_master_id=dm.indicator_master_id
                    LEFT JOIN dif_cg_averagedata dg 
                    ON dg.district_indicator_master_id = df.district_indicator_master_id                  					 LEFT JOIN 
                    (SELECT COUNT(dm.indicator_master_id) AS indicount, dm.goal_id , sd.goal_name
						  FROM 	dif_district_indicator_master dm 
						  LEFT JOIN sdg_goal_master sd ON dm.goal_id=sd.goal_id
						  WHERE dm.delete_flag='N'
						  GROUP BY dm.goal_id
						  ) AS t2 ON t2.goal_id = dm.goal_id
                    WHERE df.valueyear=? AND dg.cg_year=?
                    GROUP BY df.district_indicator_master_id 
                    ORDER BY df.district_indicator_master_id ASC) AS t ON 
                    t.district_indicator_master_id = df.district_indicator_master_id
                    WHERE df.valueyear=?
                    ORDER BY df.district_indicator_master_id,df.district`;
    try {
        let result = await mysql.exec(query, [id1, id2, id3]);
        if (result.length == 0) {
            return res.status(200).send("Data Not Found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});


router.get('/getallmaxindicatorevalue/:year', async (req, res) => 
{
    var id1 = req.params.year;
    var query = `SELECT MAX(df.indicators_value) as dif_maxvalue, df.district_indicator_master_id 
                    FROM dif_indicator_values df
                    WHERE df.valueyear=?
                    GROUP BY df.district_indicator_master_id                    
                    ORDER BY df.district_indicator_master_id asc`;
    try {
        let result = await mysql.exec(query, [id1]);
        if (result.length == 0) 
        {
            return res.status(200).send("Data Not Found");
        }
        return res.json(result);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});


router.get('/getallminindicatorevalue/:year', async (req, res) => 
{
    var id1 = req.params.year;
    var query = `SELECT MIN(df.indicators_value) as dif_minvalue, df.district_indicator_master_id 
                    FROM dif_indicator_values df
                    WHERE df.valueyear=?
                    GROUP BY df.district_indicator_master_id 
                    ORDER BY df.district_indicator_master_id asc`;
    try {
        let result = await mysql.exec(query, [id1]);
        if (result.length == 0) 
        {
            return res.status(200).send("Data Not Found");
        }
        return res.json(result);
    }
    catch (err) 
    {
        return res.status(404).json(err);
    }
});


////////// INSERT /////////////////////////////////////////


router.post('/dif_normalize_insert', async (req, res) => 
{  
    var values = req.body;
    var count = values.length;
    for (let index = 0; index < count; index++) 
    {
        var normalizedscore = values[index];
        var query = "INSERT INTO dif_normalize_score_copy1 SET ? ";
        var data = await mysql.exec(query, normalizedscore);
    }
    try 
    {
        //let data = await mysql.exec(query, diffdata);
        return res.json({success: "Data"});
    }
    catch (err) 
    {
        return res.status(404).json(err);
    }
});



module.exports = router;