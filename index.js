/**
 * Created by Андрей on 27.11.13.
 */
jQuery(document).ready( function(){
    var TimerID, Trains;
    function request(data) {
        var resp;
        $.ajax({
            type: data.type,
            url: encodeURI(data.url),
            headers: {
                "Access-Control-Allow-Origin":"http://localhost:63342/"
            },
            data: data.reqData,
            success: function(response){
                switch (response[0]) {
                    case '{':
                        resp = eval("("+response+")");
                        break;
                    case '[':
                        resp = JSON.parse(response);
                        break;
                    case '<':
                        resp =  JSON.parse(response.substr(120));
                        break;
                    default :
                        return;
                }
                data.callback(resp);
            }
        })
    }
    function getId(id){
        return document.getElementById(id);
    }
    function sendMail (data) {
        var send_time = displayTime(),
            message = "",
            mail_to = getId('email').value,
            string = '',
            reqdata = {};
        if (data && data.trains){
            for ( var i=0; i<data.trains.length; i++) {
                message += "We+have+"+data.trains[i].p+"+platskart+tickets+on+train+"+data.trains[i].train[0]+"+from+"+data.trains[i].from[0]+"+till+"+data.trains[i].to[0]+"+on+date+"+data.trains[i].date
            }
        }
        string = "success=undefined&error=undefined&handler.do-send=1&" +
            "compose_check=35a412c25022bec6540f2162e62427b4&" +
            "_connection_id=70a9b3dc3d56153e71491815747e3c6&" +
            "_ckey=xvpMVguF9rydoXM%2BLu2xleOotaNDNeVJmWOxrkgfOO4%3D&" +
            "ttype=plain&inreplyto=&references=&mark_as=&mark_ids=&" +
            "overwrite=2370000002930635409&ign_overwrite=no&save_symbol=&file=&" +
            "from_name=%D0%A1%D1%83%D0%BB%D0%B8%D0%BC%D0%BA%D0%B0+%D0%90%D0%BD%D0%B4%D1%80%D0%B5%D0%B9&" +
            "from_mailbox=sulandr%40yandex.ua&" +
            "to="+mail_to+"&cc=&bcc=&number=%2B380&code=&" +
            "subj=Good+news!+Ukrzaliznitsia+have+some+tickets+for+your+request!&amount=&" +
            "send="+message+"%0A&" +
            "narod_att=&att=&send_time-time="+send_time;
        reqdata = {
            type: "POST",
            url: "https://mail.yandex.ru/neo2/handlers/do-send-json.jsx",
            reqData: string,
            callback: function(response) {
                alert('message sent');
            }
        };
        request(reqdata);
    }
    function showTrains(obj){
        var container = getId('results_container');
        container.innerHTML = '';
        if (obj.trains) {
            getId('start_monitoring').style.display = 'none';
            for ( var i=0; i<obj.trains.length; i++){
                container.innerHTML +=
                    "<p> ON TIME:__ "+ displayTime() +"___</p>" +
                    "<p> FROM "+obj.trains[i].from[0]+": " + obj.trains[i].otpr+"</p>" +
                    "<p> TILL "+obj.trains[i].to[0]+": " + obj.trains[i].prib+"</p>"+
                    "<p>DATE: " + obj.trains[i].date +"</p>"+
                    "<p>OTPRAVLENIE IS "+obj.trains[i].from[0]+": " + obj.trains[i].otpr +"</p>"+
                    "<p>PRIBITIE V "+obj.trains[i].to[0]+": " + obj.trains[i].prib  +"</p>"+
                    "<p>TRAIN#: " + obj.trains[i].train[0]  +"</p>"+
                    "<p>KUPE: " + obj.trains[i].k  +"</p>"+
                    "<p>LUX: " + obj.trains[i].l  +"</p>"+
                    "<p>PLACKART: " + obj.trains[i].p  +"</p>"+
                    "<p>--------------------------------------------------------------</p>";
            }
        }
        if (obj.error) {
            getId('start_monitoring').style.display = 'block';
            for ( var i=0; i<obj.error.length; i++){
                container.innerHTML +=
                    "<p style='color: red'> ON TIME___ " + displayTime() + " ___ERROR "+obj.error[i]+"</p>";
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
                    Trains = response;
                }
            };
        request(data);
    }
    function buildDropdown (arr, id){
        var from = getId('city_from'),
            till = getId('city_till');
        if (id == "input_from"){
            from.innerHTML = "";
            for (var i=0; i<arr.length; i++){
                from.innerHTML +=
                    "<option value="+arr[i].nom+">"+arr[i].f_name+"</option>";
            }
        }
        if (id == "input_till"){
            till.innerHTML = "";
            for (var i=0; i<arr.length; i++){
                till.innerHTML +=
                    "<option value="+arr[i].nom+">"+arr[i].f_name+"</option>";
            }
        }
    }
    function findCityId (name, id) {
        data = {
            type: "GET",
            url: "http://www.pz.gov.ua/rezerv/aj_stations.php?stan=" + name,
            reqData: "",
            callback: function(response) {
                buildDropdown(response, id);
            }
        };
        request(data);
    }
    function displayTime() {
        var str = "";
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        str += hours + ":" + minutes;
        return str;
    }
    getId('send_mail').onclick = function() {
        sendMail(Trains);
    };
    getId('set_mail').onclick = function() {
        getId('set_mail').style.display = 'none';
    };
    getId('input_from').onkeyup = function(e){
        e.srcElement.value.length > 2 ? findCityId(e.srcElement.value, e.target.id) : false;
    };
    getId('input_till').onkeyup = function(e){
        e.srcElement.value.length > 2 ? findCityId(e.srcElement.value, e.target.id) : false;
    };
    getId('search').onclick = function Search (){
        var from = +getId('city_from').value,
            till = +getId('city_till').value;
        findTrains(from, till);
    };
    getId('start_monitoring').onclick = function() {
        getId('monitoring_container').style.display = 'block';
        getId('start_monitoring').style.display = 'none';
        getId('stop_monitoring').style.display = ' block';
        TimerID = setInterval( (function(){
            console.log('last check on time: ', displayTime());
            var from = +getId('city_from').value,
                till = +getId('city_till').value;
            findTrains(from, till);
            if (Trains.trains && Trains.trains.length > 0){
                for (var i = 0; i < Trains.trains.length; i++){
                    if ( +Trains.trains[i].p > 0 || +Trains.trains[i].k >0 ) {
                        sendMail(Trains);
                        showTrains(Trains);
                        alert('TICKETS AVAILABLE');
                    }
                }
            }
        }) , 100000);
    };
    getId('stop_monitoring').onclick = function() {
        getId('stop_monitoring').style.display = 'none';
        getId('start_monitoring').style.display = 'block';
        clearInterval(TimerID);
        console.log('CLEAR');
    };
});