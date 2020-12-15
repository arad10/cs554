const express = require("express");
const dashboard = require("../data/dashboard");
const router = express.Router();
const dashboardAPIs = require("../data").dashboard;

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const dashboard = await dashboardAPIs.getDashboard(id);
    res.json(dashboard);
});

router.post("/:id/addMessage", async (req, res) => {
    const id = req.params.id;
    let msg = req.body;
    console.log(req.body);
    const addMessage = await dashboardAPIs.addChatMessage(id, msg);
    res.json(addMessage); //will return just the message
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
        req.body.name,
        req.body.description,
        req.body.date,
        req.body.creator
    );
    res.json(insertDashboard);
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updateDashboard = await dashboardAPIs.updateDashboard(
        id,
        req.body.origin,
        req.body.originList,
        req.body.destination,
        req.body.destinationList
    );
    res.json(updateDashboard);
});

module.exports = router;