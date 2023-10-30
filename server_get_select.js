var a=100;
const mysql = require('mysql');
let elements=[];

function selectSQL(table_name,game_name,game_mode,game_map,sort_by,order_by,group_number,page_rows,page_number){
  let sql="";


  testElementForValue(game_name);
  testElementForValue(game_mode);
  testElementForValue(game_map);
  testElementForValue(group_number);



  //table name
  if(table_name!=""){
    sql=`SELECT * FROM `+table_name+` `;
  }
  else{
    sql=`SELECT * FROM warzone2_mw2_stats `;
  }


  //if there is more then element 1
  if(elements.length>1 )
  {
    sql+=`WHERE `+(elements[0])+` `;
    for(let i=1;i<elements.length;i++){
      sql+=`AND `+(elements[i])+` `;
      
    }
  } //if there is only one element
  else if(elements.length==1)
  {
    sql+=`WHERE `+(elements[0])+` `;
  }

  if(order_by!=""){
    sql+=`ORDER BY `+order_by+` `;
  }
  else{
    sql+=`ORDER BY ID `;
  }

  if(sort_by!=""){
    sql+=sort_by+``;
  }
  else{
    sql+=`DESC `;
  }

  if(page_rows!='' && page_number!='')
  {
    sql+=` LIMIT `+page_rows+` OFFSET `+page_number+``;
  }

  elements=[];  
  return sql;
}

function addQuotes(str) {
  return `"${str}"`;
}

//test if there is value here or empty string
function testElementForValue(element){
  if(element!=""){
    elements.push(element);
  }
}  

function removeQuotes(str) {
  return str.replace(/'/g, '');
}

module.exports = {
  selectSQL: selectSQL
  };