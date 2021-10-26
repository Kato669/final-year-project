function add(){ 
    var table = document.getElementsByTagName('table')[0];
    var rowCount = table.rows.length;
    var cellCount = table.rows[0].cells.length; 
    var row = table.insertRow(rowCount);
    for(var i =0; i <= cellCount; i++){
      var cell = 'cell'+i;
      cell = row.insertCell(i);
      var copycel = document.getElementById('col'+i).innerHTML;
      cell.innerHTML=copycel;
      /*if(i == 3){ 
        var radioinput = document.getElementById('col3').getElementsByTagName('input'); 
        for(var j = 0; j <= radioinput.length; j++) { 
          if(radioinput[j].type == 'radio') { 
            var rownum = rowCount;
            radioinput[j].name = 'gender['+rownum+']';
          }
        }
      }*/
    }
  }


/*start of the delete*/
function deleteRows(){
  var table =document.getElementsByTagName('table')[0];
  var rowCount = table.rows.length;
  if(rowCount > '2'){
    var row = table.deleteRow(rowCount-1);
    rowCount--;
  }
  else{
    alert('There should be atleast one row');
  }
}
/*==============================calculation===============*/
function calculateAmount(val) {
  var nam1,nam2,tot_price;
  nam1 = document.form1.quantity1.value;
  nam2 = document.form1.prices.value;
  tot_price = parseFloat(nam1) * parseFloat(nam2);
  /*display the result*/
  var divobj = document.getElementById('tot_amount');
  divobj.value = tot_price;
}
/*==============================calculation===============*/