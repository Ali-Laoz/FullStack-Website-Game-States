


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}



function onPageLoad() {
  // Code to execute after the page has finished loading
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth(); // Months are zero-indexed add+1 but it will be in onoehr function
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  
  //const paddedDay = padTo2Digits(day);
  //const paddedMonth = padTo2Digits(month);
  //const paddedHours = padTo2Digits(hours);
  //const paddedMinutes = padTo2Digits(minutes);
  //const paddedSeconds = padTo2Digits(seconds);
  
  //const formattedDate = `${paddedDay}/${paddedMonth}/${year} ${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  let formattedDate=MYformatedDate(day,month,year,hours,minutes,seconds);
 // console.log("formattedDate:"+formattedDate);

 //console.log("formattedDate:"+formattedDate);
 return formattedDate;
}

function MYformatedDate(day,month,year,hours,minutes,seconds){
    // Code to execute after the page has finished loading
    //const currentDate = new Date();

    month+=1; // Months are zero-indexed

    const paddedDay = padTo2Digits(day);
    const paddedMonth = padTo2Digits(month);
    const paddedHours = padTo2Digits(hours);
    const paddedMinutes = padTo2Digits(minutes);
    const paddedSeconds = padTo2Digits(seconds);

    
    
    const formattedDate = `${paddedDay}/${paddedMonth}/${year} ${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    
   // console.log("formattedDate:"+formattedDate);

    return formattedDate;
}