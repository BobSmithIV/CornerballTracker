// ==UserScript==
// @name         Cornerball Tracker
// @namespace    http://www.github.com/BobSmithIV
// @author       BobSmithIV
// @description  Keeps track of the score in cornerball
// @include      http://tagpro-*.koalabeast.com:*
// @include      http://*.newcompte.fr:*
// @version      1.0
// @grant        none
// @downloadURL  none
// ==/UserScript==

// Global variables:
// the scores of each of the teams
var redScore;
var blueScore;
// the names of each of the teams
var redName;
var blueName;

// the scoring zones
var leftMax = 49;
var bottomMin = 671;
var topMax = 49;
var rightMin = 910;

// the variable storing the setInterval/setTimeout
var timer;

// the player id of the player currently in the scoring zone with the flag
var currentlyScoring;
// the zone they're in: 0 for top left, 1 for top right, 2 for bottom left, 3 for bottom right
var zone;
// the time they started in the scoring zone
var initialTime;
// the last number announced in the countdown, or 4 if none have been announced
var countdownReached = 4;

// run main() when the map has loaded
runWhenReady();

function main(){
    // get the names of each of the teams
    redName = tagpro.teamNames.redTeamName;
    blueName = tagpro.teamNames.blueTeamName;
    console.log(tagpro.score);
    // get the scores of each of the teams
    redScore = tagpro.score.r;
    blueScore = tagpro.score.b;
    // only run if the map is indeed OFM
    if (tagpro.map.join(';') == "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,16,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1;1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1"){
        announce("This is CORNERBALL!");
        announce("Shield your flag carrier in a corner to score.");
        announce("1 point for scoring in the corner where your team spawns,");
        announce("3 for the corner where your opponenets spawn,");
        announce("2 for either other corner");
    }
    timer = setInterval(searchForScorer,10);
}

// check if the flag carrier is currently in the scoring zone, and start timing them if they are
function searchForScorer(){
    // for each player
    for (var player in tagpro.players){
        // if this player has the flag
        if(tagpro.players[player].flag==3){
            // if this player is in the scoring zone
            if ((tagpro.players[player].x>rightMin && (tagpro.players[player].y>bottomMin || tagpro.players[player].y<topMax)) || (tagpro.players[player].x<leftMax && (tagpro.players[player].y>bottomMin || tagpro.players[player].y<topMax))){
                // save the current player and score start time
                currentlyScoring = player;
                initialTime = new Date();
                // work out which zone they're in
                zone = 0;
                if (tagpro.players[player].x>rightMin){
                    zone+=1;
                }
                if (tagpro.players[player].y>bottomMin){
                    zone+=2;
                }
                // stop searching for a scoring player
                clearInterval(timer);
                timer = setInterval(checkIfStillScoring, 10);
            }
            // break if we find the FC, as there can only be one
            break;
        }
    }
}

// check if the flag carrier has left the scoring zone, reset the timer if so
function checkIfStillScoring(){
    // if alive and still in the right zone
    if ( (! tagpro.players[currentlyScoring].dead) && ( (zone===0 && tagpro.players[currentlyScoring].x<leftMax && tagpro.players[currentlyScoring].y<topMax) || (zone==1 && tagpro.players[currentlyScoring].x>rightMin && tagpro.players[currentlyScoring].y<topMax) || (zone==2 && tagpro.players[currentlyScoring].x<leftMax && tagpro.players[currentlyScoring].y>bottomMin) || (zone==3 && tagpro.players[currentlyScoring].x>rightMin && tagpro.players[currentlyScoring].y>bottomMin) )){
        var newTime = new Date();

        // countdown the last three seconds
        if (newTime-initialTime>2000 && countdownReached>3){
            announce('3');
            countdownReached=3;
        }
        if (newTime-initialTime>3000 && countdownReached>2){
            announce('2');
            countdownReached=2;
        }
        if (newTime-initialTime>4000 && countdownReached>1){
            announce('1');
            countdownReached=1;
        }

        // if they stay in the zone for five seconds, that's a goal
        if (newTime-initialTime>5000){
            announce('GOAL!');
            // add the necessary amount to the appropriate team's score
            if (tagpro.players[currentlyScoring].team==1){
                if (zone==0 || zone==3){
                    redScore+=2;
                } else if (zone==1){
                    redScore+=3;
                } else {
                    redScore+=1;
                }
            }else{
                if (zone==0 || zone==3){
                    blueScore+=2;
                } else if (zone==1){
                    blueScore+=1;
                } else {
                    blueScore+=3;
                }
            }
            // announce the new score
            announce(redName + ' ' + redScore + ' - ' + blueScore + ' ' + blueName);
            // save the new score to the group
            tagpro.group.socket.emit("setting", {name: "blueTeamScore", value: blueScore});
            tagpro.group.socket.emit("setting", {name: "redTeamScore", value: redScore});
            // change the score displayed locally
            // note this won't change anyone else's score
            tagpro.score = {'r':redScore, 'b':blueScore};
            tagpro.ui.scores();
            // stop checking the end zone and wait for a handoff
            countdownReached=4;
            clearInterval(timer);
            timer = setInterval(checkIfHandedOff, 10);
        }
    } else {
        countdownReached=4;
        timer = clearInterval(timer);
        timer = setInterval(searchForScorer,10);
    }
}

// wait until the scoring FC has died before anyone can score again
function checkIfHandedOff(){
    if (tagpro.players[currentlyScoring].dead){
        timer = clearInterval(timer);
        timer = setInterval(searchForScorer,10);
    }
}

// Wait until the tagpro object has loaded the bits we need before running the script
function runWhenReady() {
    if (typeof tagpro.map !== 'undefined' && typeof tagpro.teamNames !== undefined && typeof tagpro.score !== undefined) {
        main();
    } else {
        setTimeout(function() {
            runWhenReady();
        }, 100);
    }
}

// send a group message
function announce(announcement){
    tagpro.group.socket.emit("chat", announcement);
}