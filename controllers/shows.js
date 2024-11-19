const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('shows').find();
    result.toArray().then((shows) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(shows);

    });

};

const getSingle = async (req, res) => {
    const showId = newObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('shows').find({_id: showId });
    result.toArray().then((shows) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(shows);

    });
};

module.exports = {
    getAll,
    getSingle
};
