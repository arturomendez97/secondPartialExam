const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const app = express();


/* Your code goes here */
const { sports } = require( './models/sport-model.js');


app.delete( '/sports/delete', (req,res) => {

    let id = req.body.id;
    let sportsId = req.query.sportId
    
    if(!id){
        res.statusMessage = "the id is missing in the request"
        return res.status( 406 ).end();
    }

    if(!sportsId){
        res.statusMessage = "the sportsId is mising from the query string"
        return res.status( 406 ).end();
    }

    if(id != sportsId){
        res.statusMessage = "the id and the sportsId must match."
        return res.status( 409 ).end();
    }

    sports
        .removeSportbyID( id )
        .then ( result => {
            if (result.deletedCount == 0){
                res.statusMessage = "The id was not found on the sport list";
                return res.status(404).end()
            }
            else{
                return res.status(204).end()
            }
        })
        .catch( err => {
            res.statusMessage = "Something went wrong when connecting with the database, try again later";
            return res.status(500);
        })


})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});