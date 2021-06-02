// SELECTING USER INPUT
var userInput = d3.select("#selDataset");

// SELECTING BAR CHART TO CREATE IT
var barChart = d3.select("#horizontal-bar-chart");

// INITIAL FUNCTION TO RUN WHEN BROWSER OPENS
function init() {

    // RESET DATA IF ANY
    resetData();

    // READING JSON
    d3.json("samples").then((data => {

        // LOOP THORUGH NAMES TO GIVE AS OPTIONS TO CHOOSE
        data.names.forEach(name => {
            var option = userInput.append("option");
            option.text(name);
        });

        // CREATING VARIABLE WITH THE NAME CHOSEN
        var initId = userInput.property("value")

        // CREATING CHARTS WITH NAME CHOSEN
        createChart(initId);

    }));
};

// RESET DATA FUNCTION TO RESET HTML
function resetData() {
    barChart.html("");
};

// FUNCTION TO GET DATA IN JSON AND START FORMATTING
function createCharts() {
    d3.json("samples.json").then((data) => {
        console.log(data);

        // OTU_IDS
        selectedId = data.samples.filter(subject => subject.id == id)[0];

        // SAMPLE_VALUES
        allSampleValues = data.samples.filter(sample => sample.id == id)[0];
       
        // EMPTY LISTS TO FILL WITH DATA ON EACH LOOP
        var otu_ids = [];
        var otu_labels = [];
        var sample_values = [];

        // ITERATION THROUGH DATA VIA SAMPLE AS KEY
        Object.entries(allSampleValues).forEach(([key, value]) => {

            // CHANGING OBJECT VIA USER INPUT USING 'SWITCH' FUNCTION
            switch (key) {
                case "otu_ids":
                    otu_ids.push(value);
                    break;
                case "otu_labels":
                    otu_labels.push(value);
                    break;
                case "sample_values":
                    sample_values.push(value);
                    break;
                default:
                    break;
            }
        }); // ITERATION AND RETRIEVEMENT OF DATA ENDS

        // DISPLAYING TOP 10 RESULTS USING 'REVERSE' METHOD AND SLICE NOTATION
        var top10otuIDs = otu_ids[0].slice(0, 10).reverse();
        var top10otuLabels = otu_labels[0].slice(0, 10).reverse();
        var top10sampleValues = sample_values[0].slice(0, 10).reverse();

        var allInfoOTUids = top10otuIDs.map(otu_ids => "OTU " + otu_ids);

        // TRACE FOR BAR CHART
        var trace = {
            x: top10sampleValues,
            y: allInfoOTUids,
            text: top10otuLabels,
            type: "bar",
            orientation: "h"
        }

        // TRACE AS DATA
        var data = [trace];

        // LAYOUT FOR PLOT
        var layout = {
            height: 450,
            width: 550,
            title: `TOP OTU's for ID: ${id}`,
            xaxis: 'Sample Values',
            yaxis: "OTU'S found"
        };

        // PLOTTING
        plotly.newPlot("bar", data, layout);
        ////>>>>>>>>>>> CONTINUAR EN MAP FUNCTION LINEA 124 DE LA PAGINA
        //// https://github.com/neha-nayeem/plotly-challenge/blob/master/static/js/app.js
        ///// https://tec.bootcampcontent.com/Tecnologico-de-Monterrey-Coding-Boot-Camp/tdm-mxc-data-pt-12-2020-u-c/-/tree/master/week-15-plotly/homework
        

})};

// OPTION CHANGED FUNCTION
function optionChanged(id) {
    
    // WHEN OPTION IS CHANGED, GETS RE-SETED TO ORIGINAL
    resetData();

    // ONCE RESET IS DONE, CALL CREATE CHART FUNCTION
    createCharts(id);
}

// CALLING INITIAL FUNCTION TO RUN WHEN BROWSER OPENS
init();