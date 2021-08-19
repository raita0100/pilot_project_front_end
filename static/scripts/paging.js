let total_counts = 0;
let pages = 1;
let curr_page = 1;

$('document').ready(function() {
  //load pages
  get_total_counts();
});

/*Function to initalise the paging tab*/
function init_paging(){
  let content = []

  content.push("<button type='button' class='btn btn-success mr-1' onclick=get_first_page()>First</button>");
  content.push("<button type='button' class='btn btn-success mr-1'>Prev</button>");
  let slide = Math.ceil(curr_page/4);
  let i = Math.max(4*(slide-1), 1);
  let end = Math.max(4*slide, 4);
  while ((i <= end) && (i <= pages)) {
    if (i == curr_page){
      content.push("<button type='button' class='btn btn-light active mr-1'>"+i+"</button>");
    }
    else{
      content.push("<button type='button' class='btn btn-light mr-1'>"+i+"</button>");
    }

    i+=1;
  }
  console.log(i, end, slide, pages);
  content.push("<button type='button' class='btn btn-success mr-1'>next</button>");
  content.push("<button type='button' class='btn btn-success mr-1' onclick='get_last_page()'>last</button>");

  $('#page_items').empty();
  $('<div/>', {
    html: content.join('')
  }).appendTo('#page_items');
}

/* Function to get the total rows of data*/
function get_total_counts(){
  $.ajax({
    url: host_url+"getCounts",
    type: 'GET',
    success: function(resp){
      total_counts = parseInt(resp);
      pages = Math.ceil(total_counts/10);
      console.log("Total Counts : "+total_counts);
      console.log("Total Pages : "+pages);
      init_paging();
    },
    error: function(xhr, option, err){
      console.log(err);
    }
  });
}



/*Function to go to the first */
function get_first_page(){
  console.log('Fetching first page data');
  offset = 0;
  fetch_data(host_url+url_call+offset);
  curr_page = 1;
  init_paging();
}

/*Function to got to lsast page*/
function get_last_page(){
  console.log('Fetching last page data');
  offset = Math.floor(total_counts/10)*10;
  fetch_data(host_url+url_call+offset);
  curr_page = pages;
  init_paging();
}
