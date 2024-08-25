window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-fix');//固定したい要素を決める
    const topPosition = header.offsetTop;

    if (window.pageYOffset > topPosition) {
        header.classList.add('fixed');//固定する処理
    } else {
        header.classList.remove('fixed');//戻る時の処理ここを変更すれば良い
    }
});


$('.slider').slick({
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    infinite: true,//スライドをループさせるかどうか。初期値はtrue。
    speed: 500,//スライドのスピード。初期値は300。
    slidesToShow: 3,//スライドを画面に3枚見せる
    slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    centerMode: true,//要素を中央ぞろえにする
    variableWidth: true,//幅の違う画像の高さを揃えて表示
    dots: true,//下部ドットナビゲーションの表示
});


/*ヘッダーの中の文字をホバーした時に色が変わる仕組み*/

document.querySelectorAll('.naver').forEach(function(link) {
    link.addEventListener('mouseover', function() {
        this.style.color = '#919191';  // マウスオーバー時の色を指定
    });

    link.addEventListener('mouseout', function() {
        this.style.color = '';  // マウスアウト時に元の色に戻す
    });
});



//---------------------------session4--------------------------------//

// Cal3.4.5 / 2014-08-05
// SYNCK GRAPHICA
// charset UTF-8
 
var calObj = new Array();
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
calObj[0] = new Object();
 
// xヶ月後のカレンダーを初期表示するか (0の場合は当月)
calObj[0].defaultMonth = 0;
 
// ["day"] 日付に対してのクラス指定
calObj[0].daysClass = new Object();
// ["xDaysLater"] ○日後のクラス指定
calObj[0].xDaysLater = new Array();
calObj[0].xDaysLater[0] = 'Today'; // Todayクラスを指定。
calObj[0].xDaysLater[1] = 'Tomorrow'; // 1日後にTomorrowクラスを指定。

 
 
// ["xDay"] 毎月○日のクラス指定
calObj[0].xDays = new Array();
calObj[0].xDays[1] = 'Sale;'; // 毎月1日にSaleクラスを指定ってことね。
 
// ["week"] 毎週○曜日の場合
calObj[0].week = new Array();
calObj[0].week[0] = "Sun"; 
calObj[0].week[1] = "Mon";
calObj[0].week[2] = "Tue";
calObj[0].week[3] = "Wed";
calObj[0].week[4] = "Thu"; 
calObj[0].week[5] = "Fri"; 
calObj[0].week[6] = "Sat"; 
 
// (○月) 第× △曜日の場合
calObj[0].month = new Object();
// 毎月「曜日-第○」は休み 日:0 / 月:1 / 火:2 / 水:3 / 木:4 / 金:5 / 土:6
calObj[0].month["2-1"] = 'Holyday'; // 第1火曜日はHolydayクラス指定
calObj[0].month["0-3"] = 'Holyday'; //第3日曜日は休み
calObj[0].week[1] = 'Holyday';

 
// ["backward"] 過去の日付のクラス名(指定しない場合はnull)
calObj[0].backward = 'backward';
 
// 優先度 クラス指定する順番が変わります。
calObj[0].priority = new Array('week','xDay','xDaysLater','day','backward');
 
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// 以下、さわらぬ神にたたりなし
calObj.calendars = new Array();
calObj.days = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
calObj.weekName = new Array("日","月","火","水","木","金","土");
calObj.weekNameclass = new Array("sun","mon","tue","wed","thu","fri","sat");
calObj.monthName = new Array('','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月');
calObj.date = new Date();
calObj.date = new Date(calObj.date.getFullYear() + "/" + (calObj.date.getMonth() + 1) + "/" + calObj.date.getDate() + " 00:00:00");
calObj.day = calObj.date.getDate();
calObj.month = calObj.date.getMonth() + 1;
calObj.year = calObj.date.getFullYear();
calObj.currentList = null;
 
