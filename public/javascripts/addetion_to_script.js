let game_name_data;
let ulElement1;
let ulElement2;
let ulElement3;
let ulElement5;
let ButtonsShow;


let let_button_list={
  ID:[],
  BUTTON_PRESSED:[],
  FIRST_TIME_GAME_NAME:first=true,
  FIRST_TIME_GAME_MODE:first=true,
  FIRST_TIME_GAME_MAP:first=true,
};

let list_game_names={
  ID:[],
  GAME_NAME:[]
};

let list_game_types={
  ID:[],
  GAME_TYPE:[],
  GAME_NAME:[]
};

let list_game_maps={
  ID:[],
  GAME_MAP:[],
  GAME_NAME:[],
  GAME_MODE:[],
  MAP_BOLD:[]
}

//its initing the button clicked of sort by ID,KILLS,PLACE,...
function initButtonStatus(button_clicked){
  console.log("function initButtonStatus:"+button_clicked);
  buttonSortBy=button_clicked; //ID,PLACE,KILLS,DEATH,KD,SCORE
  orderByButtonStatusChanger(); //ASC,DESC
  
  sortByGameNameModeMapValue();
}





//for solo,duo,trio,quad converts number to name
function giveNumberGroupTypeByName(name){

  if(name=='Solo'){
    name=1;
  }

  if(name=='Duo'){
    name=2;
  }

  if(name=='Trio'){
    name=3;
  }


  if(name=='Quad'){
    name=4;
  }

  return name;
}

//for solo,duo,trio,quad converts name to number
function giveNameGroupTypeByNumber(number){
  let group_type=number;

  if(group_type=='1'){
    group_type='Solo';
  }

  if(group_type=='2'){
    group_type='Duo';
  }

  if(group_type=='3'){
    group_type='Trio';
  }

  if(group_type=='4'){
    group_type='Quad';
  }

  return group_type;
}





