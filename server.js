
//imports the Express framework
const express = require('express');
const fs = require('fs');


//import mysql module
const mysql = require('mysql');

//import body-parser module
const bodyParser = require('body-parser');

const moment = require('moment');

//creates an instance of the Express application
const app = express();

// Add middleware for parse incoming request body
app.use(bodyParser.urlencoded({ extended : false }));

// Add middleware for parse incoming data in JSON
app.use(bodyParser.json());

app.use(express.static('public'));

//my moudels
var module1_select=require( "./server_get_select.js" );

//Make MySQL Database Connection
const connection = mysql.createConnection({
	host : 'localhost',
	database : 'myschema',
	user : 'root',
	password : 'aharon80'
});

//Check MySQL Database Connection
connection.connect((error) => {
	if(error){
		console.log("Error form conniction.connect func:"+error)
	}
	console.log('MySQL Database is connected Successfully');
});

//Create Route for Load index.html file
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/index.html");
});


//Create Route for Load add_new_game.html file
app.get("/new_game_page.html", (request, response) => {
	console.log("nevegating to:new_game_page.html")
    response.sendFile(__dirname + "/new_game_page.html");
  }); 


  //Create Route for Load add_new_game.html file
app.get("/add_new_mode_page.html", (request, response) => {
	console.log("nevegating to:add_new_mode_page.html")
    response.sendFile(__dirname + "/add_new_mode_page.html");
  }); 


  //Create Route for Load add_new_game.html file
app.get("/add_new_map_page.html", (request, response) => {
	console.log("nevegating to:add_new_map_page.html")
    response.sendFile(__dirname + "/add_new_map_page.html");
  });
  
  app.get("/to_do_and_stats_page.html", (request, response) => {
	console.log("nevegating to:to_do_and_stats_page.html")
    response.sendFile(__dirname + "/to_do_and_stats_page.html");
  }); 
   



  app.get("/get_gun_name_not_used_randomly", (request, response) => {

	console.log("/get_gun_name_not_used_randomly");

	const table_name=request.query.param0;

	const sql = `SELECT * FROM `+table_name+` where GUN_USED=0 ORDER BY RAND() LIMIT 2`;
  
	connection.query(sql, (error, results) => {
	  if (error) {
		console.error("Error from app.get function:", error);
		response.status(500).send("An error occurred");
	  } else {
		response.send(results);
	  }
	});
  });




  app.get("/get_max_rows_of_table", (request, response) => {

	console.log("/get_max_rows_of_table");

	const table_name=request.query.param0;

	const sql = `SELECT count(*) FROM `+table_name;
  
	connection.query(sql, (error, results) => {
	  if (error) {
		console.error("Error from app.get function:", error);
		response.status(500).send("An error occurred");
	  } else {
		response.send(results);
	  }
	});
  });



  app.get("/get_data_by_variable", (request, response) => {

	//console.log("app.get/get_data_by_game_map");
	const table_name=request.query.param0;
	const game_name=request.query.param1;
	const game_mode=request.query.param2;
	const game_map=request.query.param3;
	const sortby=request.query.param4;
	const orderby=request.query.param5;
	const group_number=request.query.param6;
	const hows_function_send_it=request.query.param7;
	const page_rows=request.query.param8;
	const page_number=request.query.param9;


	console.log("Choosing by table_name:"+table_name);
	console.log("Choosing by Game_name:"+game_name);
	console.log("Choosing by Game_mode:"+game_mode);
	console.log("Choosing by Game_map:"+game_map);
	console.log("Choosing by sortby:"+sortby);
	console.log("Choosing by orderby:"+orderby);
	console.log("Choosing by group_number:"+group_number);
	console.log("Choosing by page_rows:"+page_rows);
	console.log("Choosing by page_number:"+page_number);
	


	const sql=module1_select.selectSQL(table_name,game_name,game_mode,game_map,sortby,orderby,group_number,page_rows,page_number);

	//const sql = `SELECT * FROM warzone2_mw2_stats ORDER BY ID DESC`;
	console.log("SQL Produced:"+sql);
	console.log("From fucntion:"+hows_function_send_it);
	console.log("-----------------------------");
	connection.query(sql, (error, results) => {
	  if (error) {
		console.error("Error from app.get function:", error);
		response.status(500).send("An error occurred");
	  } else {
		response.send(results);
	  }
	});
  });