function cal_init(){
    var d = window.document;
    var tagObj = d.getElementsByTagName("div");
    var calToday = new Date();
    for(var i=0;i<tagObj.length;i++){
        if(tagObj[i].className == "cal_wrapper"){
            var calId = Number(tagObj[i].id.substring(3,tagObj[i].id.length));
            calObj.calendars.push(calId);
            if(0 < (calObj.month + calObj[calId].defaultMonth) && (calObj.month + calObj[calId].defaultMonth) < 13)
                calObj[calId].currentMonth = new Date(calObj.year+"/"+(calObj.month + calObj[calId].defaultMonth)+"/"+"1 00:00:00");
            else
                calObj[calId].currentMonth = new Date((calObj.year+1)+"/"+((calObj.month + calObj[calId].defaultMonth)%12)+"/"+"1 00:00:00");
            cal_create(calId);
        }
    }
}
function cal_create(calId){
    var d = window.document;
    var day = calObj[calId].currentMonth.getDate();
    var month = calObj[calId].currentMonth.getMonth() + 1;
    var year = calObj[calId].currentMonth.getFullYear();
    var week = calObj[calId].currentMonth.getDay();
    var tdTextListArr = new Array();
    var bisDay = 0;
    var MonthDays = calObj.days[month];
    var WeekCnt = new Array();
    if(month == 2){
        if(year % 100 == 0 || year % 4 != 0){
            if(year % 400 != 0)
                bisDay = 0;
            else
                bisDay = 1;
        }
        else if(year % 4 == 0)
            bisDay = 1;
        else
            bisDay = 0;
    }
    MonthDays += bisDay;
    var calHTML = "<table border='0' cellspacing='0' cellpadding='0' class='cal'>";
    calHTML += "<tr><th colspan='7'>";
    calHTML += "<div class='cal_ui'>";
    calHTML += "<input type='button' onclick='cal_move("+calId+",-1);' value='&lt; 前月' />";
    calHTML += "<input type='button' onclick='cal_move("+calId+",null);' value='-' />";
    calHTML += "<input type='button' onclick='cal_move("+calId+",1);' value='翌月 &gt;' />";
    calHTML += "</div>";
    calHTML += "<p>" + year + "年" + calObj.monthName[month] + "</p></th></tr>";
    calHTML += "<tr class='headline'>";
    for(var i=0;i<calObj.weekName.length;i++)
    calHTML += "<td class="+ calObj.weekNameclass[i] +">" + calObj.weekName[i] + "</td>";
    calHTML += "</tr><tr>";
    for(var i=0;i<week;i++)
        calHTML += "<td>&nbsp;</td>";
    for(dayCnt=1;dayCnt<=(calObj.days[month]+bisDay);dayCnt++){
        var dayStr = year + "/" + month + "/" + dayCnt;
        var dayStrN = month + "/" + dayCnt;
        if(WeekCnt[week] == undefined)
            WeekCnt[week] = 0;
        WeekCnt[week]++;
     
        var monStr = '' + month + '-' + week + '-' + WeekCnt[week];
        var weekStr = '' + week + '-' + WeekCnt[week];
        //alert(weekStr);
         
        var dayClass = new Object();
        var dayClassText = new Object();
        var currentDayDate = new Date(year + "/" + month + "/" + dayCnt + " 00:00:00");
        var laterDay = Math.floor((currentDayDate.getTime() - calObj.date.getTime()) / 1000 / (60 * 60 * 24));
        var tdId = "td_"+calId+"_"+year+"_"+month+"_"+dayCnt;
         
        // backward
        if(calObj[calId].backward != null && currentDayDate.getTime() < calObj.date.getTime())
            dayClass["backward"] = calObj[calId].backward;
         
        // week
        if(calObj[calId].month[weekStr] != undefined)
            dayClass["week"] = calObj[calId].month[weekStr];
        else if(calObj[calId].month[monStr] != undefined)
            dayClass["week"] = calObj[calId].month[monStr];
        else if(calObj[calId].week[week] != undefined){
            if(typeof(calObj[calId].week[week]) == "object" && calObj[calId].week[week][WeekCnt[week]] != undefined){
                dayClass["week"] = calObj[calId].week[week][WeekCnt[week]];
            }
            else if(calObj[calId].week[week] != undefined && typeof(calObj[calId].week[week]) != "object")
                dayClass["week"] = calObj[calId].week[week];
        }
        // xDay
        if(calObj[calId].xDays[dayCnt] != undefined)
            dayClass["xDay"] = calObj[calId].xDays[dayCnt];
         
        // xDaysLater
        if(calObj[calId].xDaysLater[laterDay] != undefined)
            dayClass["xDaysLater"] = calObj[calId].xDaysLater[laterDay];
         
        // day
        if(calObj[calId].daysClass[dayStr] != undefined)
            dayClass["day"] = calObj[calId].daysClass[dayStr];
        else if(calObj[calId].daysClass[dayStrN] != undefined)
            dayClass["day"] = calObj[calId].daysClass[dayStrN];
         
        var tdClassArr = new Array();
        var tdTextArr = new Array();
        var tdLinkArr = new Array();
        var tdClassStr = "";
        var tdTextStr = "";
        var tdMouse = "";
        var tdClassNames = new Object();
        for(var ci=0;ci<calObj[calId].priority.length;ci++){
            if(dayClass[calObj[calId].priority[ci]] != undefined){
                var splitArr = new Array();
                splitArr = dayClass[calObj[calId].priority[ci]].split(';');
                tdClassArr.push(splitArr[0]);
                tdClassNames[splitArr[0]] = true;
                if(splitArr[1] != undefined){
                    tdTextArr.push(splitArr[1]);
                    var tdTextListLink = "";
                    if(splitArr[2] != undefined)
                        tdTextListLink = " onclick=\"cal_open(\'"+splitArr[2]+"\')\"";
                    tdTextListArr.push('<ol><li id="'+tdId+'_li" onmouseover="cal_list2day_over(this)" onmouseout="cal_list2day_out(this)" value="'+dayCnt+'"'+tdTextListLink+'>'+splitArr[1]+'</li></ol>');
                }
                if(splitArr[2] != undefined)
                    tdLinkArr.push(splitArr[2]);
            }
        }
        if(tdClassArr.length > 0)
            tdClassStr = " class='" + tdClassArr.join(' ') + "'";
        calHTML += "<td id='"+tdId+"_td'><div"+tdClassStr+tdMouse+">" + dayCnt + tdTextStr + "</div></td>";
        if(week == 6){
            calHTML += "</tr>";
            if(dayCnt < calObj.days[month])
                calHTML += "<tr>";
            week = 0;
        }
        else
            week++;
    }
    while(week <= 6 && week != 0){
        calHTML += "<td>&nbsp;</td>";
        if(week == 6)
            calHTML += "</tr>";
        week++;
    }
    calHTML += "</table>";
    d.getElementById('cal'+calId).innerHTML = calHTML;
     
    // list
    if(d.getElementById('schedule'+calId)){
        d.getElementById('schedule'+calId).innerHTML = "";
        if(tdTextListArr.length > 0 && d.getElementById('schedule'+calId)){
            d.getElementById('schedule'+calId).innerHTML = tdTextListArr.join('');
        }
    }
    // /list
}
function cal_list2day_over(obj){
    var d = window.document;
    var dayId = obj.id.substring(0,obj.id.indexOf('_li'));
    if(d.getElementById(calObj.currentList))
        d.getElementById(calObj.currentList).style.backgroundColor = '#FFF';
    calObj.currentList = dayId+'_td';
    if(d.getElementById(dayId+'_td'))
        d.getElementById(dayId+'_td').style.backgroundColor = '#CCC';
}
function cal_list2day_out(obj){
    var d = window.document;
    var dayId = obj.id.substring(0,obj.id.indexOf('_li'));
    if(d.getElementById(calObj.currentList))
        d.getElementById(calObj.currentList).style.backgroundColor = '#FFF';
}
function cal_open(uri){
    window.open(uri);
}
function cal_disp_text(textId){
    var d = window.document;
    if(navigator.userAgent.indexOf('MSIE') == -1)
        d.getElementById(textId).style.display = "block";
}
function cal_hide_text(textId){
    var d = window.document;
    d.getElementById(textId).style.display = "none";
}
 
