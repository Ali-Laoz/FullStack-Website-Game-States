function backToHomePage(){
  window.location.href = '/';
  
}


function To_do_list(){
  console.log("function To_do_list");
  const request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        window.location.href = '/to_do_and_stats_page.html';
      } else {
        console.error('Error: Request failed');
      }
    }
  };

  request.open('GET', '/to_do_and_stats_page.html');
  request.send(null);
  //load_all_game_names1();
}


function add_new_game_page() {
    console.log("function func");
    const request = new XMLHttpRequest();
  
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          window.location.href = '/new_game_page.html';
        } else {
          console.error('Error: Request failed');
        }
      }
    };
  
    request.open('GET', '/new_game_page.html');
    request.send(null);
    load_all_game_names1();
  }



  function add_new_mode_page() {
    console.log("function add_new_mode_page");
    const request = new XMLHttpRequest();
  
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          window.location.href = '/add_new_mode_page.html';
        } else {
          console.error('Error: Request failed');
        }
      }
    };
  
    request.open('GET', '/add_new_mode_page.html');
    request.send(null);
    load_all_game_mods();
  }



  function add_new_map_page() {
    console.log("function func");
    const request = new XMLHttpRequest();
  
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          window.location.href = '/add_new_map_page.html';
        } else {
          console.error('Error: Request failed');
        }
      }
    };
  
    request.open('GET', '/add_new_map_page.html');
    request.send(null);
    load_all_game_maps();
  }

