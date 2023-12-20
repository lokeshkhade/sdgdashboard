const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

var config = require('config');
const log = require('../middleware/logger');

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    var username = req.body.username;
    var password = req.body.password;

    var query = `SELECT ud.districtcode as districtcode,ud.username as username,ud.password, ur.role_id as role, ur.user_id, ud.id, ud.departmentid as departmentid  FROM users ud LEFT JOIN user_roles_mapping ur ON ud.id = ur.user_id WHERE ud.username = ?`;

    try {

        let result = await mysql.exec(query, [username]);
        var role = result[0].role;
        var departmentid = result[0].departmentid;
        var districtcode = result[0].districtcode;
        let passwordKey = '08t16e502526fesanfjh8nasd2';
        let passwordDncyt = CryptoJS.AES.decrypt(password, passwordKey).toString(CryptoJS.enc.Utf8);

        const validPassword = await bcrypt.compare(password, result[0].password);

        if (!validPassword) {

            return res.status(400).send({
                success: 0,
                message: `Wrong credential.`
            });
        }
        else if (validPassword) {
            let response =
            {
                username: username,
                departmentid: departmentid,
                districtcode: districtcode,
                role: role
            }
            const token = jwt.sign(response, config.get('jwtPrivateKey'),
                {
                    expiresIn: '1200s' // expires in 24 hours; expiresIn: '60s' expires in 24 hours
                });
            return res.json
                ({
                    token: token, success: 1, username: username, role: role,
                    message: 'Login Success'
                });
        }
        else {
            return res.json
                ({
                    success: 0,
                    message: `Wrong credential.`
                });
        }
    }
    catch (err) {
        console.log('errr');
        return res.status(404).json(err);
    }
});


function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown(true);
    return schema.validate(user);

}



module.exports = router;