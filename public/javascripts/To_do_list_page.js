function backToHomePage(){
  window.location.href = '/';
  
}

function addQuotes(str) {
  return `"${str}"`;
}


function load_all(){
  load_all_to_do_list();
  load_all_to_do_list2();
}


function hideGame(game_name){
  
  if(game_name=="MW2"){
  let element_hide=document.getElementById("results");
  element_hide.className="hideME";
  }
  if(game_name=="Warzone2")
  {
    let element_hide=document.getElementById("results2");
    element_hide.className="hideME";
  }
}


function load_all_to_do_list() {
  let results_body1= document.querySelector('#results');
  let url="/get_gun_name_not_used_randomly";
  
  const request = new XMLHttpRequest();

  chooseByTableName="to_do_list_guns";

  buttonGroupNumber="";
  buttonSortBy="ID";

  // Set request parameters
  var params = {
    param0: chooseByTableName,    
    param1: "GUN_USED="+addQuotes(0),
    param2: "",
    param3: "",
    param4: "DESC",
    param5: buttonSortBy,//
    param6: buttonGroupNumber, //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
    param7: "load_all_to_do_list()",
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
  
  let html='';

  request.onreadystatechange = () => {
      if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
      {
          const results = JSON.parse(request.responseText);

          results.forEach(result => {
              html += `
              <div id="Warzone2">Warzone2
              <tr id=`+result.ID+`>
                  <td >`+result.ID+`</td>
                  <td contenteditable>`+result.GUN_NAME+`</td>
                  <td contenteditable><a><img id="guns" src="images/guns/`+result.GUN_NAME+`-3_400x225.jpg"></a></td>
                  <td contenteditable>`+result.GUN_TYPE+`</td>
                  <td contenteditable>`+result.GUN_USED+`</td>
                  <td><button type="button" class="btn btn-primary btn-sm" onclick="updateGunUsed(this, 'dssad', '`+result.ID+`')">Update</button></td>
              </tr>
              </div>
              `;
          });



          results_body1.innerHTML = html;

      }
    };
    request.send();
  }


  function ResetAllGuns(){
    
    if(confirm("Are you sure you want to reset all the Warzone2 guns?"))
    {
        let url = `http://localhost:3000/update_Reset_All_Guns`;
  
        const request = new XMLHttpRequest();


        var params = {  
          param1: "to_do_list_guns",
          param2: "",
          param3: "",
          };

        // Convert parameters to query string
        var queryString = Object.keys(params)
        .map((key) => key + "=" + encodeURIComponent(params[key]))
        .join("&");

        // Append query string to the URL
        url += "?" + queryString;  


        request.open(`POST`, url, true);

        request.send();

        //Send the proper header information along with the request
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request.onreadystatechange = () => {

            if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
            {

                alert('Data Updated');
                load_all_to_do_list();
            }

        };

        request.send();
    }
  }


  function updateGunUsed(element, variable_name, id){
    if(confirm("Are you sure you want to update it?"))
    {
        const gun_used_data = document.getElementById('gun_used_data');


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


        let text_new="";

       
        text_new=`id=`+arrayOfStrings[0];
        text_new+=`&gun_used=`+arrayOfStrings[4];
        text_new+=`&table_name=to_do_list_guns`;
        text_new+=``;
       

        const param=text_new;

        
        const request = new XMLHttpRequest();

        const url = `http://localhost:3000/update_data_gun_used`;
  
        request.open(`POST`, url, true);

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



  function load_all_to_do_list2() {
    let results_body2= document.querySelector('#results2');
    let url="/get_gun_name_not_used_randomly";
    
    const request = new XMLHttpRequest();
  
    chooseByTableName="to_do_list_guns2";
  
    buttonGroupNumber="";
    buttonSortBy="ID";
  
    // Set request parameters
    var params = {
      param0: chooseByTableName,    
      param1: "GUN_USED="+addQuotes(0),
      param2: "",
      param3: "",
      param4: "DESC",
      param5: buttonSortBy,//
      param6: buttonGroupNumber, //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
      param7: "load_all_to_do_list()",
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
    
    let html='';

    request.onreadystatechange = () => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            const results = JSON.parse(request.responseText);
          
            results.forEach(result => {
                html += `
                <div id="MW2">
                <tr id=`+result.ID+`>
                    <td >`+result.ID+`</td>
                    <td contenteditable>`+result.GUN_NAME+`</td>
                    <td contenteditable><a><img id="guns" src="images/guns/`+result.GUN_NAME+`-3_400x225.jpg"></a></td>
                    <td contenteditable>`+result.GUN_TYPE+`</td>
                    <td contenteditable>`+result.GUN_USED+`</td>
                    <td><button type="button" class="btn btn-primary btn-sm" onclick="updateGunUsed2(this, 'dssad', '`+result.ID+`')">Update</button></td>
                </tr>
                </div>
                `;
            });
  
  
  
            results_body2.innerHTML = html;
  
        }
      };
      request.send();
    }
  
  
    function ResetAllGuns2(){
      
      if(confirm("Are you sure you want to reset all the MW2 guns?"))
      {
          let url = `http://localhost:3000/update_Reset_All_Guns`;
  
          const request = new XMLHttpRequest();
  

          var params = {  
            param1: "to_do_list_guns2",
            param2: "",
            param3: "",
            };

          // Convert parameters to query string
          var queryString = Object.keys(params)
          .map((key) => key + "=" + encodeURIComponent(params[key]))
          .join("&");
  
          // Append query string to the URL
          url += "?" + queryString;  

          request.open(`POST`, url, true);

          request.send();
          //Send the proper header information along with the request
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
          request.onreadystatechange = () => {
  
              if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
              {
  
                  alert('Data Updated');
                  load_all_to_do_list2();
              }
  
          };
  
          
      }
    }
  
  
    function updateGunUsed2(element, variable_name, id){
      if(confirm("Are you sure you want to update it?"))
      {
          const gun_used_data = document.getElementById('gun_used_data2');
  
  
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
  
  
          let text_new="";
  
         
          text_new=`id=`+arrayOfStrings[0];
          text_new+=`&gun_used=`+arrayOfStrings[4];
          text_new+=`&table_name=to_do_list_guns2`;
          text_new+=``;
         
  
          const param=text_new;
  
          
          const request = new XMLHttpRequest();
  
          const url = `http://localhost:3000/update_data_gun_used`;
    
          request.open(`POST`, url, true);
  
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