function cal_move(calId,m){
    if(m == null)
        calObj[calId].currentMonth = new Date(calObj.year+"/"+(calObj.month)+"/"+"1 00:00:00");
    else {
        var day = calObj[calId].currentMonth.getDate();
        var month = calObj[calId].currentMonth.getMonth() + 1;
        var year = calObj[calId].currentMonth.getFullYear();
        if(0 < month + m && month + m < 13)
            calObj[calId].currentMonth = new Date(year+"/"+(month + m)+"/"+"1 00:00:00");
        else if((month + m) < 1){
            year--;
            month = 12;
            calObj[calId].currentMonth = new Date(year+"/"+(month)+"/"+"1 00:00:00");
        }
        else {
            year++;
            month = 1;
            calObj[calId].currentMonth = new Date(year+"/"+(month)+"/"+"1 00:00:00");
        }
    }
    cal_create(calId);
}
function cal_clone(obj) {
    var dest;
    if(typeof obj == 'object'){
        if(obj instanceof Array){
            dest = new Array();
            for(i=0;i<obj.length;i++)
                dest[i] = cal_clone(obj[i]);
        }
        else {
            dest = new Object();
            for(prop in obj)
                dest[prop] = cal_clone(obj[prop]);
        }
    }
    else
        dest = obj;
    return dest;
}
function cal_getMonth(){
     
}
cal_init();