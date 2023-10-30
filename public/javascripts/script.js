
const results_body = document.querySelector('#results');

let currently_choosed={
    ALL:false,
    GAME_NAME:String,
    GAME_MODE:String,
    GAME_MAP:String,
}


let currentPage=0;
let howMuchInRowsInPage=10;
let maxPagesOfLastTable=0; //max pages last table
let maxRowsOfLastTable=0; //max rows last table
let buttonSortBy="ID";
let buttonOrderBy="ASC";
let chooseByTableName="warzone2_mw2_stats";
let buttonGroupNumber="";
let last_button_id_by_game_name=null;
let last_button_id_by_game_mode=null;
let last_button_id_by_game_map=null;
let last_button_id_by_group_num=null;

function orderByButtonStatusChanger(){

    if(buttonOrderBy=="ASC")
    {
        buttonOrderBy="DESC";
    }
    else
    {
        buttonOrderBy="ASC";
    }
  }


gethowMuchRecordRowsThereIs();
load_data_all();
//sortByGameNameModeMapValue();

function load_data_all(){
    

    if(typeof ulElement2 !== "undefined"){
        ulElement2.innerHTML="";
    }

    if(typeof ulElement3 !== "undefined"){
        ulElement3.innerHTML="";
    }
    


    chooseByTableName="warzone2_mw2_stats";  

    

    buttonOrderBy="DESC";
    buttonSortBy="ID";

    stayPressedButton(last_button_id_by_game_name);
    last_button_id_by_game_name=null;
    stayPressedButton(last_button_id_by_game_mode);
    last_button_id_by_game_mode=null;
    stayPressedButton(last_button_id_by_game_map);
    last_button_id_by_game_map=null;
    stayPressedButton(last_button_id_by_group_num);
    last_button_id_by_group_num=null;

    console.log("function:load_data_all");
  
    let str;
    let game_name='';
    if(last_button_id_by_game_name!=null){
      str=last_button_id_by_game_name.id;  
      game_name=str.slice(str.indexOf(':') + 1);
      console.log("game_name:"+game_name);
    }
  
  
    str='';
    let game_mode='';
    if(last_button_id_by_game_mode!=null){
      str=last_button_id_by_game_mode.id;  
      game_mode=str.slice(str.indexOf(':') + 1);
      console.log("game_mode:"+game_mode);
    }
  
    str='';
    let game_map='';
    if(last_button_id_by_game_map!=null){
      str=last_button_id_by_game_map.id;  
      game_map=str.slice(str.indexOf(':') + 1);
      console.log("game_map:"+game_map);
    }
  
  
    let url="/get_data_by_variable";
  
    const request = new XMLHttpRequest();
  

    currentPage=parseInt(sessionStorage.getItem("currentPage"));
    if(isNaN(currentPage)){
        currentPage=0;
        sessionStorage.setItem("currentPage",0);
    }
    console.log("showing page:"+currentPage);

    // Set request parameters
    var params = {
    param0: chooseByTableName,    
    param1: game_name,
    param2: game_mode,
    param3: game_map,
    param4: buttonOrderBy,
    param5: buttonSortBy,
    param6: "", //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
    param7: "load_data_all()",
    param8: "",  //limit how ,much rows gevin 10
    param9: "",  //from page 0-10 10-20 20-30 ...
    };
  
    // Convert parameters to query string
    var queryString = Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
  
    // Append query string to the URL
    url += "?" + queryString;
  
    request.open(`get`,url);
  
    // Send the request
    request.send();
  
    let html = '';
  
    request.onreadystatechange = () => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            const results = JSON.parse(request.responseText);
            html += `
            <tr>
                <td></td>
                <td id="game_name_data">`+game_name+`</td>
                <td contenteditable id="game_mode_data">`+game_mode+`</td>
                <td contenteditable id="place_data"></td>
                <td contenteditable id="kills_data"></td>
                <td contenteditable id="death_data"></td>
                <td contenteditable id="kd_data"></td>
                <td contenteditable id="date_data">`+onPageLoad()+`</td>
                <td contenteditable id="current_rank_data"></td>
                <td contenteditable id="number_redeploys_data"></td>
                <td id="map_data">`+game_map+`</td>
                <td contenteditable id="group_number_data"></td>
                <td contenteditable id="score_data"></td>
                <td contenteditable id="more_to_add_data"></td>
                <td><button type="button" class="btn btn-success btn-sm" onclick="add_data()">Add</button></td>
            </tr>
            `;
  
  
            results.forEach(result => {
                html += `
                <tr id=`+result.ID+`>
                    <td >`+result.ID+`</td>
                    <td contenteditable>`+result.GAME_NAME+`</td>
                    <td contenteditable>`+result.GAME_MODE+`</td>
                    <td contenteditable>`+result.PLACE+`</td>
                    <td contenteditable>`+result.KILLS+`</td>
                    <td contenteditable>`+result.DEATH+`</td>
                    <td contenteditable>`+result.KD+`</td>
                    <td contenteditable>`+formatDateTime02(result.DATE)+`</td>
                    <td contenteditable>`+result.CURRENT_RANK+`</td>
                    <td contenteditable>`+result.NUMBER_REDEPLOYS+`</td>
                    <td contenteditable>`+result.GAME_MAP+`</td>
                    <td contenteditable>`+giveNameGroupTypeByNumber(result.GROUP_NUMBER)+`</td>
                    <td contenteditable>`+result.SCORE+`</td>
                    <td contenteditable>`+result.MORE_TO_ADD+`</td>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="delete_data(`+result.ID+`)">Remove</button></td>
                    <td><button type="button" class="btn btn-primary btn-sm" onclick="update_data(this, 'dssad', '`+result.ID+`')">Update</button></td>
                </tr>
                `;
            });
  
  
  
            results_body.innerHTML = html;
        }
    };
  
    //request.send();
  }


