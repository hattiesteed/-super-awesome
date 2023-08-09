const {Schema} = require(`mongoose`);

const teamSchema = new Schema({
    name: [ 
        {
            type: String,
        },
    ],
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
    
});

module.exports = teamSchema;