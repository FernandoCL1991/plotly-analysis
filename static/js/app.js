// Bar Chart for top 10 OTU's //

// Helper function 
// @param {array} rows
// @param {integer} index

// Unpack function
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
};

// Data Promise
const dataPromise = d3.json("samples.json");
console.log("Data Promise: ", dataPromise);


sample_values = [];
otu_ids = [];
otu_labels = [];

// Chart variables
const samplesData = () => dataPromise = d3.json("samples.json");
    console.log(dataPromise);
    dataPromise.then(
        (data) => {

            sample_values = [];

            // sample_values Listo!!!!
            const sample_values = Object.samples.sample_values;
            // var sample_values = data.samples.sample_values;
            //console.log(sample_values);

            // otu_ids Listo!!!!!
            const otu_ids = Object.values(samples.otu_ids);
            //console.log(otu_ids);

            // otu_labels REVISAR....
            // var otu_labels = data.samples
            const otu_labels = Object.values(samples.otu_labels);
            // unpack(data.samples,otu_labels,0)
            //console.log(otu_labels);

            const trace = [{
                type: "bar",
                orientation: "h",
                name: otu_labels,
                x: sample_values,
                y: otu_ids,
            }]

            const layout = {
                title: `TOP 10 OTU'S`,
                xaxis: {
                    range: [sample_values]
                },
                yaxis: {
                    autorange: true,
                    type: 'linear'
                }
            }
        Plotly.newPlot("plot", trace, layout)
});
samplesData();








// var data = [sampleValues];

// let chart = d3.select("#horizontal-bar-chart").node();
// Plotly.newPlot(chart, data);

// // Creating trace
// var trace1 = {
//     x: samples.map(row => row.sample_values[0]),
//     y: samples.map(row => row.otu_ids[0]),
//     text: samples.map(row => row.otu_labels[0]),
//     name: "OTU",
//     type: "bar"
// };
// var traceData = [trace1];
// // Creating layout
// var layout = {
//     title: "Top 10 OTU's",
// };
// // Creating plot
// Plotly.newPlot("bar", traceData, layout);