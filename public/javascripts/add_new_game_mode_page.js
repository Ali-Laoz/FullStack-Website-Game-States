function backToHomePage(){
  window.location.href = '/';
  
}


function load_all_game_mods() {
    results_body1= document.querySelector('#results1');
    console.log("function:load_all_game_mods");
  
    const request = new XMLHttpRequest();
  
    let url="/get_data_by_variable";

          // Set request parameters
      var params = {
      param0: 'game_mode_option',    
      param1: "",
      param2: "",
      param3: "",
      param4: "DESC",
      param5: "",
      param6: "", //""=byall 1=bysolo ,2=byduo,3=bytrio,4=byquad;
      param7: "load_all_game_maps()",
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
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        console.log("get_data");
        const results = JSON.parse(request.responseText);
  
        html += `
          <tr>
            <td></td>
            <td contenteditable id="game_name_data"></td>
            <td contenteditable id="game_type_data"></td>
            <td><button type="button" class="btn btn-success btn-sm" onclick="add_data_new_mode_page()">Add</button></td>
          </tr>
        `;
  
        results.forEach(result => {
          html += `
            <tr id=${result.ID}>
              <td>${result.ID}</td>
              <td contenteditable>${result.GAME_NAME}</td>
              <td contenteditable>${result.GAME_MODE}</td>
              <td><button type="button" class="btn btn-danger btn-sm" onclick="delete_data_new_mode_page(${result.ID})">Remove</button></td>
              <td><button type="button" class="btn btn-primary btn-sm" onclick="update_data_new_mode_page(this, 'dssad', '${result.ID}')">Update</button></td>
            </tr>
          `;
        });
  
        results_body1.innerHTML = html;
      }
    };
  
   
   // request.send();
  }


function add_data_new_mode_page(){

    console.log("function:add_data_new_mode_page");

    let input_game_name = document.getElementById('game_name_data').innerText;
    let input_game_type_name = document.getElementById('game_type_data').innerText;

    console.log("sending game_name:"+input_game_name);
    console.log("sending game_type:"+input_game_type_name);

    const url = `http://localhost:3000/add_new_game_mode?input_game_name=${input_game_name}`+`&input_game_type_name=`+input_game_type_name+``;

    //let param1 = `game_name=`+game_name.innerText+``;

    //const param=param1;
    
    const request = new XMLHttpRequest();

    request.open(`POST`, url, true);

    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.onreadystatechange = () => {

        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            alert("Data Added");

            load_all_game_mods();
        }

    };

    request.send();

}

  function delete_data_new_mode_page(id)
{
    //console.log("function:delete_data");

    if(confirm("Are you sure you want to remove it?"))
    {
        const param = `id=`+id+``;

        const request = new XMLHttpRequest();

        request.open('POST', `/delete_data_new_mode_page`, true);

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request.onreadystatechange = () => {

            if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
            {
                alert('Data Deleted');

                load_all_game_mods();
            }

        };

        request.send(param);
    }
}


function update_data_new_mode_page(element, variable_name, id)
{
    //console.log("function:update_data");

    if(confirm("Are you sure you want to update it?"))
    {

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
        console.log(arrayOfStrings);


        let text_new="";

       
        text_new=`id=`+arrayOfStrings[0];
        text_new+=`&game_name=`+arrayOfStrings[1];
        text_new+=`&game_mode=`+arrayOfStrings[2];
        text_new+=``;
       
        console.log(text_new)

        const param=text_new;

        const url = `http://localhost:3000/update_data_new_mode_page`;

        const request = new XMLHttpRequest();

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