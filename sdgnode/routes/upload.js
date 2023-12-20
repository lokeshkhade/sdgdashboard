var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
multer = require('multer');
var mysql = require('../mysql');
//const connection = require("../config/mysqldb");
const DIR = './uploads';

/* GET users listing. */
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage });
router.post('/', upload.single('file'), function (req, res, next) {
    if (!req.file) {
        message = "Error! in image upload."
        res.json([{ message: message, status: 'error' }]);
    }
    else {
        fs.mkdir(req.body.folder_name, { recursive: true }, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                fs.rename('./uploads/' + req.file.filename, req.body.folder_name + req.file.filename, function (err) {
                    console.log(err);
                });
            }
        })
        message = "Successfully! uploaded";
        res.json({ message: message, status: 'success', filepath: req.body.folder_name.replace('./uploads/', '') + req.file.filename });
    }
});





module.exports = router;