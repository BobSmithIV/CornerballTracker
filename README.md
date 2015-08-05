# CornerballTracker
Keeps track of the score in the Cornerball minigame in TagPro.  

***

Cornerball is played 3v3 on the OFM map.  Teams aim to score by trapping their flag carrier into a corner, thus protecting them from the other team.  You receive one point if you sucessfully score in the corner in which your team spawns, three points if you score in the corner where your opponents spawn, and two points in both of the other two.  

***

This userscript will keep track of the score throughout the game and announce the new score when either team gets a point.  Note that since information about users outwith your field of view is not sent, this is designed to be used by a spectator rather than a player.  If you have no choice and must use this as a player, be sure to be within line of sight of the relevant corner whenever a team scores, else the userscript will not be able to detect it.  

***

To install this script:
On Chrome: Ensure you have [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) installed, then simply select the [userscript](https://github.com/BobSmithIV/CornerballTracker/blob/master/cornerball-tracker.user.js)  and click raw.  Tampermonkey should then automatically install the userscript for you.  

On Firefox: As above, but you should have [Greasemonkey](https://addons.mozilla.org/en-Us/firefox/addon/greasemonkey/) installed rather than Tampermonkey.  