function stayPressedButton(button){

    if(button!=null){
      if(button.className=="")
      {
        button.className="pressed";
      }
  
      else{
        button.className="";
      }
    }
  }

function sortByGameNameModeMapValue()
{
    console.log("function sortByGameNameModeMapValue()");
    const request = new XMLHttpRequest();


    let str;
    let game_name='';
    if(last_button_id_by_game_name!=null){
      str=last_button_id_by_game_name.id;  
      game_name=str.slice(str.indexOf(':') + 1);
      console.log("game_name:"+game_name);
    }
  
  
    str='';
    let game_mode='';
    if(last_button_id_by_game_mode!=null){
      str=last_button_id_by_game_mode.id;  
      game_mode=str.slice(str.indexOf(':') + 1);
      console.log("game_mode:"+game_mode);
    }
  
    str='';
    let game_map='';
    if(last_button_id_by_game_map!=null){
      str=last_button_id_by_game_map.id;  
      game_map=str.slice(str.indexOf(':') + 1);
      console.log("game_map:"+game_map);
    }
  
    if(game_name!=""){
        game_name=addQuotes(game_name);
        game_name="GAME_NAME="+game_name;
      }
  
      if(game_mode!=""){
        game_mode=addQuotes(game_mode);
        game_mode="GAME_MODE="+game_mode;
      }
  
      if(game_map!=""){
        game_map=addQuotes(game_map);
        game_map="GAME_MAP="+game_map;
      }

      let group_number=buttonGroupNumber;
      if(group_number!=""){
        group_number="GROUP_NUMBER="+group_number;
      }
  

      console.log("group_number:"+group_number);  
    let url="/get_data_by_variable";
  
    // Set request parameters
    var params = {
    param0: chooseByTableName,    
    param1: game_name,
    param2: game_mode,
    param3: game_map,
    param4: buttonOrderBy,
    param5: buttonSortBy,
    param6: group_number, //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
    param7: "sortByGameNameModeMapValue()",
    param8: "",  //limit how ,much rows gevin
    param9: ""  //from page 0-10 10-20 20-30 ...
    };
  
    // Convert parameters to query string
    var queryString = Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
  
    // Append query string to the URL
    url += "?" + queryString;
  
    request.open(`get`,url);


    let html = '';

    request.onreadystatechange = () => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            const results = JSON.parse(request.responseText);

            html += `
            <tr>
                <td></td>
                <td contenteditable id="game_name_data"></td>
                <td contenteditable id="game_mode_data"></td>
                <td contenteditable id="place_data"></td>
                <td contenteditable id="kills_data"></td>
                <td contenteditable id="death_data"></td>
                <td contenteditable='true' id="kd_data"></td>
                <td contenteditable id="date_data">`+onPageLoad()+`</td>
                <td contenteditable id="current_rank_data"></td>
                <td contenteditable id="number_redeploys_data"></td>
                <td contenteditable id="map_data"></td>
                <td contenteditable id="group_number_data"></td>
                <td contenteditable id="score_data"></td>
                <td contenteditable id="more_to_add_data"></td>
                <td><button type="button" class="btn btn-success btn-sm" onclick="add_data()">Add</button></td>
            </tr>
            `;


            results.forEach(result => {
                html += `
                <tr id=`+result.ID+`>
                    <td >`+result.ID+`</td>
                    <td contenteditable>`+result.GAME_NAME+`</td>
                    <td contenteditable>`+result.GAME_MODE+`</td>
                    <td contenteditable>`+result.PLACE+`</td>
                    <td contenteditable>`+result.KILLS+`</td>
                    <td contenteditable>`+result.DEATH+`</td>
                    <td contenteditable>`+result.KD+`</td>
                    <td contenteditable>`+formatDateTime02(result.DATE)+`</td>
                    <td contenteditable>`+result.CURRENT_RANK+`</td>
                    <td contenteditable>`+result.NUMBER_REDEPLOYS+`</td>
                    <td contenteditable>`+result.GAME_MAP+`</td>
                    <td contenteditable>`+giveNameGroupTypeByNumber(result.GROUP_NUMBER)+`</td>
                    <td contenteditable>`+result.SCORE+`</td>
                    <td contenteditable>`+result.MORE_TO_ADD+`</td>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="delete_data(`+result.ID+`)">Remove</button></td>
                    <td><button type="button" class="btn btn-primary btn-sm" onclick="update_data(this, 'dssad', '`+result.ID+`')">Update</button></td>
                </tr>
                `;
            });



            results_body.innerHTML = html;
        }
    };

    request.send();
    
}