function sortByGameMap(game_map,game_name,button_id){
  console.log("function:sortByGameMap");

  console.log("game_map:"+game_map);

  console.log("button_id:"+button_id);



  let button_id_by_game_map=document.getElementById("button_game_map:"+game_map);
  
  
  stayPressedButton(button_id_by_game_map);
  stayPressedButton(last_button_id_by_game_map);
  stayPressedButton(last_button_id_by_group_num);
  last_button_id_by_group_num=null;
  last_button_id_by_game_map=button_id_by_game_map;

  let str;
  
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
  
  if(last_button_id_by_game_map!=null){
    str=last_button_id_by_game_map.id;  
    game_map=str.slice(str.indexOf(':') + 1);
    console.log("game_map:"+game_map);
  }

  
  url="get_data_by_variable";

  const request = new XMLHttpRequest();

  let button_game_map_img=document.getElementById("img_src");
  button_game_map_img.src="images/maps/";
  button_game_map_img.src+=game_map+".jpg";

  chooseByTableName="warzone2_mw2_stats";

  let tmp_game_name=game_name;
  let tmp_game_mode=game_mode;
  let tmp_game_map=game_map;

  if(tmp_game_name!=""){
    tmp_game_name=addQuotes(tmp_game_name);
    tmp_game_name="GAME_NAME="+tmp_game_name;
  }

  if(tmp_game_mode!=""){
    tmp_game_mode=addQuotes(tmp_game_mode);
    tmp_game_mode="GAME_MODE="+tmp_game_mode;
  }

  if(tmp_game_map!=""){
    tmp_game_map=addQuotes(tmp_game_map);
    tmp_game_map="GAME_MAP="+tmp_game_map;
  }


  var params = {
    param0: chooseByTableName,    
    param1: tmp_game_name,
    param2: tmp_game_mode,
    param3: tmp_game_map,
    param4: buttonOrderBy,
    param5: buttonSortBy,
    param6: "", //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
    param7: "sortByGameMap()",
    param8: "",  //limit how ,much rows gevin
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



function sortByGameMode(game_mode,game_name,button_id){
  load_data_game_map_list();
  let button_id_by_game_mode=document.getElementById("button_game_mode:"+game_mode);
  
  
  stayPressedButton(button_id_by_game_mode);
  stayPressedButton(last_button_id_by_game_mode);
  stayPressedButton(last_button_id_by_group_num);
  last_button_id_by_group_num=null;


  last_button_id_by_game_mode=button_id_by_game_mode;

  last_button_id_by_game_map=null;

  console.log("function:sortByGameMode");

  console.log("game_mode:"+game_mode);
  console.log("button_id:"+button_id);

  let url="/get_data_by_variable";

  const request = new XMLHttpRequest();

  chooseByTableName="warzone2_mw2_stats";
  
    // Set request parameters
    var params = {
      param0: chooseByTableName,    
      param1: "",
      param2: "GAME_MODE="+addQuotes(game_mode),
      param3: "",
      param4: buttonOrderBy,
      param5: buttonSortBy,
      param6: "", //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
      param7: "sortByGameMode()",
      param8: "",  //limit how ,much rows gevin
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
              <td id="game_mode_data">`+game_mode+`</td>
              <td contenteditable id="place_data"></td>
              <td contenteditable id="kills_data"></td>
              <td contenteditable id="death_data"></td>
              <td contenteditable id="kd_data"></td>
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

          //load_data_game_map_list();
          
          makingSortButtonsGameMapsByMode(game_name,game_mode);  
          results_body.innerHTML = html;
      }
  };

  //request.send();

}



function sortByGameName(game_name,button_id){

  let button_id_by_game_name=document.getElementById("button_game_name:"+game_name);
  
  
  stayPressedButton(button_id_by_game_name);
  stayPressedButton(last_button_id_by_game_name);
  stayPressedButton(last_button_id_by_group_num);
  last_button_id_by_group_num=null;

  last_button_id_by_game_name=button_id_by_game_name;
  last_button_id_by_game_mode=null;
  last_button_id_by_game_map=null;
      console.log("function:sortByGameName");

      console.log("game_name:"+game_name);
      console.log("button_id:"+button_id);

      let url="/get_data_by_variable";
  
      const request = new XMLHttpRequest();
      chooseByTableName="warzone2_mw2_stats";

      buttonGroupNumber="";
      

      // Set request parameters
      var params = {
        param0: chooseByTableName,    
        param1: "GAME_NAME="+addQuotes(game_name),
        param2: "",
        param3: "",
        param4: "DESC",
        param5: buttonSortBy,//
        param6: buttonGroupNumber, //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
        param7: "sortByGameName()",
        param8: "",  //limit how ,much rows gevin
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
                  <td contenteditable id="game_mode_data"></td>
                  <td contenteditable id="place_data"></td>
                  <td contenteditable id="kills_data"></td>
                  <td contenteditable id="death_data"></td>
                  <td contenteditable id="kd_data"></td>
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
  
      makingSortButtonsGameModes(game_name);  
      removeDuplicateNames(list_game_maps,game_name);
      makingSortButtonsGameMaps(game_name);
      //makingSortButtonsGameMapsByMode(game_name);
      //request.send();
      
}



function load_data_game_name_list()
{
 
  console.log("function:load_data_game_name_list");

  game_name=document.querySelector('#game_name_data');

  //console.log("game_name:"+game_name);

   // Step 1: Create the <select> element and <option> elements
  ulElement1 = document.querySelector('#ul_for_buttons01');

    const request = new XMLHttpRequest();

    chooseByTableName="game_name_option";
    let url="/get_data_by_variable";

        // Set request parameters
        var params = {
          param0: chooseByTableName,    
          param1: "",
          param2: "",
          param3: "",
          param4: "DESC",
          param5: buttonSortBy,
          param6: "", //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
          param7: "load_data_game_name_list()",
          param8: "",  //limit how ,much rows gevin
          param9: "",  //from page 0-10 10-20 20-30 ...
          };
        
          // Convert parameters to query string
          var queryString = Object.keys(params)
          .map((key) => key + "=" + encodeURIComponent(params[key]))
          .join("&");
        
          // Append query string to the URL
          url += "?" + queryString;
        
          request.open(`get`,url);

    list_game_names.ID=[];     
    list_game_names.GAME_NAME=[];
    //request.open(`get`, `/get_data_by_variable`);

    request.onreadystatechange = () => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            const results = JSON.parse(request.responseText);

            results.forEach(result => {
                list_game_names.ID.push(result.ID);
                list_game_names.GAME_NAME.push(result.GAME_NAME);
            });
            console.log("list_game_names.ID.length:");
            console.log(list_game_names.ID.length);
            makingSortButtonsGameNames();
        }
    };

    request.send();

}

