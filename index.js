/**
 * Created by Андрей on 27.11.13.
 */
//    simferopol_id = 2210001,
//    lviv_id = 2218000,
//    kharkiv_id = 2204001,
jQuery(document).ready( function(){
    var TimerID;
    document.getElementById('search').onclick = function (){
        var date_to_go = document.getElementById('date_to_go').value,
            city_from_name = '',
            city_from_id = document.getElementById('').value,
            city_till_name = document.getElementById('').value,
            city_till_id = document.getElementById('').value,
            input_string = document.getElementById('').value,
            data_city = {
                type: 'Get',
                url: 'http://www.pz.gov.ua/rezerv/aj_stations.php?stan=' + input_string,
                reqData: ''
            },
            data_train = {
                type: 'Post',
                url: '"http://www.pz.gov.ua/rezerv/aj_g60.php"',
                reqData: 'kstotpr='+ city_from_id +'&kstprib='+city_till_id+'&sdate='+date_to_go
            };
        function request (data) {
            $.ajax({
                type: data.type,
                url: data.url,
                data: data.reqData
            }).done(function(responce) {

                    var obj = eval("("+responce+")");
                    console.log( "From: "+ obj.nstotpr );
                    console.log( "To: "+ obj.nstprib );
                    console.log(" _______________________________________________ ");
                    if(obj.error){
                        console.log( " ERROR: "+ obj.error[0] );
                    } else {
                        for (var i = 0; i < obj.trains.length; i++){
                            if( obj.trains[i].train[0] == '086П' && +obj.trains[i].k > 0 ) {
                                alert('available');
                            };
                            console.log(obj.trains[i].train[1] == '086П' ? true: false);
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