function add_data()
{
    //console.log("function:add_data");

    if(confirm("Are you sure you want to add it?"))
    {

        let game_name = document.getElementById('game_name_data');

        let game_mode = document.getElementById('game_mode_data');

        let place = document.getElementById('place_data');

        let kills = document.getElementById('kills_data');

        let death = document.getElementById('death_data');

        let kd = document.getElementById('kd_data');

        let date1 = document.getElementById('date_data');

        let current_rank = document.getElementById('current_rank_data');

        let number_redeploys = document.getElementById('number_redeploys_data');

        let map = document.getElementById('map_data');

        let group_number = document.getElementById('group_number_data');

        let score = document.getElementById('score_data');

        let more_to_add = document.getElementById('more_to_add_data');
;

        date1=formatDateTime(date1.innerText);

        console.log("kills:"+kills.innerText);
        console.log("group_number:"+group_number.innerText);

        ValueToNumber(place);
        ValueToNumber(kills);
        ValueToNumber(death);
        ValueToNumber(current_rank);
        ValueToNumber(number_redeploys);
        ValueToNumber(group_number);
        ValueToNumber(number_redeploys);
        ValueToNumber(score);
        
        kd=kdMaker(kills.innerText,death.innerText,kd);

       // console.log("group_numer:"+group_number.innerText)


        let param1 = `game_name=`+game_name.innerText+`&game_mode=`+game_mode.innerText+`&place=`+place.innerText;

        param1+=`&kills=`+kills.innerText+`&death=`+death.innerText+`&kd=`+kd.innerText+`&date=`+date1.innerText+`&current_rank=`+current_rank.innerText;

        param1+=`&number_redeploys=`+number_redeploys.innerText+`&map=`+map.innerText;

        param1+=`&group_number=`+group_number.innerText+`&score=`+score.innerText+`&more_to_add=`+more_to_add.innerText+``;

        const param=param1;
        

        

        const request = new XMLHttpRequest();

        request.open(`POST`, `/add_data`, true);

        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        request.onreadystatechange = () => {

            if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
            {
                alert("Data Added");

                load_data_all();
            }

        };

        request.send(param);
    }
}

function update_data(element, variable_name, id)
{
    //console.log("function:update_data");

    if(confirm("Are you sure you want to update it?"))
    {

        const game_name = document.getElementById('game_name_data');

        const game_mode = document.getElementById('game_mode_data');

        const place = document.getElementById('place_data');

        const kills = document.getElementById('kills_data');

        const death = document.getElementById('death_data');

        let date1 = document.getElementById('date_data');

        const current_rank = document.getElementById('current_rank_data');

        const number_redeploys = document.getElementById('number_redeploys_data');

        const map = document.getElementById('map_data');

        const group_number = document.getElementById('group_number_data');

        const score = document.getElementById('score_data');

        const more_to_add = document.getElementById('more_to_add_data');


        // "//tr[@id='some_number']"
        let tmpXpath="//tr[@id='";
        tmpXpath+=id;
        tmpXpath+="']";

        const xpath = tmpXpath; // Replace with your desired XPath expression
        const result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);

        let node;
        let string="";
        while (node = result.iterateNext()) {
            //console.log(node.innerText);
            string=node.innerText;
        }

        let arrayOfStrings=string.split("\t");
        //arrayOfStrings.pop();
        //arrayOfStrings.pop();
        //console.log(arrayOfStrings);

        arrayOfStrings[11]=giveNumberGroupTypeByName(arrayOfStrings[11]);

        let text_new="";

       
        text_new=`id=`+arrayOfStrings[0];
        text_new+=`&game_name=`+arrayOfStrings[1];
        text_new+=`&game_mode=`+arrayOfStrings[2];
        text_new+=`&place=`+arrayOfStrings[3];
        text_new+=`&kills=`+arrayOfStrings[4];
        text_new+=`&death=`+arrayOfStrings[5];
        text_new+=`&kd=`+arrayOfStrings[6];
        text_new+=`&date=`+formatDateTime(arrayOfStrings[7]);
        text_new+=`&current_rank=`+arrayOfStrings[8];
        text_new+=`&number_redeploys=`+arrayOfStrings[9];
        text_new+=`&map=`+arrayOfStrings[10];
        text_new+=`&group_number=`+arrayOfStrings[11];
        text_new+=`&score=`+arrayOfStrings[12];
        text_new+=`&more_to_add=`+arrayOfStrings[13];
        text_new+=``;
       
       // console.log(text_new)

        const param=text_new;

        

        const request = new XMLHttpRequest();

        request.open(`POST`, `/update_data`, true);

        //Send the proper header information along with the request
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request.onreadystatechange = () => {

            if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
            {

                alert('Data Updated');

            }

        };

        request.send(param);
    }
}

