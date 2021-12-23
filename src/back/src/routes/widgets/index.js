const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth')
const short = require('short-uuid');
const {getUserWidgetsData, updateUserWidgetsData} = require("../../controllers/WidgetControllers");

router.post('/', auth, (req, res) => {
    let widget = req.body.widget;
    let widgetData = req.body.data;
    getUserWidgetsData(req.user, (data) => {
        data.push({
            widget: widget,
            id: short.generate(),
            data: widgetData
        });
        updateUserWidgetsData(req.user, data, (d) => {
            if (data !== undefined)
                return res.status(200).json({success: true, data: d});
            return res.status(400).json({success: false, message: "An error occurred !"});
        });
    });
});

router.get('/', auth, (req, res) => {
    getUserWidgetsData(req.user, (data) => {
        if (data === undefined)
            return res.status(400).json({success: false, message: "An error occurred !"});
        return res.status(200).json({success: true, data});
    });
});

module.exports = router;