//Create Route for Insert Data Operation
app.post("/add_data", (request, response) => {

	const game_name = request.body.game_name;

	const game_mode = request.body.game_mode;

	const place = request.body.place;

	const kills = request.body.kills;

	const death = request.body.death;

	const kd = request.body.kd;

	let date1 = request.body.date1;

	const current_rank = request.body.current_rank;

	const number_redeploys = request.body.number_redeploys;

	const map = request.body.map;

	let group_number = request.body.group_number;

	const score = request.body.score;

	const more_to_add = request.body.more_to_add;

	
	const dateTime = moment(date1).format('YYYY-MM-DD HH:mm:ss');
	//moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD HH:mm:ss"]);

	console.log("date:"+dateTime);

	const sql = `
	INSERT INTO warzone2_mw2_stats 
	(GAME_NAME, GAME_MODE, PLACE, KILLS, DEATH,KD, DATE,CURRENT_RANK,NUMBER_REDEPLOYS,GAME_MAP,GROUP_NUMBER,SCORE,MORE_TO_ADD) 
	VALUES ("${game_name}", "${game_mode}", "${place}" , "${kills}", "${death}","${kd}", "${dateTime}", "${current_rank}", "${number_redeploys}", "${map}","${group_number}","${score}","${more_to_add}")
	`;

	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Added'
		  });
		}
	  });

});


//Create Route for Insert Data Operation
app.post("/add_new_game", (request, response) => {

	const game_name = request.query.input_game_name;

	console.log("from api add_new_game:"+game_name);

	if ( !(typeof game_name !== 'undefined' && game_name) )
	{
		response.json({
			message: 'Error to add data'
		  });

		  return;
	}

	const sql = `
	INSERT INTO game_name_option 
	(GAME_NAME) 
	VALUES ("${game_name}")
	`;

	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});

//Create Route for Insert Data Operation
app.post("/add_new_game_mode", (request, response) => {

	const game_name = request.query.input_game_name;
	const game_mode = request.query.input_game_type_name;

	console.log("from api add_new_game:"+game_name);
	console.log("from api add_new_game_mode:"+game_mode);

	if ( !(typeof game_name !== 'undefined' && game_name) )
	{
		response.json({
			message: 'Error to add data'
		  });

		  return;
	}

	const sql = `
	INSERT INTO game_mode_option 
	(GAME_MODE,GAME_NAME) 
	VALUES ("${game_mode}","${game_name}")
	`;

	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});


//Create Route for Insert Data Operation
app.post("/add_new_game_map", (request, response) => {

	const game_name = request.query.input_game_name;
	const game_mode = request.query.input_mode_name;
	const game_map = request.query.input_game_map_name;
	const input_game_map_bold = request.query.input_game_map_bold;

	console.log("from api add_new_game:"+game_name);
	console.log("from api add_new_game_mode:"+game_mode);
	console.log("from api add_new_game_map:"+game_map);

	if ( !(typeof game_name !== 'undefined' && game_name) )
	{
		response.json({
			message: 'Error to add data'
		  });

		  return;
	}

	const sql = `
	INSERT INTO game_map_option 
	(GAME_MAP,GAME_NAME,GAME_MODE,GAME_MAP_BOLD) 
	VALUES ("${game_map}","${game_name}","${game_mode}","${input_game_map_bold}")
	`;

	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});




//Create Route for Update Data Operation
app.post('/update_data', (request, response) => {

	const id = request.body.id;

	const game_name = request.body.game_name;

	const game_mode = request.body.game_mode;

	const place = request.body.place;

	const kills = request.body.kills;

	const death = request.body.death;

	const kd = request.body.kd;

	let date1 = request.body.date;

	const current_rank = request.body.current_rank;

	const number_redeploys = request.body.number_redeploys;

	const map = request.body.map;

	let group_number = request.body.group_number;

	const score = request.body.score;

	const more_to_add = request.body.more_to_add;


	const dateTime = moment(date1).format('YYYY-MM-DD HH:mm:ss');
	
	console.log("id:"+id);
	console.log("game_name:"+game_name);
	console.log("game_mode:"+game_mode);
	console.log("place:"+place);
	console.log("kills:"+kills);
	console.log("death:"+death);
	console.log("death:"+kd);
	console.log("dateTime:"+dateTime);
	console.log("current_rank:"+current_rank);
	console.log("number_redeploys:"+number_redeploys);
	console.log("map:"+map);
	console.log("group_number:"+group_number);
	console.log("score:"+score);
	console.log("more_to_add:"+more_to_add);




	const sql = `
	UPDATE warzone2_mw2_stats SET
	GAME_NAME = "${game_name}", GAME_MODE = "${game_mode}", PLACE = "${place}",
	KILLS = "${kills}", DEATH = "${death}",KD = "${kd}",
	DATE = "${dateTime}", CURRENT_RANK = "${current_rank}", NUMBER_REDEPLOYS = "${number_redeploys}",
	GAME_MAP = "${map}",GROUP_NUMBER = "${group_number}",SCORE = "${score}",MORE_TO_ADD = "${more_to_add}"
	WHERE ID = "${id}"
  `;


	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});


