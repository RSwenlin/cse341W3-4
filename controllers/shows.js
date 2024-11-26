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
    const showId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('shows').find({_id: showId });
    result.toArray().then((shows) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(shows);

    });
};

const createShow = async (req, res) => {
    const showId = new ObjectId(req.params.id)
    const show = {
        date: req.body.date,
        show: req.body.show,
        songs: req.body.songs,
        company: req.body.company,
        directors: req.body.directors,
        devinRole: req.body.devinRole,
        graysonRole: req.body.graysonRole
    };
    const response = await mongodb.getDatabase().db().collection('shows').insertOne(show);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while adding the show.');
    }
};

const updateShow = async (req, res) => {
    const showId = new ObjectId(req.params.id);
    const data = {
        date: req.body.date,
        show: req.body.show,
        company: req.body.company,
        ipaddress: req.body.ipaddress,
        songs: req.body.songs
    };
    const response = await mongodb.getDatabase().db().collection('shows').replaceOne({_id: showId }, show);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the show ');
        }
}
const deleteShow = async (req, res) => {
    const showId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('shows').remove({_id: showId },true);
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleted the show.');
    }
};


module.exports = {
    getAll,
    getSingle,
    createShow,
    updateShow,
    deleteShow,
};
