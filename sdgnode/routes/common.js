
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


router.get('/getmaxyear', async (req, res) => {

    var query = `SELECT MAX(dn.valueyear) as maxyear FROM dif_normalize_score dn`;
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


router.get('/getdistrictall', async (req, res) => {

    var query = `SELECT dg.district_name, dg.district_code FROM dim_geo dg `;
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

router.get('/getgoals', async (req, res) => {

    var query = `SELECT sg.goal_id, sg.goal_name, sg.goal_description, sg.goal_index FROM sdg_goal_master sg ORDER BY sg.goal_index`;
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


router.get('/getdiftargetcount', async (req, res) => {

    var query = `SELECT count(*) as totaldiftargets from dif_target_master`;
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

router.get('/getdifindicatorscount', async (req, res) => {

    var query = `SELECT count(*) as totaldifindicators from dif_district_indicator_master`;
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

router.get('/getdepartmentcount', async (req, res) => {

    var query = `SELECT count(*) as totaldepartment from department_master`;
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



router.get('/getalldiftarget', async (req, res) => {

    var query = `SELECT * from dif_target_master order by dif_target_desc`;
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

router.get('/getalldifindicators', async (req, res) => {

    var query = `SELECT * from dif_district_indicator_master dim where dim.delete_flag = 'N' order by dim.district_indicator_desc`;
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

router.get('/getalldepartment', async (req, res) => {

    var query = `SELECT * from department_master`;
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

router.get('/getdistirctname/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT dg.district_name, dg.district_code FROM dim_geo dg where dg.district_code = ?`;

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

///////////////////////////

router.get('/getgoalwisediftargetcount/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT COUNT(distinct df.target_id) as totaldiftargets FROM dif_district_indicator_master df WHERE df.goal_id='Goal 1'`;
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

router.get('/getgoalwisedifindicatorscount/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT COUNT(distinct df.indicator_master_id) as totaldifindicators FROM dif_district_indicator_master df WHERE df.goal_id=?`;
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

router.get('/getgoalwisedeptcount/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT COUNT(distinct df.dept_id) as totaldepartment FROM dif_district_indicator_master df WHERE df.goal_id=?`;
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


///////////////////////////////////////////////////////////////


router.get('/getgoalwisediftargetdesc/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT distinct df.target_id, dt.dif_target_desc FROM dif_district_indicator_master df 
                 LEFT JOIN dif_target_master dt ON dt.dif_target_id = df.target_id
                 WHERE df.goal_id=?`;
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

router.get('/getgoalwisedifindicatorsdesc/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT distinct df.indicator_master_id, df.district_indicator_desc FROM dif_district_indicator_master 
                df WHERE df.goal_id=? 
                ORDER BY df.district_indicator_desc`;
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

router.get('/getgoalwisedeptdesc/:id', async (req, res) => {
    var id = req.params.id;
    var query = `SELECT distinct df.dept_id, dm.department_name, dm.description FROM dif_district_indicator_master df 
                LEFT JOIN department_master dm ON dm.dept_id = df.dept_id
                WHERE df.goal_id=?`;
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

    // ----------------------------- ENTRY PART APIs --------------------------//


router.post('/login/:username/:password', async (req, res) => {
    var username = req.params.username;
    var password = req.params.password;   

    var query = `SELECT ud.districtcode,ud.username,ud.password, ur.role_id, ur.user_id, ud.id, ud.departmentid 
					 FROM users ud 
					 LEFT JOIN user_roles_mapping ur ON ud.id= ur.user_id
					 WHERE ud.username=? and  AND ud.password= ?`;
    try {
        let result = await mysql.exec(query, [username, password]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }

});

/////////////////////////////////////////////////////

router.get('/getallroles', async (req, res) => {

    var query = `SELECT * from roles_master order by roleid`;
    try {
            let result = await mysql.exec(query);
            if (result.length == 0) 
            {
                res.status(200).json("Data Not Found");
            }
            return res.json(result);
    } catch (err) 
    {
        return res.status(404).json(err);
    }
});

router.get('/gethodroles', async (req, res) => {

    var query = `SELECT * from roles_master where roleid=4`;
    try {
            let result = await mysql.exec(query);
            if (result.length == 0) 
            {
                res.status(200).json("Data Not Found");
            }
            return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});


router.get('/getallactiveusers', async (req, res) => {

    var query = `SELECT * FROM users u WHERE u.id IN (SELECT  distinct urm.user_id from user_roles_mapping urm where urm.role_id in (1,2,3,5)) ORDER BY u.id`;
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


router.get('/getallaudittrails', async (req, res) => {

    var query = `SELECT * FROM audit_trail a ORDER BY a.updated_at desc`;
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



router.get('/getdeptunfreezrequest/:dept/:year', async (req, res) => {
    var id = req.params.dept;
    var id1 = req.params.year;

    var query = `SELECT * , dg.district_name, d.department_name FROM dif_modify_freeze_data dm 
                 LEFT JOIN dim_geo dg ON dg.district_code = dm.districtcode
                 LEFT JOIN department_master d ON d.dept_id = dm.department_id
                 WHERE dm.department_id=? AND dm.dif_year=? AND  dm.freezeflag='U'`;

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


router.get('/getallunfreezrequest/:year', async (req, res) => {
    var id = req.params.year;

    var query = `SELECT * , dg.district_name, d.department_name FROM dif_modify_freeze_data dm 
                 LEFT JOIN dim_geo dg ON dg.district_code = dm.districtcode
                 LEFT JOIN department_master d ON d.dept_id = dm.department_id 
                 WHERE dm.dif_year=? AND  dm.freezeflag='U'`;

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


router.get('/getallyears', async (req, res) => {
    var query = `SELECT * FROM dif_year_master y ORDER BY y.id asc`;
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


router.get('/getdifyears', async (req, res) => {
    var query = `SELECT distinct valueyear FROM dif_indicator_values y ORDER BY y.valueyear asc`;
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


router.get('/getdeptindicatorcount', async (req, res) => {
    var query = `SELECT COUNT(*) AS indicatorcount, df.dept_id, dm.department_name FROM dif_district_indicator_master df 
				 LEFT JOIN department_master dm ON dm.dept_id=df.dept_id
				 GROUP BY(df.dept_id)`;
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


router.get('/getadmindashboard/:year', async (req, res) => {
    var id = req.params.year;

    var query = `select ddim.dept_id ,dm.department_name ,count(ddim.indicator_master_id)/27 as indicount ,floor(count(div2.indicators_value)/27) as entries from dif_indicator_values div2 
                    join dif_district_indicator_master ddim on ddim.indicator_master_id = div2.district_indicator_master_id 
                    join department_master dm on dm.dept_id = ddim.dept_id where div2.valueyear = ? 
                    group by ddim.dept_id ,dm.department_name order by ddim.dept_id`;

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


router.get('/getdeptindicator/:deptid', async (req, res) => 
{
    var id = req.params.deptid;
    var query = `SELECT * FROM dif_district_indicator_master df WHERE df.dept_id=? ORDER BY df.district_indicator_desc`;
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


router.get('/getindicatorvaluesbydistrict/:indicatorid/:districtid', async (req, res) => {
    var id1 = req.params.indicatorid;
    var id2 = req.params.districtid;

    var query = `SELECT df.indicators_value,df.district,df.valueyear,df.district_indicator_master_id , dm.kpi_target2030 FROM dif_indicator_values df 
                    LEFT JOIN dif_district_indicator_master dm ON dm.indicator_master_id = df.district_indicator_master_id
                    where df.district_indicator_master_id=? AND df.district=? ORDER BY df.valueyear`;

    try {
        let result = await mysql.exec(query, [id1,id2]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});


router.get('/getdeptnamebyid/:deptid', async (req, res) => {
    var id = req.params.deptid;

    var query = `SELECT dept_id, department_name, description, department_icon, department_desc_unicode
	             FROM department_master df WHERE df.dept_id=?`;

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


router.get('/getnotificationsbydistrict/:departmentid/:districtid', async (req, res) => {
    var id1 = req.params.departmentid;
    var id2 = req.params.districtid;

    var query = `SELECT  un.id, un.departmentid, un.districtcode, un.notificationdate, un.notificationmsg, 
                 un.status FROM user_notification un WHERE un.departmentid=? AND un.districtcode=? AND un.status='N'`;

    try {
        let result = await mysql.exec(query, [id1, id2]);
        if (result.length == 0) {
            return res.status(404).send("Data Not Found");
        }
        return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});



router.get('/getdifvaluesbyyear/:districtid/:deptid/:year', async (req, res) => {
    var id1 = req.params.districtid;
    var id2 = req.params.deptid;
    var id3 = req.params.year;
    var query = `SELECT df.indicator_master_id, dv.district_indicator_master_id, df.district_indicator_desc, dv.indicators_value, df.uom FROM 
                    dif_indicator_values dv left JOIN  dif_district_indicator_master df ON dv.district_indicator_master_id = df.indicator_master_id
                    WHERE dv.district=? AND df.dept_id=?  AND dv.valueyear=?
                    ORDER BY df.district_indicator_desc`;

    try {
        let result = await mysql.exec(query, [id1,id2,id3]);
        if (result.length == 0) {
             res.status(200).json("Data Not Found");
             return;
        }
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
});


router.get('/getfreezinfo/:districtid/:deptid/:year', async (req, res) => {
    var id1 = req.params.districtid;
    var id2 = req.params.deptid;
    var id3 = req.params.year;
    var query = `SELECT df.freeze_id,df.districtcode,df.dif_year,df.department_id,
				    DATE_FORMAT(df.freezefrom,'%d/%m/%y') AS freezefrom ,DATE_FORMAT(df.freezeto,'%d/%m/%y') AS freezeto,
					df.freezeflag from dif_modify_freeze_data df WHERE df.districtcode=? AND 
                    df.department_id=? AND df.dif_year=? `;
    try {
        let result = await mysql.exec(query, [id1, id2, id3]);
        if (result.length == 0) {
            res.status(200).json("Data Not Found");
            return;
        }
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
});


// -------Department-Score Department landing Page------------//


router.get('/getdeptscorebyyear/:year', async (req, res) => {
    var id1 = req.params.year;
    var query = `select temp_goalwise.dept_id, dm.department_name, dm.department_icon,dm.description,
                    round(sum(temp_goalwise.dept_score)/count(temp_goalwise.district_indicator_desc)) dept_wise_score from (select
                        temp_value.goal_id, temp_value.district_indicator_desc, temp_value.dept_id,
                        (sum(temp_value.NORMALIZE_VALUE2020)/ count(temp_value.district_indicator_desc)) dept_score
                        from (select iw.goal_id, iw.district_indicator_desc, iw.dept_id, iw.normalize_value as NORMALIZE_VALUE2020
                        from dif_normalize_score iw where iw.valueyear = ?) temp_value 
                        group by temp_value.district_indicator_desc,temp_value.dept_id,temp_value.goal_id) temp_goalwise,
                        department_master dm where dm.dept_id=temp_goalwise.dept_id
                        group by temp_goalwise.dept_id , dm.department_name, dm.department_icon,dm.description
                        order by 5 desc`;

    try {
        let result = await mysql.exec(query, [id1]);
        if (result.length == 0) {
            res.status(200).json("Data Not Found");
            return;
        }
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
});


router.get('/getdeptdistscorebyyear/:year/:deptid', async (req, res) => {
    var id1 = req.params.year;
    var id2 = req.params.deptid;
    var query = `select dg.district_map_id ,dg.district_name ,dg.district_code,
                    CAST(round(sum(iwns.normalize_value)/count(iwns.indicators_value)) as integer) 
                    as score 
                    from dif_normalize_score iwns , dim_geo dg where dg.district_code =iwns.district_code 
                    and iwns.valueyear = ? and iwns.dept_id = ? 
                    group by dg.district_map_id ,dg.district_name`;

    try {
        let result = await mysql.exec(query, [id1,id2]);
        if (result.length == 0) {
            res.status(200).json("Data Not Found");
            return;
        }
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
});

//-------------------------HOD-Dashboard--------------//

router.get('/gethoddashboard/:year/:deptid', async (req, res) => {
    var id1 = req.params.year;
    var id2 = req.params.deptid;
    var query = `select dg.district_name , count(div1.indicators_value) indiCount, count(ddim.indicator_master_id) indiCnt from dif_indicator_values div1 
                    join dim_geo dg on dg.district_code = div1.district 
                    join dif_district_indicator_master ddim on 
                    ddim.indicator_master_id = div1.district_indicator_master_id
                    where div1.valueyear = ? and ddim.dept_id = ? 
                    group by dg.district_name order by 1`;

    try {
        let result = await mysql.exec(query, [id1, id2]);
        if (result.length == 0) {
            res.status(200).json("Data Not Found");
            return;
        }
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
});


router.get('/getallactiveusersbydeptid/:deptid', async (req, res) => 
{
    var id = req.params.deptid;
    var query = `SELECT u.id,urm.user_id, u.departmentid,u.districtcode,u.email,u.failedattempt,
                    u.firstname,u.isaccountactive,u.isaccountexpired,u.isaccountlocked,u.ispasswordexpired,
                    u.lastname,u.mobilenumber,u.oldpassword,u.password,u.passwordupdatedate,u.securityquestion,
                    u.username,urm.role_id,u.createddate from users u
                    LEFT JOIN user_roles_mapping urm ON u.id=urm.user_id
                    WHERE u.id IN (SELECT  distinct urm.user_id from user_roles_mapping urm 
                    where urm.role_id IN (4)) AND u.departmentid=? ORDER BY u.id`;
    try {
            let result = await mysql.exec(query, [id]);
            if (result.length == 0) 
            {
                return res.status(200).send("Data Not Found");
            }
            return res.json(result);
    } catch (err) {

        return res.status(404).json(err);
    }
});

module.exports = router;