const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
//loading mongoose models

const {Dashboard, Detail, Dropmenu, Vehicle} = require('./db/models');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//adding middleware

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");


    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});

//route handling


//vehicles
app.get('/vehicles', (req, res) => {
    //query the database
    Vehicle.find({}).then((vehicles) => {
        res.send(vehicles);
    })
});

app.post('/vehicles', (req, res) => {
    let data = req.body.data;
    let newVehicle = new Vehicle({
        data
    });
    newVehicle.save().then((vehicleDoc) => {
        res.send(vehicleDoc);
    })
});

//operation for dashboard
app.get('/dashboards', (req, res) => {
    //query the database
    Dashboard.find({}).then((dashboards) => {
        res.send(dashboards);
    })
});

app.post('/dashboards', (req, res) => {
    let title = req.body.title;

    let newDashboard = new Dashboard({
        title
    });
    newDashboard.save().then((dashboardDoc) => {
        res.send(dashboardDoc);
    })
});

app.patch('/dashboards/:id', (req, res) => {
    Dashboard.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({'message': 'updates success'});
    });
});

app.delete('/dashboards/:id', (req, res) => {
    Dashboard.findOneAndRemove({_id: req.params.id}).then((removedDashboardDoc) => {
        res.send(removedDashboardDoc);
    })
});

//operation for details of each dashboard
app.get('/dashboards/:dashboardId/details', (req, res) => {
    Detail.find({
        _dashboardId: req.params.dashboardId
    }).then((details) => {
        res.send(details);
    })
});

app.post('/dashboards/:dashboardId/details', (req, res) => {
    let newDetail = new Detail({
        title: req.body.title,
        _dashboardId: req.params.dashboardId
    });
    newDetail.save().then((newDetailDoc) => {
        res.send(newDetailDoc);
    })
});

app.patch('/dashboards/:dashboardId/details/:detailId', (req, res) => {
    Detail.findOne({
        _id: req.params.detailId,
        _dashboardId: req.params.dashboardId
    }).then((dashboard) => {
        if (dashboard) {
            // list object with the specified conditions was found
            // therefore the currently authenticated user can create new tasks
            return true;
        }

        // else - the list object is undefined
        return false;
    }).then((canUpdateDetails) => {
        if (canUpdateDetails) {
            Detail.findOneAndUpdate({
                    _id: req.params.detailId,
                    _dashboardId: req.params.dashboardId
                }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({message: 'Updated successfully.'})
            })
        } else {
            res.sendStatus(404);
        }


    })
});

app.delete('/dashboards/:dashboardId/details/:detailId', (req, res) => {
    Detail.findByIdAndRemove({
        _id: req.params.detailId
    }).then((removedDetailDoc) => {
        res.send(removedDetailDoc);

    })
});

//Operation for drop menu list items
app.get('/dashboards/:dashboardId/details/:detailId/dropmenus', (req, res) => {
    Dropmenu.find({
        _detailId: req.params.detailId,
        _dashboardId: req.params._dashboardId

    }).then((dropmenus) => {
        res.send(dropmenus);
    })
});

app.get('/dashboards/:dashboardId/subdetails', (req, res) => {
    Dropmenu.find({
        _dashboardId: req.params._dashboardId

    }).then((dropmenus) => {
        res.send(dropmenus);
    })
});

app.post('/dashboards/:dashboardId/details/:detailId/dropmenus', (req, res) => {
    Detail.find({
        _detailid: req.params.detailId,
        _dashboardId: req.params._dashboardId
    }).then((detail) => {
        if (detail) {
            return true;
        }
        return false;
    }).then((canCreateDropmenu) => {
        if (canCreateDropmenu) {
            let newDropmenu = new Dropmenu({
                title: req.body.title,
                _detailId: req.params.detailId
            });
            newDropmenu.save().then((newDropmenuDoc) => {
                res.send(newDropmenuDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })

})

app.patch('/dashboards/:dashboardId/details/:detailId/dropmenus/:dropmenuId', (req, res) => {
    Dropmenu.findOne({
        _id: req.params.dropmenuId,
        _detailId: req.params.detailId,

    }).then((dashboard) => {
        if (dashboard) {
            return true;
        }
        return false;
    }).then((canUpdateDropmenus) => {
        if (canUpdateDropmenus) {
            Dropmenu.findOneAndUpdate({
                _id: req.params.dropmenuId,
                _detailId: req.params.detailId

            }, {
                $set: req.body
            }).then(() => {
                res.send({message: 'dropmenu updated sucessfully'})
            })
        } else {
            res.sendStatus(404);
        }
    })
});

app.delete('/dashboards/:dashboardId/details/:detailId/dropmenus/:dropmenuId', (req, res) => {
    Dropmenu.findByIdAndRemove({
        _id: req.params.dropmenuId
    }).then((removedDropmenuDoc) => {
        res.send(removedDropmenuDoc);

    })
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
})
