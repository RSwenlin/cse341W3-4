const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../data/database');

const isValidObjectId = (id) => ObjectId.isValid(id);

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('shows').find();
    result.toArray().then((shows) => {
        if (shows.length === 0) {
            return res.status(404).json({ error: 'No shows found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(shows);
    }).catch((err) => {
        res.status(500).json({ error: 'Database error: ' + err.message });
    });
};

const getSingle = async (req, res) => {
    const showId = req.params.id;

    // Check if the ID is a valid ObjectId
    if (!isValidObjectId(showId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await mongodb.getDatabase().db().collection('shows').find({ _id: new ObjectId(showId) });
    result.toArray().then((shows) => {
        if (shows.length === 0) {
            return res.status(404).json({ error: 'Show not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(shows);
    }).catch((err) => {
        res.status(500).json({ error: 'Database error: ' + err.message });
    });
};

const createShow = async (req, res) => {
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
    if (response.acknowledged)  {
        res.status(201).json({ message: 'Show created successfully '});
    } else {
        res.status(500).json({ error: response.error || 'Some error occurred while adding the show.'});
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
    const response = await mongodb.getDatabase().db().collection('shows').replaceOne({_id: showId }, data);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the show ');
        }
}
const deleteShow = async (req, res) => {
    const showId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('shows').deleteOne({_id: showId });
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
