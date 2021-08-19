let url_call = "";
let host_url = "http://localhost:8080/";
let offset = 0;
$('document').ready(function() {

  /*
    get Data
  */

  url_call = "getData/";

  fetch_data(host_url+url_call+offset);

});

/* Function for displaying the data*/
function display_data(data){

  items = [];
  for (var i = 0; i < data.length; i+=1){
    row = "<tr>";
    for (let k in data[i]){
      row += "<td>"+data[i][k]+"</td>";
    }
    row += "</tr>";
    items.push(row);
  }
  //console.log(items);
  $('#main_table').find('tbody').empty();
  $('<tbody/>', {
    html: items.join('')
  }).appendTo('#main_table');
}

/*Function to get the data by sorting*/
function get_sorted_data(col, ord){
  //console.log("\nSort CALL : "+col+" "+ord);
  url_call = "sort/"+col+"/"+ord+"/";
  fetch_data(host_url+url_call+offset);
}

/*function to fetch the data from server using ajax call*/
function fetch_data(url){
  //console.log(url);
  $.ajax({
    url: url,
    type: 'GET',
    dataType:'json',
    success: function(resp){
      display_data(resp);
    },
    error: function(xhr, option, err){
      console.log(err);
    }
  });
}
