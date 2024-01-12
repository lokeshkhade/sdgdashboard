const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const saltRounds = 10;


router.get('/validdata/:username/:id', async (req, res) => 
{
    var id1 = req.params.username;
    var id2 = req.params.id;

    var query = `SELECT ud.salt  FROM users ud 
                    WHERE ud.username = ? and ud.id= ?`;
    try {
        let result = await mysql.exec(query, [id1, id2]);
        if (result.length == 0) 
        {
            return res.json
                ({
                    "status": 200, "data": [], "error": true, "message": "Data Not Found"
                });
        }
        else
        {
            return res.json(result);
        }      

    } 
    catch (err) 
    {
        return res.json
            ({
                "status": 400, "data": [], "error": false, "message": err.message
            });
    }
});


router.put('/changePassword', async (req, res) => 
{
    var username = req.body.username;
    var id = req.body.id;
    var newpassword = req.body.new_password;
   
    var query = `SELECT ud.districtcode as districtcode,ud.username as username,ud.password, 
                    ud.roleid as role, ud.id, ud.departmentid as departmentid , ud.salt  FROM users ud 
                    WHERE ud.username = ? and ud.id = ? `;

    try {
        let result = await mysql.exec(query, [username, id]);
        if (result.length == 0) 
        {
            return res.json
                ({
                    "status": 200, "data": [], "error": true, "message": "Data Not Found"
                });
        }
        else 
        {
            var hashpassword = req.body.current_password.toString().concat(result[0].salt.toString())
            hashpassword = bcrypt.hashSync(hashpassword, result[0].salt);
            if (hashpassword.toString() == result[0].password) 
            {
                bcrypt.genSalt(saltRounds, async function (err, salt) 
                {
                    var hashedpassword = newpassword.toString().concat(salt.toString());
                    bcrypt.hash(hashedpassword, salt, async function (err, hash) {
                        var query = "update users set password = ? , salt = ? where username = ? AND id = ?";
                        try {
                            let data = await mysql.exec(query, [hash, salt, username, id]);

                            if (data.affectedRows < 1) {
                                return res.status(404).send('error');
                            }
                            res.json({ success: "Data" });
                        }
                        catch
                        {
                            return res.json
                                ({
                                    "status": 400, "data": [], "error": false, "message": err.message
                                });
                        }
                    });                   
                });
            }
            else 
            {
                res.json({ success: false, message: 'Password Mismatch' });
            }
        }

    }
    catch (err) 
    {
        return res.json
            ({
                "status": 400, "data": [], "error": false, "message": err.message
            });
    }
    
});


router.post('/', async (req, res) => 
{
    var username = req.body.username;
    var id = req.body.id;
    var query = `SELECT ud.districtcode as districtcode,ud.username as username,ud.password, 
                    ud.roleid as role, ud.id, ud.departmentid as departmentid , ud.salt  FROM users ud 
                    WHERE ud.username = ? `;

    try 
    {
        let result = await mysql.exec(query, [username, id]);
        var role = result[0].role;
        var departmentid = result[0].departmentid;
        var districtcode = result[0].districtcode;
        var id = result[0].id;

        if (result.length == 0) 
        {
            return res.json({
                success: 0,
                message: `Wrong username.`
            })

        }
        else
        {
            let user = JSON.parse(JSON.stringify(result[0]));
            var hashpassword = req.body.password.toString().concat(user.salt.toString());
            hashpassword = bcrypt.hashSync(hashpassword, user.salt.toString());
            if (hashpassword === user.password)
            {
                let response =
                {
                    username: username,
                    departmentid: departmentid,
                    districtcode: districtcode,
                    id: id,
                    role: role,
                    key: 'SDG%&456'
                }
                const token = jwt.sign(response, 'SECreTIsAlwaYSSecRET',
                    {
                        expiresIn: '12h' // expires in 24 hours; expiresIn: '60s' expires in 24 hours
                    });
                res.json
                    ({
                        token: token, success: 1, role: user.role, status: user.status,
                        message: 'Login Success'
                    });
            }
            else
            {
                return res.json({
                    success: 0,
                    message: `Wrong Password`
                })
            }        
                
        }

    }
    catch (err) 
    {
        return res.json
            ({
                "status": 400, "data": [], "error": false, "message": err.message
            });
    }
    
});



module.exports = router;