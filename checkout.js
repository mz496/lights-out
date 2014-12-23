function RCstr(r,c) {return r.toString()+c.toString();}
function getRC(r,c) {return document.getElementById(RCstr(r,c));}
function getLabel(r,c) {return document.getElementById('L'+RCstr(r,c));}
function toggle(r,c) {getRC(r,c).checked=getRC(r,c).checked==true ? false : true;}
function inRange(r,c,ROWS,COLS) {return r>=1 && c>=1 && r<=ROWS && c<=COLS;}
function flip(r,c) {
  $(getLabel(r,c)).toggleClass('rotate');
  toggle(r,c);
}
function checkWin(ROWS,COLS) {
  for (var r=1; r<=ROWS; r++) {
    for (var c=1; c<=COLS; c++) {
      if (getRC(r,c).checked) return false;
    }
  }
  return true;
}
function flourish(ROWS,COLS) {
  $("#title").html("Congratulations! WIN!");
}

function makeBoard(ROWS,COLS) {
  for (var r=1; r<=ROWS; r++) {
    $('table').append('<tr class="row'+r.toString()+'"></tr>');
    for (var c=1; c<=COLS; c++) {
      $('.row'+r.toString()).append('<td><input type="checkbox" id="'+RCstr(r,c)+'"><label for="'+RCstr(r,c)+'" id="L'+RCstr(r,c)+'"></label></td>');
    }
  }

  function push(R,C) {
    if (inRange(R-1,C,ROWS,COLS)) flip(R-1,C);
    if (inRange(R+1,C,ROWS,COLS)) flip(R+1,C);
    if (inRange(R,C-1,ROWS,COLS)) flip(R,C-1);
    if (inRange(R,C+1,ROWS,COLS)) flip(R,C+1);
    if (checkWin(ROWS,COLS)) flourish(ROWS,COLS);
  };

  for (var r=1; r<=ROWS; r++) {
    for (var c=1; c<=COLS; c++) {
      if (Math.random() < 0.618033989) {
        flip(r,c);
        push(r,c);
        console.log(r.toString()+","+c.toString());
      }
      (function(){
        var R=r;
        var C=c;
        getRC(R,C).onclick = function() {push(R,C)};
      })();
    }
  }
}

$("#sizes").change(function() {
  $("tr").remove();
  $("#title").html("Lights Out");
  makeBoard(this.value,this.value);
});

$(document).ready(function() {makeBoard($("#sizes").val(), $("#sizes").val())});