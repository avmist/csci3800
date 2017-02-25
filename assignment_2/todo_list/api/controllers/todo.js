/**
 * Created by Ava Mistry on 1/22/17.
 */
'use strict';
// Include our "db"
var db = require('../../config/db')();
// Exports all the functions to perform on the db
module.exports = {
    getAll : getAll,
    save : save,
    getOne : getOne,
    update : update,
    delItem : delItem
};

//GET / operationId
function getAll(req, res, next) {
    res.json({ items: db.find()});
}
//POST / operationId
function save(req, res, next) {
    res.json({success: db.save(req.body), description: "Item added to the list!"});
}
//GET //{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var item = db.find(id);
    if(item) {
        res.json(item);
    }else {
        res.status(204).send();
    }
}
//PUT //{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var item = req.body;
    if(db.update(id, item)){
        res.json({success: 1, description: "Item updated!"});
    }else{
        res.status(204).send();
    }

}
//DELETE //{id} operationId
function delItem(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    if(db.remove(id)){
        res.json({success: 1, description: "Item deleted!"});
    }else{
        res.status(204).send();
    }

}
