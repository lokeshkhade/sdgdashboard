
const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');



///////////////////////////COMMON//////////////

router.get('/getdistrict', async (req, res) => {

    var query = `SELECT dg.district_name, dg.district_code FROM dim_geo dg WHERE dg.district_code NOT IN 
                ('DT28','DT29','DT30','DT31','DT32','DT33','CG01') order by district_name asc`;
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

router.get('/getgoalwisedatagis/:idg/:idy', async (req, res) => {
    var id = req.params.idg;
    var id2 = req.params.idy;

    var query = `SELECT df.goal_id,df.goal_name,df.goal_description,
                df.goal_index,df.goal_img,df.goal_info,df.goal_color,df.goal_targets,
                df.goal_indicators,df.goal_output_indicator,df.goal_outcome_indicator,df.goal_process_indicator,df.goal_state_score,df.dif_targets,df.dif_indicators,df.goal_id_unicode,
                df.goal_name_unicode,df.goal_description_unicode,df.goal_info_unicode , dm.mappath, dm.year               
				FROM sdg_goal_master df
				LEFT JOIN sdg_goal_master_gis_map dm ON dm.goal_id=df.goal_id 
                WHERE df.goal_id=? AND dm.year=? ORDER BY df.goal_id`;

    try {
        let result = await mysql.exec(query, [id,id2]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

router.get('/getgoalwiseindiactorgis/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT dm.indicator_master_id,di.dif_target_id, di.sdg_goal_master_id,sm.goal_description , sm.goal_name, 
                di.dif_target_desc,di.dif_target_desc_unicode, dm.target_id,dm.type_of_indicator,dm.data_source,dm.periodicity,
                dm.district_indicator_desc, dm.computation_description_of_indicator,dm.uom
                , dm.data_link, dm.progress_year_data_source, dm.kpi_target2030,dm.mappath,dm.mappath2015,
                dm.kpi_negation,  dm.data_provider_at_district FROM dif_district_indicator_master_gis dm 
                LEFT JOIN dif_target_master di ON di.dif_target_id=dm.target_id
                LEFT JOIN sdg_goal_master sm ON sm.goal_id = di.sdg_goal_master_id
                WHERE di.sdg_goal_master_id = ? ORDER BY dm.district_indicator_desc`;

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

router.get('/getyear', async (req, res) => {

    var query = `SELECT * from gis_year gs ORDER BY gs.year desc`;
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

//CHECKED
router.get('/getgoalwiseindicator/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT df.indicator_master_id,
                df.goal_id,df.target_id, df.district_indicator_desc FROM dif_district_indicator_master df
                WHERE df.goal_id=? ORDER BY df.district_indicator_desc`;

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

router.get('/getindicatorname/:id/:id1/:id2', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id1;
    var id2 = req.params.id2;

    var query = `SELECT df.indicator_master_id,dm.mappath,
                    df.goal_id,df.target_id, df.district_indicator_desc FROM dif_district_indicator_master df
                    LEFT JOIN dif_district_indicator_master_gis_map dm ON df.indicator_master_id=dm.indicator_master_id 
                    WHERE df.goal_id=? and df.indicator_master_id=? AND dm.year=? 
                    ORDER BY df.district_indicator_desc`;

    try {
        let result = await mysql.exec(query, [id,id1,id2]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

//CHECKED
router.get('/getcompositescore/:id', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id;

    var query = `select T.district_name, round(sum(T.NORMALISE21)/15) AS compositescore , T.district_code from (
                select TVALUE.goal_index , TVALUE.goal_id goal_id , TVALUE.district_code , TVALUE.district_name,  
                (CASE WHEN (round(SUM(TVALUE.val)/ TVALUE.indicount) > 100) THEN 100
                else
                round(SUM(TVALUE.val)/ TVALUE.indicount) 
                END) as NORMALISE21
                from
                (
                select iwns.district_code , iwns.goal_name , iwns.goal_id , iwns.indicount , sgm.goal_index ,
                dg.district_name , (CASE WHEN (iwns.district_indicator_master_id=1032 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1037 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1023 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1006 AND iwns.valueyear = 2022)
                THEN 0 ELSE iwns.normalize_value END) AS val
                from dif_normalize_score iwns,sdg_goal_master sgm,dim_geo dg
                where iwns.goal_id = sgm.goal_id and dg.district_code=iwns.district_code and iwns.valueyear = ?) TVALUE
                group by TVALUE.district_code , TVALUE.district_name , TVALUE.indicount , TVALUE.goal_index , TVALUE.goal_id
                union select cast(substring(dc.goal_id,5) as INTEGER) goal_index , dc.goal_id , 'CG01' as district_code, 'Chhattisgarh' as district_name,
                round(sum(CASE WHEN (dc.district_indicator_master_id=1032 AND dc.cg_year = 2022) 
                OR (dc.district_indicator_master_id=1037 AND dc.cg_year = 2022) 
                OR (dc.district_indicator_master_id=1023 AND dc.cg_year = 2022) 
                OR (dc.district_indicator_master_id=1006 AND dc.cg_year = 2022)
                THEN 0 ELSE dc.normalize_score END)
                /SUM(CASE WHEN 
                (dc.district_indicator_master_id=1032 AND dc.cg_year = 2022)OR 
                (dc.district_indicator_master_id=1037 AND dc.cg_year = 2022) OR
                (dc.district_indicator_master_id=1023 AND dc.cg_year = 2022) OR 
                (dc.district_indicator_master_id=1006 AND dc.cg_year = 2022) THEN 0 ELSE 1 END)) 
                as NORMALISE21
                from dif_cg_averagedata dc , sdg_goal_master sgm2
                where sgm2.goal_id = dc.goal_id and dc.cg_year = ? group by dc.goal_id
                ) as T group by T.district_name order by 1`;

    try {
        let result = await mysql.exec(query, [id,id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});


router.get('/getgoalwisecompositescore/:id/:id1', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id1;

    var query = `select cast(substring(dc.goal_id,5) as INTEGER) goal_index , dc.goal_id , 'CG01' as district_code, 'Chhattisgarh' as district_name, 
                round(sum(CASE WHEN (dc.district_indicator_master_id=1032 AND dc.cg_year = 2022) 
                OR (dc.district_indicator_master_id=1037 AND dc.cg_year = 2022) 
                OR (dc.district_indicator_master_id=1023 AND dc.cg_year = 2022) 
                OR (dc.district_indicator_master_id=1006 AND dc.cg_year = 2022)
                THEN 0 ELSE dc.normalize_score END)
                /SUM(CASE WHEN 
                (dc.district_indicator_master_id=1032 AND dc.cg_year = 2022)OR 
                (dc.district_indicator_master_id=1037 AND dc.cg_year = 2022) OR
                (dc.district_indicator_master_id=1023 AND dc.cg_year = 2022) OR 
                (dc.district_indicator_master_id=1006 AND dc.cg_year = 2022) THEN 0 ELSE 1 END)) 
                as compositescore	 
                from dif_cg_averagedata dc , sdg_goal_master sgm2
                where sgm2.goal_id = dc.goal_id  and 
                dc.cg_year = ? AND  dc.goal_id = ? group by dc.goal_id order by goal_index`;

    try {
        let result = await mysql.exec(query, [id,id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});





router.get('/getindicatorwisemetadatagis/:id/:id1', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id1;

    var query = `SELECT dm.indicator_master_id,di.dif_target_id, di.sdg_goal_master_id,sm.goal_description , sm.goal_name, 
                di.dif_target_desc,di.dif_target_desc_unicode, dm.target_id,dm.type_of_indicator,dm.data_source,dm.periodicity,
                dm.district_indicator_desc, dm.computation_description_of_indicator,dm.uom
                , dm.data_link, dm.progress_year_data_source, dm.kpi_target2030,
                dm.kpi_negation,  dm.data_provider_at_district FROM dif_district_indicator_master dm 
                LEFT JOIN dif_target_master di ON di.dif_target_id=dm.target_id
                LEFT JOIN sdg_goal_master sm ON sm.goal_id = di.sdg_goal_master_id
                WHERE di.sdg_goal_master_id = ? and dm.indicator_master_id = ? ORDER BY dm.district_indicator_desc`;

    try {
        let result = await mysql.exec(query, [id,id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});


router.get('/getcgcompositemap/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT gy.year,gy.mappath FROM gis_cg_map gy WHERE gy.year =?`;

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



module.exports = router;