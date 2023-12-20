
const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');



///////////////////////////COMMON//////////////


router.get('/getsifgoalwisedata/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT sd.goal_id,sd.goal_name,sd.goal_description,sd.goal_index,
                sd.goal_img,sd.goal_info,sd.goal_color,sd.goal_targets,sd.goal_indicators,
                sd.goal_output_indicator,sd.goal_outcome_indicator,goal_process_indicator,
                sd.goal_name_unicode,sd.goal_outcome_indicator,sd.goal_state_score,
                sd.dif_targets,sd.dif_indicators,sd.goal_id_unicode,sd.goal_name_unicode,
                sd.goal_description_unicode,sd.goal_info_unicode FROM sdg_goal_master sd WHERE sd.goal_id=?`;

    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

//////////////////////////////////////////////////////

router.get('/getsiftargetdata/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT sd.sif_target_id as sif_target_id, sd.sdg_goal_master_id,sd.sif_target_desc,sd.dept_id,sd.index,sd.delete_flag FROM sif_target_master sd 
    WHERE sd.sdg_goal_master_id=? ORDER BY sd.sdg_goal_master_id`;

    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

////////////////////////////////////////////////

router.get('/getsifindicatordata', async (req, res) => 
{

    var query = `SELECT sf.indicator_id, sf.indicator_desc, sm.sif_target_id, sm.sif_target_desc ,
                sf.kpi_target2030,sf.baseline_value
                FROM sif_indicator_master sf 
                LEFT JOIN sif_target_master sm  ON sf.sif_target_id = sm.sif_target_id
                ORDER BY sm.sif_target_id`;
    try {
        let result = await mysql.exec(query);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

/////////////////////////////////////////////////////


router.get('/getallyearsifdata', async (req, res) => 
{
    var query = `SELECT t.indicator_id , t.sif_target_id, sm.sif_target_id,  t.indicator_desc,t.IndicatorValue AS IndicatorValue, t.Year   
                FROM sif_target_master sm 
                LEFT JOIN 
                (select sim.indicator_id ,sim.indicator_desc , round(siv.IndicatorValue,2) AS IndicatorValue, sim.sif_target_id,
                    siv.Year from sif_indicator_values siv 
                    join sif_indicator_master sim
                    on sim.indicator_id = siv.indicator_id order by 1)	AS t ON sm.sif_target_id = t.sif_target_id order by t.indicator_desc `
    try {
        let result = await mysql.exec(query);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

///////////////////////////////////////////////////////

router.get('/getcentralschemegoalwise/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT ss.scheme_id,ss.schemename,ss.scheme_type FROM sif_scheme_details 
                ss WHERE ss.goal_id=? AND ss.scheme_type='Central'`;

    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

router.get('/getstateschemegoalwise/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT ss.scheme_id,
                ss.schemename,ss.scheme_type FROM sif_scheme_details ss 
                WHERE ss.goal_id=? AND ss.scheme_type='State'`;

    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

router.get('/getsifmetadata/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT st.sif_target_desc, sm.indicator_desc,sm.computation_description_of_indicator, sm.uom,
                    sm.data_source,sm.frequency,sm.progress_year_data_source, sm.data_source 
                    FROM sif_indicator_master sm 
                    LEFT JOIN sif_target_master st ON st.sif_target_id=sm.sif_target_id
                    WHERE sm.indicator_id = ?`;
    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

router.get('/getprogressyeardata/:id', async (req, res) => {
    var id = req.params.id;
    var query = `select sim.indicator_id ,sim.kpi_target2030 , sim.baseline_value, siv.IndicatorValue,siv.Year
            from  sif_indicator_master sim  
            left join sif_indicator_values siv
            on sim.indicator_id = siv.indicator_id
            WHERE siv.Year = (select max(T.yrs) from (select distinct siv.Year as yrs from sif_indicator_values siv order by 1 asc LIMIT 4) as T) AND sim.indicator_id = ?`;
    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

////////////////////NEW FORMAT///////////////////////////////////

router.get('/getsiftargetdesc/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT sd.sif_target_id as sif_target_id, sd.sdg_goal_master_id,sd.sif_target_desc,sd.dept_id,
                 sd.index,sd.delete_flag FROM sif_target_master sd 
                 WHERE sd.sif_target_id=?`;

    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

router.get('/getsifindicatordatabytargetid/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT sf.indicator_id, sf.indicator_desc, sm.sif_target_id, sm.sif_target_desc ,
                sf.kpi_target2030,sf.baseline_value
                FROM sif_indicator_master sf 
                LEFT JOIN sif_target_master sm  ON sf.sif_target_id = sm.sif_target_id
                WHERE sm.sif_target_id=?
                ORDER BY sf.indicator_desc`;

    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});


router.get('/getallyearsifdatabytargetid/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT t.indicator_id , t.sif_target_id, 
					 sm.sif_target_id,  t.indicator_desc,
					 t.IndicatorValue AS IndicatorValue, t.Year   
                    FROM sif_target_master sm 
                    LEFT JOIN 
                    (select sim.indicator_id ,sim.indicator_desc , 
					 round(siv.IndicatorValue,2) AS IndicatorValue, 
					 sim.sif_target_id,
                    siv.Year from sif_indicator_values siv  
                    join sif_indicator_master sim
                    on sim.indicator_id = siv.indicator_id 
					WHERE siv.Year IN ('2021','2022'))	
					AS t ON sm.sif_target_id = t.sif_target_id 
					WHERE sm.sif_target_id=?  
					order by t.indicator_desc`;

    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

//////////////////////// EXCEL-REPORT ////////////////////////////

router.get('/getsifreport/:id', async (req, res) => {
    var id = req.params.id;
    var query = `select sim.indicator_id ,sim.indicator_desc , siv.IndicatorValue , siv.Year 
                    from sif_indicator_values siv join sif_indicator_master sim 
		            on sim.indicator_id = siv.indicator_id where siv.Year = ?  order BY  sim.indicator_id`;
    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});


router.get('/getsifyear', async (req, res) => {
    var query = `SELECT distinct siv.Year 
                    from sif_indicator_values siv ORDER BY siv.Year`;
    try {
        let result = await mysql.exec(query);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});




////////////////////////////////////////////////////




module.exports = router;