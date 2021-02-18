const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f25f30c82df64584b5317d4a6c5dad22'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Unable to work with API"))
}

const handleImage = (db) => (req, res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(() => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}