function load_data_game_mode_list()
{


  console.log("function:load_data_game_mode_list");

  game_name=document.querySelector('#game_mode_data');

  console.log("game_name:"+game_name);
   // Step 1: Create the <select> element and <option> elements
  ulElement2 = document.querySelector('#ul_for_buttons02');

    const request = new XMLHttpRequest();


        chooseByTableName="game_mode_option";
        let url="/get_data_by_variable";
    
            // Set request parameters
            var params = {
              param0: chooseByTableName,    
              param1: "",
              param2: "",
              param3: "",
              param4: "ASC",
              param5: buttonSortBy,
              param6: "", //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
              param7: "load_data_game_mode_list()",
              param8: "",  //limit how ,much rows gevin
              param9: "",  //from page 0-10 10-20 20-30 ...
              };
            
              // Convert parameters to query string
              var queryString = Object.keys(params)
              .map((key) => key + "=" + encodeURIComponent(params[key]))
              .join("&");
            
              // Append query string to the URL
              url += "?" + queryString;
            
              request.open(`get`,url);



    list_game_types.ID=[]; 
    list_game_types.GAME_TYPE=[];
    list_game_types.GAME_NAME=[];          

    request.onreadystatechange = () => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            const results = JSON.parse(request.responseText);

            results.forEach(result => {
                list_game_types.ID.push(result.ID);
                list_game_types.GAME_TYPE.push(result.GAME_MODE);
                list_game_types.GAME_NAME.push(result.GAME_NAME);
            });
           //makingSortButtonsGameModes();
          // removeDuplicateNames(list_game_types1);
        }
    };
    
    
    request.send();

}

function load_data_game_map_list()
{


  console.log("function:load_data_game_map_list");

  game_map=document.querySelector('#game_map_data');

   // Step 1: Create the <select> element and <option> elements
  ulElement3 = document.querySelector('#ul_for_buttons03');

    const request = new XMLHttpRequest();

    let url="/get_data_by_variable";
    
    chooseByTableName="game_map_option";
    // Set request parameters
    var params = {
      param0: chooseByTableName,    
      param1: "",
      param2: "",
      param3: "",
      param4: "DESC",
      param5: "GAME_MAP_BOLD",
      param6: "", //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
      param7: "load_data_game_map_list()",
      param8: "",  //limit how ,much rows gevin
      param9: "",  //from page 0-10 10-20 20-30 ...
      };
    
      // Convert parameters to query string
      var queryString = Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
    
      // Append query string to the URL
      url += "?" + queryString;
    
      request.open(`get`,url);

    list_game_maps.ID=[];
    list_game_maps.GAME_MAP=[];
    list_game_maps.GAME_NAME=[];
    list_game_maps.GAME_MODE=[];
    list_game_maps.MAP_BOLD=[];

    request.onreadystatechange = () => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            const results = JSON.parse(request.responseText);

            results.forEach(result => {
              list_game_maps.ID.push(result.ID);
              list_game_maps.GAME_MAP.push(result.GAME_MAP);
              list_game_maps.GAME_NAME.push(result.GAME_NAME);
              list_game_maps.GAME_MODE.push(result.GAME_MODE);
              list_game_maps.MAP_BOLD.push(result.GAME_MAP_BOLD);
            });
          // makingSortButtonsGameMaps();
        }
    };

    console.log(list_game_maps);

    request.send();

}