//Create Route for Update Data Operation
app.post('/update_data_new_game_page', (request, response) => {

	const id = request.body.id;

	const game_name = request.body.game_name;

	console.log("id:"+id);
	console.log("game_name:"+game_name);


	const sql = `
	UPDATE game_name_option SET
	GAME_NAME = "${game_name}"
	WHERE ID = "${id}"
  `;


	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});




//Create Route for Update Data Operation
app.post('/update_Reset_All_Guns', (request, response) => {
	const table_name=request.query.param1;
	
	const sql = `
	UPDATE `+table_name+` SET
	GUN_USED = "${0}"
  `;

	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});


//Create Route for Update Data Operation
app.post('/update_data_gun_used', (request, response) => {

	console.log("function:"+"/update_data_gun_used");

	const id = request.body.id;
	const gun_used = request.body.gun_used;
	const table_name=request.body.table_name;

	console.log("id:"+id);
	console.log("gun_used:"+gun_used);


	const sql = `
	UPDATE `+table_name+` SET
	GUN_USED = "${gun_used}"
	WHERE ID = "${id}"
  `;


	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});


//Create Route for Update Data Operation
app.post('/update_data_new_mode_page', (request, response) => {

	const id = request.body.id;

	const game_name = request.body.game_name;
	const game_mode = request.body.game_mode;

	console.log("id:"+id);
	console.log("game_name:"+game_name);
	console.log("game_mode:"+game_mode);


	const sql = `
	UPDATE game_mode_option SET
	GAME_NAME = "${game_name}",GAME_MODE = "${game_mode}"
	WHERE ID = "${id}"
  `;


	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});

//Create Route for Update Data Operation
app.post('/update_data_new_map_page', (request, response) => {

	const id = request.body.id;

	const game_name = request.body.game_name;
	const game_mode = request.body.game_mode;
	const game_map = request.body.game_map;
	const input_game_map_bold = request.body.input_game_map_bold;
	

	console.log("id:"+id);
	console.log("game_name:"+game_name);
	console.log("game_mode:"+game_mode);
	console.log("game_map:"+game_map);


	const sql = `
	UPDATE game_map_option SET
	GAME_MAP = "${game_map}",GAME_NAME = "${game_name}",GAME_MODE = "${game_mode}",GAME_MAP_BOLD = "${input_game_map_bold}"
	WHERE ID = "${id}"
  `;


	connection.query(sql, (error, results) => {
		if (error) {
		  console.error('Error executing query:', error);
		  response.status(500).json({
			message: 'An error occurred while adding data'
		  });
		} else {
		  response.json({
			message: 'Data Updated'
		  });
		}
	  });

});



//Create Route for Delete data operation
app.post("/delete_data", (request, response) => {

	const id = request.body.id;

	const sql = `DELETE FROM warzone2_mw2_stats WHERE id = '${id}'`;

	connection.query(sql, (error, results) => {
		response.json({
			message : 'Data Deleted'
		});
	});

});


//Create Route for Delete data operation
app.post("/delete_data_new_game_page", (request, response) => {

	const id = request.body.id;

	const sql = `DELETE FROM game_name_option WHERE id = '${id}'`;

	connection.query(sql, (error, results) => {
		response.json({
			message : 'Data Deleted'
		});
	});

});


app.post("/delete_data_new_mode_page", (request, response) => {

	const id = request.body.id;

	const sql = `DELETE FROM game_mode_option WHERE id = '${id}'`;

	connection.query(sql, (error, results) => {
		response.json({
			message : 'Data Deleted'
		});
	});

});


//Create Route for Delete data operation
app.post("/delete_data_new_game_map_page", (request, response) => {

	const id = request.body.id;

	const sql = `DELETE FROM game_map_option WHERE id = '${id}'`;

	connection.query(sql, (error, results) => {
		response.json({
			message : 'Data Deleted'
		});
	});

});




app.listen(3000, () => {
	console.log('Server listening on port 3000');
});


