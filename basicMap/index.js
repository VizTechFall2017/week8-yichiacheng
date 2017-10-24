var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var marginLeft = 100;
var marginTop = 100;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');


//import the data from the .csv file
d3.json('./cb_2016_us_state_20m.json', function(dataIn){
    console.log(dataIn);



  });