function makingSortButtonsGameModes(game_name){
  console.log("function makingSortButtonsGameModes:");
  
  //ulElement2.innerHTML='<li>GameMode:</li>';
  ulElement2.innerHTML='';

  for(let i=0;i<list_game_types.ID.length;i++){

    if(game_name!=list_game_types.GAME_NAME[i]) continue;

    let liElement = document.createElement("li");

    // Step 3: Create a new <button> element
    let buttonElement = document.createElement("button");

   // let_button_list.ID.push("button_game_name:"+list_game_names.GAME_NAME[i]);

    buttonElement.id="button_game_mode:"+list_game_types.GAME_TYPE[i];

   // let_button_list.BUTTON_PRESSED[let_button_list.ID.length-1]=false;

    buttonElement.className="";

    buttonElement.setAttribute("onclick",`sortByGameMode('${list_game_types.GAME_TYPE[i]}','${list_game_types.GAME_NAME[i]}','${let_button_list.ID.length-1}')`);
  

    buttonElement.textContent =list_game_types.GAME_TYPE[i];

    // Step 4: Append the <button> element to the <li> element
    liElement.appendChild(buttonElement);

    // Step 5: Append the <li> element to the <ul> element
    ulElement2.appendChild(liElement);

    console.log(i);
  }
}

function makingSortButtonsGameNames(){

  
  console.log("function makingSortButtonsGameNames:");

  for(let i=0;i<list_game_names.ID.length;i++){
    let liElement = document.createElement("li");

    // Step 3: Create a new <button> element
    let buttonElement = document.createElement("button");

    
//let_button_list.ID.push("button_game_name:"+list_game_names.GAME_NAME[i]);

   // buttonElement.id=let_button_list.ID[let_button_list.ID.length-1];

   buttonElement.id="button_game_name:"+list_game_names.GAME_NAME[i];

   // let_button_list.BUTTON_PRESSED[let_button_list.ID.length-1]=false;
    

    buttonElement.className="";

    buttonElement.setAttribute("onclick",`sortByGameName('${list_game_names.GAME_NAME[i]}','${let_button_list.ID.length-1}')`);
  

    buttonElement.textContent =list_game_names.GAME_NAME[i];

    // Step 4: Append the <button> element to the <li> element
    liElement.appendChild(buttonElement);

    // Step 5: Append the <li> element to the <ul> element
    ulElement1.appendChild(liElement);
  }
}

function makingSortButtonsGameMaps(game_name){
  console.log("function makingSortButtonsGameMaps:");

  //ulElement3.innerHTML='<li>GameMap:</li>';
  ulElement3.innerHTML='';
  

  for(let i=0;i<list_game_maps.ID.length;i++){

    if(game_name!=list_game_maps.GAME_NAME[i]) continue;

    let liElement = document.createElement("li");

    // Step 3: Create a new <button> element
    let buttonElement = document.createElement("button");

    
    if(list_game_maps.MAP_BOLD[i]==1){
      buttonElement.style.fontWeight = "bold";
    }

    buttonElement.id="button_game_map:"+list_game_maps.GAME_MAP[i];


    buttonElement.className="";
    
    buttonElement.setAttribute("onclick",`sortByGameMap('${list_game_maps.GAME_MAP[i]}','${game_name}','${let_button_list.ID.length-1}')`);
  

    buttonElement.textContent =list_game_maps.GAME_MAP[i];

    
    // Step 4: Append the <button> element to the <li> element
    liElement.appendChild(buttonElement);

    // Step 5: Append the <li> element to the <ul> element
    ulElement3.appendChild(liElement);
  }
}

