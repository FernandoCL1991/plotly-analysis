// FUNCTION TO GENERATE PLOTS
function getPlots(id) {

    // READING JSON
    d3.json("../samples.json").then (sampledata =>{
        console.log(sampledata)

        // OTU IDS
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)

        // SELECTING INPUT AS THE CHOSEN ID
        var result1 = ids === id[0];

        // SELECTING HTML ELEMENT
        var barPlot = d3.select("#bar");

        // CLEARING OUT PREVIOUS QUERIES
        barPlot.html("");

        // SELECTING INFO TO PLOT IN CHART
        Object.entries(result1).forEach((key) => {
            barPlot.text(key[0].toUpperCase());
        });

        // TOP 10 REVERSED SAMPLE VALUES
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)

        // TOP 10 REVERSED VALUE LABELS
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels)

        // TOP 10 REVERSED OTU IDS
        var OTU_top = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        
        // FORMAT OTU IDS FOR PLOT
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)

        // PRINTING LABEL
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        
        // CREATING TRACE FOR BAR CHART
        var trace1 = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };

        // CREATING DATA VARIABLE FOR BAR CHART
        var data1 = [trace1];
        
        // LAYOUT FOR BAR CHART
        var layout1 = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

    // CREATING BAR CHART
    Plotly.newPlot("bar", data1, layout1);

        // CREATING TRACE FOR BUBBLE CHART
        var trace2 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels
        };

        // LAYOUT FOR BUBBLE CHART
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // CREATING DATA VARIABLE FOR BUBBLE CHART
        var data2 = [trace2];

    // CREATING BUBBLE CHART
    Plotly.newPlot("bubble", data2, layout2);
    });
}

// FUNCTION FOR GAUGE CHART 
function getDemoInfo(id) {

    // READING JSON
    d3.json("../samples.json").then((data)=> {

        // SELECTING OUT METADATA
        var metadata = data.metadata;
        console.log(metadata)
        
        // FILTERING DATA BY ID
        var result2 = metadata.filter(meta => meta.id.toString() === id)[0];

        // SELECTING HTML ELEMENT
        var demographicInfo = d3.select("#sample-metadata");

        // CLEARING OUT PREVIOUS QUERIES
        demographicInfo.html("");

        // SELECTING INFO TO PLOT IN CHART
        Object.entries(result2).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });

        // CALL GAUGE CHART
        showGauge(result2.wfreq);
    });
}

// EVENT CHANGE FUNCTION
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// INITIAL FUNCTION
function init() {
    // select dropdown menu
    var dropdown = d3.select("#selDataset");
    // read the data
    d3.json("../samples.json").then((data)=> {
        console.log(data)
        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

// call the functions to display the data and the plots to the page

getPlots(data.names[0]);
    getDemoInfo(data.names[0]);
    });
};

init();