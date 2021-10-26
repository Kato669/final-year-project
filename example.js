
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function update_total() {
  var total = 0;
  $('.price').each(function(i){
    price = $(this).html().replace("Ugsh","");
    if (!isNaN(price)) total += Number(price);
  });

  //total = roundNumber(total,2);

  $('#subtotal').html(total);
  $('#total').html(total);
  
  update_balance();
}

/*function update_balance() {
  var due = $("#total").html().replace("Ugsh","") - $("#paid").val().replace("Ugsh","");
  due = roundNumber(due,2);
  
  $('.due').html("Ugsh"+due);
}*/

function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace("Ugsh","") * row.find('.qty').val();
  //price = roundNumber(price,0);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html(price);
  
  update_total();
}

function bind() {
  $(".cost").blur(update_price);
  $(".qty").blur(update_price);
}

$(document).ready(function() {

  $('input').click(function(){
    $(this).select();
  });

  //$("#paid").blur(update_balance);
   
  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td class="item-name"><div class="delete-wpr"><select><option selected disabled>which crop do you grow?</option><option value="cassava">cassava</option><option value="sweet potato">sweet potato</option><option value="simsim">simsim</option><option value="groundnuts">groundnuts</option><option value="maize">maize</option><option value="beans">beans</option></select><a class="delete" href="javascript:;" title="Remove row">*</a></div></td><td class="description"><input type="text" ></td><td><input type="text" class="cost" onkeyup="names(this)" placeholder="QUANTITY YOU HAVE"></td><td><input type="text" class="qty" onkeyup="names(this)"></td><td><span class="price">0</span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  bind();
  
  $(".delete").live('click',function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  
  $("#date").val(print_today());
  
});