function delete_data(id)
{
    //console.log("function:delete_data");

    if(confirm("Are you sure you want to remove it?"))
    {
        const param = `id=`+id+``;

        const request = new XMLHttpRequest();

        request.open('POST', `/delete_data`, true);

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request.onreadystatechange = () => {

            if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
            {
                alert('Data Deleted');

                load_data_all();
            }

        };

        request.send(param);
    }
}

//this fucntion format the dateTime to:
//before format:17/09/2023 12:44:37
//after format:2023-09-17T12:44:37.000Z
function formatDateTime(myDateTime){
    //console.log("function:formatDateTime");
// Input date string
        const dateString = myDateTime;

        // Split the date and time parts
        const [datePart, timePart] = dateString.split(" ");

        // Split the date part into day, month, and year
        const [day, month, year] = datePart.split("/");

        // Split the time part into hours, minutes, and seconds
        const [hours, minutes, seconds] = timePart.split(":");

        // Create a new Date object in the desired format
        const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`);

        // Output the date in the desired format
        return (date.toISOString());
}

//this fucntion format the dateTime to:
//before format:2023-09-17T12:44:37.000Z
//after format:17/09/2023 12:44:37
function formatDateTime02(myDateTime){
    //console.log("function:formatDateTime02");
    // Input date string
    const dateString = myDateTime;

    // Create a new Date object from the date string
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth(); // Months are zero-indexed add+1 but it will be in onoehr function
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let formattedDate=MYformatedDate(day,month,year,hours,minutes,seconds);

// Output the formatted date string
    return formattedDate;
}


function ValueToNumber(element){
    if(isNaN(element.innerText)) element.innerText='-1';

    if(element.innerText=='') element.innerText='-1';
}

function kdMaker(kills,death,kd){
    let tmpKills=parseInt(kills);
    let tmpDeath=parseInt(death);

    if(tmpDeath>0){
        kd.innerText=tmpKills/tmpDeath;
    }

    else if(tmpDeath==0){
        kd.innerText=tmpKills;  
    }
    else{
        kd.innerText=0;
    }


    return kd;
}


function gethowMuchRecordRowsThereIs(){
    console.log("function gethowMuchRecordRowsThereIs");
    const request = new XMLHttpRequest();

  
    let url="/get_max_rows_of_table";


    chooseByTableName="warzone2_mw2_stats";

    // Set request parameters
    var params = {
    param0: chooseByTableName,
    };
  
    // Convert parameters to query string
    var queryString = Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
  
    // Append query string to the URL
    url += "?" + queryString;
  
    request.open(`get`,url);


    request.onreadystatechange = () => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            const results = JSON.parse(request.responseText);
            console.log("get_max_rows:");
            console.log(results);
            console.log(results[0]["count(*)"]);
            maxRowsOfLastTable=results[0]["count(*)"];
            maxPagesOfLastTable=Math.ceil(maxRowsOfLastTable/10);
            console.log(maxPagesOfLastTable);
            makingButtonPages();
        }
    };

    request.send();
}


function pageChanged(num){
    currentPage=parseInt(sessionStorage.getItem("currentPage"));
    currentPage+=1;
    sessionStorage.setItem("currentPage",currentPage);
    console.log("currnt after cahnge:"+currentPage);
    //load_data_all();
}

function makingButtonPages(){
    //let page=document.getElementById("page=1");

   // let aElement = document.createElement("a");
    //aElement.href="";
    //aElement.setAttribute("onclick",`pageChanged('${currentPage}')`);
   // aElement.textContent=2;
    //page.appendChild(aElement);
}

function removeQuotes(str) {
    return str.replace(/'/g, '');
  }