const express = require("express");
const xss = require("xss");
const router = express.Router();
const dashboardAPIs = require("../data").dashboard;

router.get('/:id', async (req, res) => {
    const id = xss(req.params.id);
    const dashboard = await dashboardAPIs.getDashboard(id);
    res.json(dashboard);
});

router.get('/', async(req, res)=>{
    try{
        let dashboardAll = await dashboardAPIs.getAllDashboards();
        res.json(dashboardAll);
    } catch(e){
        res.status(404).send
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const insertDashboard = await dashboardAPIs.addDashboard(
        xss(req.body.name),
        xss(req.body.description),
        xss(req.body.date),
        xss(req.body.creator)
    );
    res.json(insertDashboard);
});

router.patch('/:id', async (req, res) => {
    const id = xss(req.params.id);
    const updateDashboard = await dashboardAPIs.updateDashboard(
        id,
        xss(req.body.origin),
        xss(req.body.originList),
        xss(req.body.destination),
        xss(req.body.destinationList)
    );
    res.json(updateDashboard);
});

module.exports = router;