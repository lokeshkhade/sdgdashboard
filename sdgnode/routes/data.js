const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');

//////////////MAIN-DASHBOARD-NITIAAYOG///////////////////////////

router.get('/getnitiaayogyear', async (req, res) => {

    var query = `select distinct index_report_year 
                 from niti_aayog_all_year ORDER BY  index_report_year desc`;
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

///////////////////////////////////////////////////////////

router.get('/getnitiaayogdatayearwise/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT goal,value FROM niti_aayog_all_year n 
                 WHERE n.index_report_year  = ? AND n.value!='NA'`;

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

/////////////////////////////////////////////////////////////
// india-map data //

router.get('/getindianitiaayogdatayearwise/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT n.state_map_id,n.state_norm_score,n.state_name FROM  
                 niti_aayog_state_scores n  WHERE n.score_year=?`;

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

//////////////MAIN-DASHBOARD-NITIAAYOG-END///////////////////////
///////////////////CG-DASHBOARD/////////////////////////////
// router.get('/getcggoalscoreyearwise/:id', async (req, res) => {
//     var id = req.params.id;
//     var id1 = req.params.id;

//     var query = `(SELECT ROUND(sum(dn.normalize_value)/COUNT(dn.goal_id),0) AS goalscore,
//                 dn.district_code,dg.district_name,dn.goal_id FROM dif_normalize_score dn
//                 LEFT JOIN dim_geo dg ON dg.district_code = dn.district_code
//                 WHERE dn.valueyear=?
//                 GROUP BY dn.district_code,dg.district_name,dn.goal_id)
//                 UNION
//                 (SELECT ROUND(sum(df.normalize_score)/COUNT(df.goal_id),0) AS goalscore,'CG01','Chhattisgarh',
//                 df.goal_id FROM dif_cg_averagedata df
//                 WHERE df.cg_year=?
//                 GROUP BY df.goal_id)`;

//     try {
//         let result = await mysql.exec(query, [id,id1]);
//         if (result.length == 0) {
//             return res.status(404).send("Data Not Found");
//         }
//         return res.json(result);
//     } catch (err) {

//         return res.status(404).json(err);
//     }
// });

router.get('/getcggoalscoreyearwise/:id', async (req, res) => 
{
    var id = req.params.id;
    var id1 = req.params.id;

    var query = `select TVALUE.goal_index , TVALUE.goal_id goal_id , TVALUE.district_code , 
                TVALUE.district_name,  
                (CASE WHEN (round(SUM(TVALUE.val)/ TVALUE.indicount) > 100) THEN 100
                else
                round(SUM(TVALUE.val)/ TVALUE.indicount) 
                END) as goalscore
                from (select iwns.district_code , iwns.goal_name , iwns.goal_id , 
                    iwns.indicount , sgm.goal_index ,
                    dg.district_name , 
                (CASE WHEN (iwns.district_indicator_master_id=1032 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1037 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1023 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1006 AND iwns.valueyear = 2022)
                THEN 0 ELSE iwns.normalize_value END) AS val
                from dif_normalize_score iwns,sdg_goal_master sgm,dim_geo dg
                    where iwns.goal_id = sgm.goal_id and dg.district_code=iwns.district_code and iwns.valueyear = ?) TVALUE
                group by TVALUE.district_code , TVALUE.district_name , TVALUE.indicount , TVALUE.goal_index , TVALUE.goal_id
                union select cast(substring(dc.goal_id,5) as INTEGER) goal_index , dc.goal_id , 'CG01' , 'Chhattisgarh' , 
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
                where sgm2.goal_id = dc.goal_id and dc.cg_year = ? group by dc.goal_id order by goal_index`;

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

/////////////////////////////////////////////////////////////////////

// router.get('/getcompositescoreyearwisesortname/:id', async (req, res) => {
//     var id = req.params.id;
//     var id1 = req.params.id;

//     var query = `SELECT ROUND(SUM(t1.displayvalue)/15) AS compositescore, 
// 				dg.district_name as district_name, dg.district_code
//                 FROM dim_geo dg	
//                 LEFT JOIN 
//                 (SELECT ROUND(sum(dn.normalize_value)/COUNT(dn.goal_id),0) AS displayvalue, 
//                 dn.district_code,dg.district_name,dn.goal_id FROM dif_normalize_score dn 
//                 LEFT JOIN dim_geo dg ON dg.district_code = dn.district_code
//                 WHERE dn.valueyear=?
//                 GROUP BY dn.district_code,dg.district_name,dn.goal_id
//                 ORDER BY dn.goal_id ) AS t1 ON t1.district_code=dg.district_code
//                 WHERE dg.district_code NOT IN ('DT28','DT29','DT30','DT31','DT32','DT33','CG01')
//                 GROUP BY dg.district_name , dg.district_code
//                 Union
//                 SELECT ROUND(SUM(t1.goalscore)/15) AS compositescore,'Chhattisgarh','CG01'
//                 FROM dim_geo dg				
//                 LEFT JOIN				                
//                 (SELECT ROUND(sum(df.normalize_score)/COUNT(df.goal_id),0) AS goalscore,'CG01' 
//                 AS district_code,'Chhattisgarh',
//                 df.goal_id FROM dif_cg_averagedata df 
//                 WHERE df.cg_year=?
//                 GROUP BY df.goal_id ) AS t1 ON  dg.district_code='CG01'
//                 WHERE dg.district_code='CG01' 
// 				order by district_name`;

//     try {
//         let result = await mysql.exec(query, [id,id1]);
//         if (result.length == 0) {
//             return res.status(404).send("Data Not Found");
//         }
//         return res.json(result);
//     } catch (err) {

//         return res.status(404).json(err);
//     }
// });

////////////////////////////////////////////////////////////


router.get('/getcompositescoreyearwisesortname/:id', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id;

    var query = `select T.district_name, round(sum(T.NORMALISE21)/15) AS compositescore , T.district_code  from (
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
                union select cast(substring(dc.goal_id,5) as INTEGER) goal_index , dc.goal_id , 'CG01' , 'Chhattisgarh' ,
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
                ) as T group by T.district_name order by compositescore desc`;

    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

/////////////////////////////////////////////////////////////////////

// router.get('/getcompositescoreyearwise/:id', async (req, res) => {
//     var id = req.params.id;
//     var id1 = req.params.id;

//     var query = `SELECT ROUND(SUM(t1.displayvalue)/15) AS compositescore, dg.district_name , dg.district_code
//                 FROM dim_geo dg
//                 LEFT JOIN
//                 (SELECT ROUND(sum(dn.normalize_value)/COUNT(dn.goal_id),0) AS displayvalue,
//                 dn.district_code,dg.district_name,dn.goal_id FROM dif_normalize_score dn
//                 LEFT JOIN dim_geo dg ON dg.district_code = dn.district_code
//                 WHERE dn.valueyear=?
//                 GROUP BY dn.district_code,dg.district_name,dn.goal_id
//                 ORDER BY dn.goal_id ) AS t1 ON t1.district_code=dg.district_code
//                 WHERE dg.district_code NOT IN ('DT28','DT29','DT30','DT31','DT32','DT33','CG01')
//                 GROUP BY dg.district_name , dg.district_code
//                 Union
//                 SELECT ROUND(SUM(t1.goalscore)/15) AS compositescore,'Chhattisgarh','CG01'
//                 FROM dim_geo dg
//                 LEFT JOIN
//                 (SELECT ROUND(sum(df.normalize_score)/COUNT(df.goal_id),0) AS goalscore,'CG01'
//                 AS district_code,'Chhattisgarh',
//                 df.goal_id FROM dif_cg_averagedata df
//                 WHERE df.cg_year=?
//                 GROUP BY df.goal_id ) AS t1 ON  dg.district_code='CG01'
//                 WHERE dg.district_code='CG01'
// 				order by compositescore desc`;

//     try {
//         let result = await mysql.exec(query, [id,id1]);
//         if (result.length == 0) {
//             return res.status(404).send("Data Not Found");
//         }
//         return res.json(result);
//     } catch (err) {

//         return res.status(404).json(err);
//     }
// });

///////////////////////////////////////////////////////////////////

router.get('/getcompositescoreyearwise/:id', async (req, res) => {
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
                union select cast(substring(dc.goal_id,5) as INTEGER) goal_index , dc.goal_id , 'CG01' , 'Chhattisgarh' ,
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


router.get('/getcgdashboardyear', async (req, res) => {

    var query = `SELECT DISTINCT ds.valueyear FROM dif_normalize_score ds order by valueyear desc`;
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

//////////////////////////////////////////////////////////////////////////////

router.get('/getnormalizescoreindicatorgolawise/:idyear/:idgoal', async (req, res) => {
    var id = req.params.idyear;
    var id1 = req.params.idgoal; 
    var id2 = req.params.idyear;
    var id3 = req.params.idgoal; 

    var query = `select iw.goal_id, ddim.district_indicator_desc, dg.district_name , iw.district_code ,		
                ifnull(round(iw.normalize_value),'-') as NORMALIZE_VALUE,
                iw.district_indicator_master_id 
                from dif_normalize_score iw, dim_geo dg, dif_district_indicator_master ddim
                where dg.district_code = iw.district_code and ddim.indicator_master_id = iw.district_indicator_master_id 
                and iw.valueyear = ? and iw.goal_id = ? and ddim.delete_flag = 'N'	union
                select dc.goal_id ,dc.indicator_desc , 'Chhattisgarh' ,'CG01' , round(dc.normalize_score) as NORMALISE21,
                dc.district_indicator_master_id from dif_cg_averagedata dc ,sdg_goal_master sgm2,
                dif_district_indicator_master ddim where sgm2.goal_id = dc.goal_id 
                and ddim.indicator_master_id = dc.district_indicator_master_id
                and dc.cg_year = ? and sgm2.goal_id = ? and ddim.delete_flag = 'N'  order by district_indicator_desc`;

    try {
        let result = await mysql.exec(query, [id, id1,id2,id3]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

//////////////////////////////////////////////////

router.get('/getindicatormetadata/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT dm.indicator_master_id,di.dif_target_id, di.sdg_goal_master_id,sm.goal_description , sm.goal_name, 
                di.dif_target_desc,di.dif_target_desc_unicode, dm.target_id, 
                dm.district_indicator_desc, dm.computation_description_of_indicator,dm.uom
                , dm.periodicity, dm.data_link, dm.progress_year_data_source, dm.kpi_target2030,
                dm.kpi_negation, dm.periodicity, dm.data_provider_at_district FROM dif_district_indicator_master dm 
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

router.get('/getindicatormetadatabyid/:id/:id1', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id1;

    var query = `SELECT dm.indicator_master_id,di.dif_target_id, di.sdg_goal_master_id,sm.goal_description , sm.goal_name, 
                di.dif_target_desc,di.dif_target_desc_unicode, dm.target_id, 
                dm.district_indicator_desc, dm.computation_description_of_indicator,dm.uom
                , dm.periodicity, dm.data_link, dm.progress_year_data_source, dm.kpi_target2030,
                dm.kpi_negation, dm.periodicity, dm.data_provider_at_district FROM dif_district_indicator_master dm 
                LEFT JOIN dif_target_master di ON di.dif_target_id=dm.target_id
                LEFT JOIN sdg_goal_master sm ON sm.goal_id = di.sdg_goal_master_id
                WHERE di.sdg_goal_master_id = ? AND dm.indicator_master_id = ? ORDER BY dm.district_indicator_desc`;

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

//////////////////////////////////////////

// GET ALL INDICATOR VALUE //

router.get('/getindicatorvalues/:id/:id2', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id2;

    var query = `SELECT  dm.target_id,dv.district_indicator_master_id,dv.indicators_value, 
                 dv.valueyear,dm.indicator_master_id, 
                dm.district_indicator_desc, dm.uom
                , dm.periodicity, dm.kpi_target2030,
                dm.kpi_negation FROM dif_district_indicator_master dm 
                LEFT JOIN dif_indicator_values dv ON dv.district_indicator_master_id= dm.indicator_master_id
                WHERE dm.goal_id = ? AND dv.district= ? 
                ORDER BY dm.district_indicator_desc,dv.valueyear asc`;

    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

// GET INDICATORWISE INDICATOR VALUE //

router.get('/getindicatorvaluebyid/:id/:id2/:id3', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id2;
    var id2 = req.params.id3;

    var query = `SELECT  dm.target_id,dv.district_indicator_master_id,dv.indicators_value, 
                 dv.valueyear,dm.indicator_master_id, 
                dm.district_indicator_desc, dm.uom
                , dm.periodicity, dm.kpi_target2030,
                dm.kpi_negation FROM dif_district_indicator_master dm 
                LEFT JOIN dif_indicator_values dv ON dv.district_indicator_master_id= dm.indicator_master_id
                WHERE dm.goal_id = ? AND dv.district= ?  AND  dm.indicator_master_id=?
                ORDER BY dm.district_indicator_desc,dv.valueyear asc`;

    try {
        let result = await mysql.exec(query, [id, id1,id2]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

/////////////////////////////////////////////////////////////////

//Goal 1/DT01/1051//
router.get('/getindicatorvaluesbyindicatorid/:id/:id2/:id3', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id2;
    var id2 = req.params.id3;

    var query = `SELECT  dm.target_id,dv.district_indicator_master_id,dv.indicators_value, 
                 dv.valueyear,dm.indicator_master_id, 
                dm.district_indicator_desc, dm.uom
                , dm.periodicity, dm.kpi_target2030,
                dm.kpi_negation FROM dif_district_indicator_master dm 
                LEFT JOIN dif_indicator_values dv ON dv.district_indicator_master_id= dm.indicator_master_id
                WHERE dm.goal_id = ? AND dv.district= ? AND dv.district_indicator_master_id=?  
                ORDER BY dm.district_indicator_desc,dv.valueyear asc`;

    try {
        let result = await mysql.exec(query, [id, id1,id2]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

///////////////////////////////////////////////

router.get('/getdistrictwisenormalizescore/:iddist/:idyear', async (req, res) => {
    var id = req.params.iddist;
    var id1 = req.params.idyear;

    var query = `select iwns.district_code, iwns.GOAL_NAME, iwns.goal_id as goal_id,
                round(SUM(iwns.normalize_value)/ iwns.indicount) as GOALSCORE,sgm.goal_index 
                from dif_normalize_score iwns join sdg_goal_master sgm on sgm.goal_id = iwns.goal_id 
                where iwns.district_code = ? and iwns.valueyear = ?
                group by iwns.district_code,iwns.GOAL_NAME,iwns.goal_id,sgm.goal_img,
                iwns.indicount,sgm.goal_index 
                order by sgm.goal_index`;

    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

///////////////////////////////////////////////////////////
//GET COMPOSITE SCORE FOR ALL DISTRICT//
///////////////////////////////////////////////////////////

router.get('/getdistrictcompositescoreyearwise/:id', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id;

    var query = `select T.district_name as district_name, round(sum(T.NORMALISE21)/15) AS compositescore , T.district_code as district_code from (
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
                ) as T group by T.district_name order by 1`;

    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

///////////////////////////////////////////////////////////
//PERCENTAGE SCORE - FOR CG //
///////////////////////////////////////////////////////////

router.get('/getpercentcompositescoreyearwise/:id', async (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id;

    var query = `SELECT SUM(case when D.compositescore > 0 AND  D.compositescore <= 45 then 1 ELSE 0 END) as Aspirant,
            SUM(case when D.compositescore >= 50 AND  D.compositescore <= 64 then 1 ELSE 0 END) as Performer,
            SUM(case when D.compositescore >=65 AND  D.compositescore <= 99 then 1 ELSE 0 END) as FrontRunner,
            SUM(case when D.compositescore >=100  then 1 ELSE 0 END) as Achiever
            FROM
            (select T.district_name as district_name, round(sum(T.NORMALISE21)/15) AS compositescore , T.district_code as district_code from (
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
                        
                            ) as T group by T.district_name ) AS D`;

    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

////////////////////////////////////////////////////////////
//NORMALISE SCORE FOR PARTICULAR GOAL AND PARTICULAR YEAR - FOR CG //
///////////////////////////////////////////////////////////

router.get('/getcggoalcompositescore/:idyear/:idgoal', async (req, res) => {
    var id = req.params.idyear;
    var id1 = req.params.idgoal;

    var query = `select cast(substring(dc.goal_id,5) as INTEGER) goal_index , dc.goal_id , 'CG01' AS district_code, 'Chhattisgarh' AS district_name,  
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
                as goalscore	 
                from dif_cg_averagedata dc , sdg_goal_master sgm2
                where sgm2.goal_id = dc.goal_id and dc.cg_year = ? AND dc.goal_id = ? group by dc.goal_id order by goal_index`;

    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

////////////////////////////////////////////////////////////
//NORMALISE SCORE FOR PARTICULAR GOAL AND PARTICULAR YEAR - FOR ALL DISTRICT //
///////////////////////////////////////////////////////////

router.get('/getdistrictgoalcompositescore/:idyear/:idgoal', async (req, res) => {
    var id = req.params.idyear;
    var id1 = req.params.idgoal;

    var query = `select TVALUE.goal_index , TVALUE.goal_id goal_id , TVALUE.district_code , 
                TVALUE.district_name,  
                (CASE WHEN (round(SUM(TVALUE.val)/ TVALUE.indicount) > 100) THEN 100
                else
                round(SUM(TVALUE.val)/ TVALUE.indicount) 
                END) as goalscore
                from (select iwns.district_code , iwns.goal_name , iwns.goal_id , 
                    iwns.indicount , sgm.goal_index ,
                    dg.district_name , 
                (CASE WHEN (iwns.district_indicator_master_id=1032 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1037 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1023 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1006 AND iwns.valueyear = 2022)
                THEN 0 ELSE iwns.normalize_value END) AS val
                from dif_normalize_score iwns,sdg_goal_master sgm,dim_geo dg
                    where iwns.goal_id = sgm.goal_id and dg.district_code=iwns.district_code and iwns.valueyear = ? AND  iwns.goal_id=?) TVALUE
                group by TVALUE.district_code , TVALUE.district_name , 
                TVALUE.indicount , TVALUE.goal_index , TVALUE.goal_id order by goalscore desc`;

    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
//NORMALISE SCORE FOR PARTICULAR GOAL AND PARTICULAR YEAR - FOR ALL DISTRICT  + CG //
///////////////////////////////////////////////////////////

router.get('/getcgdistrictgoalcompositescore/:idyear/:idgoal', async (req, res) => {
    var id = req.params.idyear;
    var id1 = req.params.idgoal;
    var id2 = req.params.idyear;
    var id3 = req.params.idgoal

    var query = `select TVALUE.goal_index , TVALUE.goal_id goal_id , TVALUE.district_code , 
                TVALUE.district_name,  
                (CASE WHEN (round(SUM(TVALUE.val)/ TVALUE.indicount) > 100) THEN 100
                else
                round(SUM(TVALUE.val)/ TVALUE.indicount) 
                END) as goalscore
                from (select iwns.district_code , iwns.goal_name , iwns.goal_id , 
                    iwns.indicount , sgm.goal_index ,
                    dg.district_name , 
                (CASE WHEN (iwns.district_indicator_master_id=1032 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1037 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1023 AND iwns.valueyear = 2022) 
                OR (iwns.district_indicator_master_id=1006 AND iwns.valueyear = 2022)
                THEN 0 ELSE iwns.normalize_value END) AS val
                from dif_normalize_score iwns,sdg_goal_master sgm,dim_geo dg
                    where iwns.goal_id = sgm.goal_id and dg.district_code=iwns.district_code 
                    and iwns.valueyear = ? AND  iwns.goal_id=?) TVALUE
                group by TVALUE.district_code , TVALUE.district_name , 
                TVALUE.indicount , TVALUE.goal_index , TVALUE.goal_id 
                union
                (select cast(substring(dc.goal_id,5) as INTEGER) goal_index , dc.goal_id , 'CG01' 
                AS district_code, 'Chhattisgarh' AS district_name,  
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
                as goalscore	 
                from dif_cg_averagedata dc , sdg_goal_master sgm2
                where sgm2.goal_id = dc.goal_id and dc.cg_year = ? AND dc.goal_id = ? group by dc.goal_id
                ) order by goalscore desc`;

    try {
        let result = await mysql.exec(query, [id, id1, id2, id3]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

////////////////////////////////////////////////////////////
//NORMALISE SCORE FOR PARTICULAR GOAL AND PARTICULAR YEAR - FOR ALL DISTRICT  + CG // (INDICATOR WISE)
///////////////////////////////////////////////////////////

router.get('/getcgdistrictcompositescorebyindicator/:idyear/:idgoal/:idindicator', async (req, res) => {
    var id = req.params.idyear;
    var id1 = req.params.idgoal;
    var id2 = req.params.idindicator;
    var id3 = req.params.idyear;
    var id4 = req.params.idgoal
    var id5 = req.params.idindicator;

    var query = `  select iw.goal_id, ddim.district_indicator_desc, dg.district_name , iw.district_code ,		
                ifnull(round(iw.normalize_value),0) as goalscore,
                iw.district_indicator_master_id 
                from dif_normalize_score iw, dim_geo dg, dif_district_indicator_master ddim
                where dg.district_code = iw.district_code and ddim.indicator_master_id = iw.district_indicator_master_id 
                and iw.valueyear = ? and iw.goal_id = ? AND iw.district_indicator_master_id = ? and ddim.delete_flag = 'N'	
                union
                select dc.goal_id ,dc.indicator_desc , 'Chhattisgarh' ,'CG01' , round(dc.normalize_score) as goalscore,
                dc.district_indicator_master_id from dif_cg_averagedata dc ,sdg_goal_master sgm2,
                dif_district_indicator_master ddim where sgm2.goal_id = dc.goal_id 
                and ddim.indicator_master_id = dc.district_indicator_master_id
                and dc.cg_year = ? and sgm2.goal_id = ? AND  dc.district_indicator_master_id = ? 
                and ddim.delete_flag = 'N'   ORDER BY   goalscore desc`;

    try {
        let result = await mysql.exec(query, [id, id1, id2, id3,id4,id5]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

//////////////////////////REPORT WORK////////////////////


router.get('/getpolarchart/:id', async (req, res) => {

    var id = req.params.id;
    var query = `SELECT * FROM polarchart p WHERE p.district_code=?`;
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


////////////////////////////////////////////////////////////
//NORMALISE SCORE FOR INDICATORWISE AND PARTICULAR YEAR - FOR ALL DISTRICT  + CG //
///////////////////////////////////////////////////////////


router.get('/getindicatorwisenormalizedscore/:idyear/:idgoal/:idindicator', async (req, res) => {

    var id = req.params.idyear;
    var id1 = req.params.idgoal;
    var id2 = req.params.idindicator;
    var id3 = req.params.idyear;
    var id4 = req.params.idgoal;
    var id5 = req.params.idindicator;

    var query = `select iw.goal_id, ddim.district_indicator_desc, dg.district_name , iw.district_code ,		
                round (iw.normalize_value) as normalizevalue,
                iw.district_indicator_master_id 
                from dif_normalize_score iw, dim_geo dg, dif_district_indicator_master ddim
                where dg.district_code = iw.district_code and ddim.indicator_master_id = iw.district_indicator_master_id 
                and iw.valueyear = ? and iw.goal_id = ? AND iw.district_indicator_master_id = ? AND ddim.delete_flag = 'N'
                union select dc.goal_id ,dc.indicator_desc , 'Chhattisgarh' as district_name ,'CG01' , round(dc.normalize_score) as NORMALISE21,
                dc.district_indicator_master_id from dif_cg_averagedata dc , sdg_goal_master sgm2,
                dif_district_indicator_master ddim where sgm2.goal_id = dc.goal_id and ddim.indicator_master_id = dc.district_indicator_master_id
                and ddim.delete_flag = 'N' and dc.cg_year = ? and sgm2.goal_id = ? AND  
                dc.district_indicator_master_id = ? order BY normalizevalue desc`;
    try {
        let result = await mysql.exec(query, [id, id1, id2, id3, id4, id5]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

////////NORMALIZED SCORE INDICATORWISE FOR ALL YEAR -CG //


router.get('/getcgnsbyindicatorid/:idgoal/:idindicator', async (req, res) => {

    var id = req.params.idgoal;
    var id1 = req.params.idindicator;

    var query = `select dc.goal_id ,dc.indicator_desc , 'Chhattisgarh' as state ,'CG01' as statecode , round(dc.normalize_score) as NORMALISESCORE,
                dc.district_indicator_master_id, dc.cg_year from dif_cg_averagedata dc , sdg_goal_master sgm2,
                dif_district_indicator_master ddim where sgm2.goal_id = dc.goal_id and ddim.indicator_master_id = dc.district_indicator_master_id
                and ddim.delete_flag = 'N' and sgm2.goal_id = ? AND  
                dc.district_indicator_master_id = ? 	GROUP BY (dc.cg_year)`;
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

////////NORMALIZED SCORE INDICATORWISE FOR ALL YEAR -District //


router.get('/getdisnsbyindicatorid/:idgoal/:idindicator/:iddistrict', async (req, res) => {

    var id = req.params.idgoal;
    var id1 = req.params.idindicator;
    var id2 = req.params.iddistrict;

    var query = `select iw.goal_id, ddim.district_indicator_desc, dg.district_name,
                iw.district_code ,		
                round (iw.normalize_value) as normalizevalue,
                iw.district_indicator_master_id  ,  iw.valueyear
                from dif_normalize_score iw, dim_geo dg, dif_district_indicator_master ddim
                where dg.district_code = iw.district_code and 
                ddim.indicator_master_id = iw.district_indicator_master_id 
                and iw.goal_id = ? AND iw.district_indicator_master_id = ?
                 AND iw.district_code = ? AND ddim.delete_flag = 'N'
                GROUP BY (iw.valueyear)`;
    try {
        let result = await mysql.exec(query, [id, id1,id2]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

////////MAX NORMALIZED SCORE INDICATORWISE FOR ALL YEAR -District //

router.get('/getmaxdisnsbyindicatorid/:idgoal/:idindicator', async (req, res) => {

    var id = req.params.idgoal;
    var id1 = req.params.idindicator;

    var query = `select iw.goal_id, ddim.district_indicator_desc, dg.district_name,
                    iw.district_code ,MAX(iw.normalize_value) AS normalizevalue,		
                    iw.district_indicator_master_id  ,  iw.valueyear
                    from dif_normalize_score iw, dim_geo dg, dif_district_indicator_master ddim
                    where dg.district_code = iw.district_code and 
                    ddim.indicator_master_id = iw.district_indicator_master_id 
                    and iw.goal_id = ? AND iw.district_indicator_master_id = ?
                    AND ddim.delete_flag = 'N' 
                    GROUP BY (iw.valueyear)`;
    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

////////MIN NORMALIZED SCORE INDICATORWISE FOR ALL YEAR -District //

router.get('/getmindisnsbyindicatorid/:idgoal/:idindicator', async (req, res) => {

    var id = req.params.idgoal;
    var id1 = req.params.idindicator;

    var query = `select iw.goal_id, ddim.district_indicator_desc, dg.district_name,
                    iw.district_code ,MIN(iw.normalize_value) AS normalizevalue,		
                    iw.district_indicator_master_id  ,  iw.valueyear
                    from dif_normalize_score iw, dim_geo dg, dif_district_indicator_master ddim
                    where dg.district_code = iw.district_code and 
                    ddim.indicator_master_id = iw.district_indicator_master_id 
                    and iw.goal_id = ? AND iw.district_indicator_master_id = ?
                    AND ddim.delete_flag = 'N' 
                    GROUP BY (iw.valueyear)`;
    try {
        let result = await mysql.exec(query, [id, id1]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

//---------------DIF-NORMALIZED TABLE DATA-(GOAL-DISTRICT)----------//

router.get('/getnormalizedata/:idgoal/:idyear/:iddistrict', async (req, res) => {
    var id = req.params.idgoal;
    var id1 = req.params.idyear;
    var id2 = req.params.iddistrict;

    var query = `SELECT * FROM dif_normalize_score dn WHERE dn.goal_id=? AND dn.valueyear=? and
				 dn.district_code=? ORDER BY dn.district_indicator_desc`;
    try {
        let result = await mysql.exec(query, [id, id1, id2]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

router.get('/getdifreportbalod/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT  dv.district_indicator_master_id,dv.indicators_value, 
                 dv.valueyear, dv.district,dg.district_name,
                dm.district_indicator_desc, dm.uom
                , dm.periodicity, dm.kpi_target2030,
                dm.kpi_negation FROM dif_district_indicator_master dm 
                LEFT JOIN dif_indicator_values dv ON dv.district_indicator_master_id= dm.indicator_master_id
                LEFT JOIN dim_geo dg ON dg.district_code= dv.district
                WHERE  dv.valueyear = ? AND  dv.district = 'DT01'
                ORDER BY dm.district_indicator_desc,dv.district  asc`;
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

router.get('/getdifreportbaldabazar/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT  dv.district_indicator_master_id,dv.indicators_value, 
                 dv.valueyear, dv.district,dg.district_name,
                dm.district_indicator_desc, dm.uom
                , dm.periodicity, dm.kpi_target2030,
                dm.kpi_negation FROM dif_district_indicator_master dm 
                LEFT JOIN dif_indicator_values dv ON dv.district_indicator_master_id= dm.indicator_master_id
                LEFT JOIN dim_geo dg ON dg.district_code= dv.district
                WHERE  dv.valueyear = ? AND  dv.district = 'DT02'
                ORDER BY dm.district_indicator_desc,dv.district  asc`;
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

router.get('/getdifreport/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT  dv.district_indicator_master_id,dv.indicators_value, 
                 dv.valueyear, dv.district,dg.district_name,
                dm.district_indicator_desc, dm.uom
                , dm.periodicity, dm.kpi_target2030,
                dm.kpi_negation FROM dif_district_indicator_master dm 
                LEFT JOIN dif_indicator_values dv ON dv.district_indicator_master_id= dm.indicator_master_id
                LEFT JOIN dim_geo dg ON dg.district_code= dv.district
                WHERE  dv.valueyear = ?
                ORDER BY dm.district_indicator_desc,dv.district  asc`;
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