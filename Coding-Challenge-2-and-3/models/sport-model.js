const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */

//Schema
const sportSchema = mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true
    },

    num_Players : {
        type : Number,
        required : true
    }
});

const sportsCollection = mongoose.model( `sportsdb`, sportSchema );

const sports = {
    removeSportbyID : function( sportID ){
        return sportsCollection
        .remove({id: sportID})
        .then( sportDeleted => {
            return sportDeleted;
        })
        .catch( err => {
            return err;
        });
    }
}

module.exports = {
    sports
};