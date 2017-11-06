var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var marginLeft = 0;
var marginTop = 0;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

//set up the projection for the map
var albersProjection = d3.geoAlbers()  //tell it which projection to use
    .scale(190000)//tell it how big the map should be
    .rotate([71.057, 0])
    .center([0, 42.313])
    .translate([(width/2), (height/2)]);  //set the center of the map to show up in the center of the screen

//set up the path generator function to draw the map outlines
path = d3.geoPath()
    .projection(albersProjection);        //tell it to use the projection that we just made to convert lat/long to pixels



var stateLookup = d3.map(); //check library(lookup table) to get information>connection name and value
var colorScale = d3.scaleLinear().range(['white','red']);

queue()
    .defer(d3.json, "./Boston_Neighborhoods.json")
    .defer(d3.csv, "./brent2017.csv")
    .await(function(err, mapData, rentData){


        rentData.forEach(function(d){
            stateLookup.set(d.neighborhood, d.rent);//set: what this library's entry should be
        });


        colorScale.domain([0, d3.max(rentData.map(function(d){return +d.rent}))]);//set color scale to match pop data and reflect on map

        svg.selectAll("path")               //make empty selection
            .data(mapData.features)          //bind to the features array in the map data
            .enter()
            .append("path")                 //add the paths to the DOM
            .attr("d", path)                //actually draw them
            .attr("class", "feature")
            .attr('fill',function(d){
                return colorScale(stateLookup.get(d.properties.neighborhood));//fill in the color in scale according the properties of each state data
            })
            .attr('stroke','white')
            .attr('stroke-width',.5);

    });









