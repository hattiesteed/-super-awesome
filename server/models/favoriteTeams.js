const { Schema } = require(`mongoose`);

const teamSchema = new Schema({
    name:
    {
        type: String,
        required: true,
    },
    conference: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        requried: true,
    },
    city: {
        type: String,
        required: true,
    },
    abbreviation: {
        type: String,
        required: true,
    },
    teamId: {
        type: Number,
        required: true,
    },
    class: {
        type: String,
        required: true,
    }

});

module.exports = teamSchema;