/**
 * Created by Андрей on 27.11.13.
 */
jQuery(document).ready( function(){
    var TimerID;
    document.getElementById('to_lviv_search').onclick = function(){
        var date_to_lviv = document.getElementById('date_to_lviv').value;
        $.ajax({
            url: "http://www.pz.gov.ua/rezerv/aj_g60.php",
            data: 'kstotpr=2204001&kstprib=2218000&sdate='+date_to_lviv
        }).done(function(responce) {
            var obj = eval("("+responce+")");
            console.log( "From: "+ obj.nstotpr );
            console.log( "To: "+ obj.nstprib );
            console.log(" _______________________________________________ ");
            if(obj.error){
                console.log( " ERROR: "+ obj.error[0] );
            } else {
                for (var i = 0; i < obj.trains.length; i++){
                    console.log("    DATE: " + obj.trains[i].date);
                    console.log("    OTPRAVLENIE IS "+obj.trains[i].from[0]+": " + obj.trains[i].otpr);
                    console.log("    PRIBITIE V "+obj.trains[i].to[0]+": " + obj.trains[i].prib);
                    console.log("    TRAIN#: " + obj.trains[i].train[0]);
                    console.log("    KUPE: " + obj.trains[i].k);
                    console.log("    LUX: " + obj.trains[i].l);
                    console.log("    PLACKART: " + obj.trains[i].p);
                    console.log(" _______________________________________________ ");

                }
            }
        });
    };
    document.getElementById('from_lviv_search').onclick = function(){
        var date_from_lviv = document.getElementById('date_from_lviv').value;
        $.ajax({
            url: "http://www.pz.gov.ua/rezerv/aj_g60.php",
            data: 'kstotpr=2218000&kstprib=2204001&sdate='+date_from_lviv
        }).done(function(responce) {
            var obj = eval("("+responce+")");
            console.log( "From: "+ obj.nstotpr );
            console.log( "To: "+ obj.nstprib );
            console.log(" _______________________________________________ ");
            if(obj.error){
                console.log( " ERROR: "+ obj.error[0] );
            } else {
                for (var i = 0; i < obj.trains.length; i++){
                    console.log("    DATE: " + obj.trains[i].date);
                    console.log("    OTPRAVLENIE IS "+obj.trains[i].from[0]+": " + obj.trains[i].otpr);
                    console.log("    PRIBITIE V "+obj.trains[i].to[0]+": " + obj.trains[i].prib);
                    console.log("    TRAIN#: " + obj.trains[i].train[0]);
                    console.log("    KUPE: " + obj.trains[i].k);
                    console.log("    LUX: " + obj.trains[i].l);
                    console.log("    PLACKART: " + obj.trains[i].p);
                    console.log(" _______________________________________________ ");

                }
            }
        });
    };
    document.getElementById('start_monitoring').onclick = function() {
        TimerID = setInterval( (function(){ document.getElementById('to_lviv_search').onclick() }) , 5000);
//        TimerID = setInterval( (function(){ document.getElementById('from_lviv_search').onclick() }) , 5000);
    };
    document.getElementById('stop_monitoring').onclick = function() {
        clearInterval(TimerID);
        console.log('CLEAR');
    };
});
//(function(window){
//}(window));