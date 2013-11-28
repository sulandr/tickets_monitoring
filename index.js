/**
 * Created by Андрей on 27.11.13.
 */
//    simferopol_id = 2210001,
//    lviv_id = 2218000,
//    kharkiv_id = 2204001,

//                console.log( "From: "+ obj.nstotpr );
//                console.log( "To: "+ obj.nstprib );
//                console.log(" _______________________________________________ ");
//                if(obj.error){
//                    console.log( " ERROR: "+ obj.error[0] );
//                } else {
//                    for (var i = 0; i < obj.trains.length; i++){
//                        if( obj.trains[i].train[0] == '086П' && +obj.trains[i].k > 0 ) {
//                            alert('available');
//                        };
//                        console.log(obj.trains[i].train[1] == '086П' ? true: false);
//                        console.log("    DATE: " + obj.trains[i].date);
//                        console.log("    OTPRAVLENIE IS "+obj.trains[i].from[0]+": " + obj.trains[i].otpr);
//                        console.log("    PRIBITIE V "+obj.trains[i].to[0]+": " + obj.trains[i].prib);
//                        console.log("    TRAIN#: " + obj.trains[i].train[0]);
//                        console.log("    KUPE: " + obj.trains[i].k);
//                        console.log("    LUX: " + obj.trains[i].l);
//                        console.log("    PLACKART: " + obj.trains[i].p);
//                        console.log(" _______________________________________________ ");

//                    }
//                }
jQuery(document).ready( function(){
    var TimerID;
    function request(data) {
        var resp;
        $.ajax({
            type: data.type,
            url: encodeURI(data.url),
            data: data.reqData,
            success: function(response){
                response[0] === '{' ? resp = eval("("+response+")") : resp = JSON.parse(response) ;
                data.callback(resp);
            }
        })
    }
    function getId(id){
        return document.getElementById(id);
    }
    function showTrains(obj){
        console.log("will show results");
        console.log(obj);
        var container = getId('results_container'),
            from = getId('city_from_r'),
            till = getId('city_till_r'),
            date = getId('date_r');
        if (obj.trains) {
            for ( var i=0; i<obj.trains.length; i++){
                container.innerHTML = "<p> FROM "+obj.trains[i].from[0]+": " + obj.trains[i].otpr+"</p><p> TILL "+obj.trains[i].to[0]+": " + obj.trains[i].prib+"</p>";
//                container.innerHTML = "<p> TILL "+obj.trains[i].to[0]+": " + obj.trains[i].prib+"</p>";
            }
        }
        container.style.display = 'block';
    }
    function findTrains (from, till){
        var date_to_go = getId('date_to_go').value,
            data = {
                type: 'POST',
                url: "http://www.pz.gov.ua/rezerv/aj_g60.php",
                reqData: 'kstotpr='+from+'&kstprib='+till+'&sdate='+date_to_go,
                callback: function(response) {
                    showTrains(response);
                }
            };
        request(data);
    }
    function findCityId (name) {
        var city_from_name = getId('input_from').value,
            city_till_name = getId('input_till').value,
            data = {
                type: "GET",
                url: "http://www.pz.gov.ua/rezerv/aj_stations.php?stan=" + name,
                reqData: "",
                callback: function(response) {
                    console.log(response);
                }
            };
        request(data);
    }
    getId('input_from').onkeyup = function(e){
        e.srcElement.value.length > 1 ? findCityId(e.srcElement.value) : false;
    };
    getId('search').onclick = function(){findTrains(2204001, 2218000)};
    getId('start_monitoring').onclick = function() {
        TimerID = setInterval( (function(){ getId('to_lviv_search').onclick() }) , 5000);
//        TimerID = setInterval( (function(){ document.getElementById('from_lviv_search').onclick() }) , 5000);
    };
    getId('stop_monitoring').onclick = function() {
        clearInterval(TimerID);
        console.log('CLEAR');
    };
});