function makingSortButtonsGameMapsByMode(game_name,game_mode){
  console.log("function makingSortButtonsGameMaps:");

  ulElement3.innerHTML='';

  for(let i=0;i<list_game_maps.ID.length;i++){

    if(game_name!=list_game_maps.GAME_NAME[i]) continue;

    if(game_mode!=list_game_maps.GAME_MODE[i]) continue;

    let liElement = document.createElement("li");

    // Step 3: Create a new <button> element
    let buttonElement = document.createElement("button");

    if(list_game_maps.MAP_BOLD[i]==1){
      buttonElement.style.fontWeight = "bold";
    }

    buttonElement.id="button_game_map:"+list_game_maps.GAME_MAP[i];

    buttonElement.className="";
    
    buttonElement.setAttribute("onclick",`sortByGameMap('${list_game_maps.GAME_MAP[i]}','${game_name}','${let_button_list.ID.length-1}')`);
  

    buttonElement.textContent =list_game_maps.GAME_MAP[i];

    // Step 4: Append the <button> element to the <li> element
    liElement.appendChild(buttonElement);
    

    // Step 5: Append the <li> element to the <ul> element
    ulElement3.appendChild(liElement);
  }
}

 function myFunctionAsync(){
  load_data_game_name_list();
  load_data_game_mode_list();
  load_data_game_map_list();
  //makingSortButtonsGameNames();
  //makingSortButtonsGameModes();
}


function searchAndEnterByGroupNumber(number){

  console.log("function searchAndEnterByGroupNumber(number)");
  let button_id_by_group_num=document.getElementById("group_num:"+number);

  stayPressedButton(button_id_by_group_num);
  stayPressedButton(last_button_id_by_group_num);
  last_button_id_by_group_num=button_id_by_group_num;

  let group_number_elemnet=document.getElementById("group_number_data");
  group_number_elemnet.textContent=number;

    buttonGroupNumber=number;
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
  
  
    let url="/get_data_by_variable";
    
    let tmp_game_name=game_name;
    let tmp_game_mode=game_mode;
    let tmp_game_map=game_map;

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

    let groupNumber=buttonGroupNumber;

    if(groupNumber!=""){
      groupNumber="GROUP_NUMBER="+groupNumber;
    }

    console.log("groupNumber:"+groupNumber);

    chooseByTableName="warzone2_mw2_stats";
    // Set request parameters
    var params = {
    param0: chooseByTableName,    
    param1: game_name,
    param2: game_mode,
    param3: game_map,
    param4: buttonOrderBy,
    param5: buttonSortBy,
    param6: groupNumber, //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
    param7: "searchAndEnterByGroupNumber()",
    param8: "",  //limit how ,much rows gevin
    param9: "",  //from page 0-10 10-20 20-30 ...
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
                <td contenteditable id="game_name_data">`+tmp_game_name+`</td>
                <td contenteditable id="game_mode_data">`+tmp_game_mode+`</td>
                <td contenteditable id="place_data"></td>
                <td contenteditable id="kills_data"></td>
                <td contenteditable id="death_data"></td>
                <td contenteditable='true' id="kd_data"></td>
                <td contenteditable id="date_data">`+onPageLoad()+`</td>
                <td contenteditable id="current_rank_data"></td>
                <td contenteditable id="number_redeploys_data"></td>
                <td contenteditable id="map_data">`+tmp_game_map+`</td>
                <td contenteditable id="group_number_data">`+number+`</td>
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

  document.addEventListener("DOMContentLoaded",async function() {
    // Your JavaScript code here
    console.log("DOM is ready!");

    myFunctionAsync();
  });


function koko(){
  console.log("koko");
}


function removeDuplicateNames(list,game_name){

  let uniqueArr = [];

  for (let i = 0; i < list.GAME_MAP.length; i++) {
    
      if (!uniqueArr.includes(list.GAME_MAP[i])){
        uniqueArr.push(list.GAME_MAP[i]);
      }
     else{
      delete list.ID[i];
      delete list.GAME_MAP[i];
      delete list.GAME_NAME[i];
      delete list.GAME_MODE[i];
     }
   
  }

}

function addQuotes(str) {
  return `"${str}"`;
}