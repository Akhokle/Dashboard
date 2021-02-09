/* global Chart:false */

$(function () {
  'use strict'

  var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  }

  var mode = 'index'
  var intersect = true

  var $salesChart = $('#sales-chart')
  // eslint-disable-next-line no-unused-vars
  var salesChart = new Chart($salesChart, {
    type: 'bar',
    data: {
      labels: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          backgroundColor: '#007bff',
          borderColor: '#007bff',
          data: [1000, 2000, 3000, 2500, 2700, 2500, 3000]
        },
        {
          backgroundColor: '#ced4da',
          borderColor: '#ced4da',
          data: [700, 1700, 2700, 2000, 1800, 1500, 2000]
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: mode,
        intersect: intersect
      },
      hover: {
        mode: mode,
        intersect: intersect
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          // display: false,
          gridLines: {
            display: true,
            lineWidth: '4px',
            color: 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks: $.extend({
            beginAtZero: true,

            // Include a dollar sign in the ticks
            callback: function (value) {
              if (value >= 1000) {
                value /= 1000
                value += 'k'
              }

              return '$' + value
            }
          }, ticksStyle)
        }],
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          ticks: ticksStyle
        }]
      }
    }
  })

  var $visitorsChart = $('#visitors-chart')
  // eslint-disable-next-line no-unused-vars
  var visitorsChart = new Chart($visitorsChart, {
    data: {
      labels: ['18th', '20th', '22nd', '24th', '26th', '28th', '30th'],
      datasets: [{
        type: 'line',
        data: [100, 120, 170, 167, 180, 177, 160],
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        pointBorderColor: '#007bff',
        pointBackgroundColor: '#007bff',
        fill: false
        // pointHoverBackgroundColor: '#007bff',
        // pointHoverBorderColor    : '#007bff'
      },
      {
        type: 'line',
        data: [60, 80, 70, 67, 80, 77, 100],
        backgroundColor: 'tansparent',
        borderColor: '#ced4da',
        pointBorderColor: '#ced4da',
        pointBackgroundColor: '#ced4da',
        fill: false
        // pointHoverBackgroundColor: '#ced4da',
        // pointHoverBorderColor    : '#ced4da'
      }]
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: mode,
        intersect: intersect
      },
      hover: {
        mode: mode,
        intersect: intersect
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          // display: false,
          gridLines: {
            display: true,
            lineWidth: '4px',
            color: 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks: $.extend({
            beginAtZero: true,
            suggestedMax: 200
          }, ticksStyle)
        }],
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          ticks: ticksStyle
        }]
      }
    }
  })
})

var dashboard = (function () {
  var fromYear = [];
  var toYear = [];
  var constTopic = [];
  var constRegion = [];
  var constPestle = [];
  var constSector = [];
  var constCountry = [];
  var jsonData = [];
  var Impact = ['', '', 'green', 'yellow', 'red'];
  var Likelihood = ['', 'green', 'yellow', 'orange', 'red'];
  var Relevance = ['', 'yellow', 'blue', 'red', 'green', 'orange', 'indigo', 'maroon'];

  var activate = function () {
    //$.getJSON("https://www.blackcoffer.info/ops/st/heatmap/assets/data/jsondata.json", function (data) {
    $.getJSON("file:///C:/Users/AMAY%20KHOKLE/Downloads/Dashboard/AdminLTE-master/jsondata.json", function (data) {
      jsonData = data;
      var topic = [];
      var region = [];
      var pestle = [];
      var country = [];
      var sector = [];
      for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i]["end_year"].toString() != "") {
          toYear.push(jsonData[i]["end_year"]);
        }
        if (jsonData[i]["start_year"].toString() != "") {
          fromYear.push(jsonData[i]["start_year"]);
        }
        if (jsonData[i]["topic"].toString() != "") {
          topic.push(jsonData[i]["topic"]);
        }
        if (jsonData[i]["region"].toString() != "") {
          region.push(jsonData[i]["region"]);
        }
        if (jsonData[i]["pestle"].toString() != "") {
          pestle.push(jsonData[i]["pestle"]);
        }
        if (jsonData[i]["country"].toString() != "") {
          country.push(jsonData[i]["country"]);
        }
        if (jsonData[i]["sector"].toString() != "") {
          sector.push(jsonData[i]["sector"]);
        }

      }
      fromYear = uniqueAndSort(fromYear);
      toYear = uniqueAndSort(toYear);
      topic = uniqueAndSort(topic);
      region = uniqueAndSort(region);
      pestle = uniqueAndSort(pestle);
      country = uniqueAndSort(country);
      sector = uniqueAndSort(sector);
      //topic.unshift(""); region.unshift(""); pestle.unshift(""); country.unshift(""); sector.unshift("");
      constTopic = topic;
      constRegion = region;
      constPestle = pestle;
      constCountry = country;
      constSector = sector;

      bindDropdown(fromYear, ".fromYear");
      bindDropdown(toYear, ".toYear");
      bindDropdown(topic, "#topic");
      bindDropdown(region, "#region");
      bindDropdown(pestle, "#pestle");
      bindDropdown(country, "#country");
      bindDropdown(sector, "#sector");
      $('#example55').dataTable({
        "data": jsonData,
        "columns": [
          { data: "sector" },
          { data: "topic" },
          { data: "title" },
          { data: "region" },
          { data: "pestle" },
          { data: "source" }
        ]
      });
      //alert("Success!!");

      loadGraph();

      //data.filter(function (row) {
      //  return row.end_year == "2021"
      //});
    });
  };

  var loadFilteredData = function () {
    var newJsonData = jsonData;

    var fromYear = $("#fromYear").val();
    if (fromYear != "") {
      newJsonData = newJsonData.filter(function (row) {
        return row.start_year.toString() !="";
      });
      newJsonData = newJsonData.filter(function (row) {
        return row.start_year >= parseInt(fromYear);
      });
    }
    var toYear = $("#toYear").val();
    if (toYear != "") {
      newJsonData = newJsonData.filter(function (row) {
        return row.end_year.toString() !="";
      });
      newJsonData = newJsonData.filter(function (row) {
        return row.end_year <= parseInt(toYear);
      });
    }
    var topic = $("#topic").val();
    if (topic != "")
      newJsonData = newJsonData.filter(function (row) {
        return row.topic == topic;
      });

    var region = $("#region").val();
    if (region != "")
      newJsonData = newJsonData.filter(function (row) {
        return row.region == region;
      });

    var pestle = $("#pestle").val();
    if (pestle != "")
      newJsonData = newJsonData.filter(function (row) {
        return row.pestle == pestle;
      });

    var country = $("#country").val();
    if (country != "")
      newJsonData = newJsonData.filter(function (row) {
        return row.country == country;
      });

    var sector = $("#sector").val();
    if (sector != "")
      newJsonData = newJsonData.filter(function (row) {
        return row.sector == sector;
      });
    console.log(newJsonData);
    $("#example55").dataTable().fnDestroy();
    $('#example55').dataTable({
      "data": newJsonData,
      "columns": [
        { data: "sector" },
        { data: "topic" },
        { data: "title" },
        { data: "region" },
        { data: "pestle" },
        { data: "source" }
      ]
    });
  }

  var loadGraph = function () {
    var horizontal = $(".horizontal").val();
    var vertical = $("#vertical").val();
    var measures = $("#measures").val();
    $('#visitors-chart1').remove(); // this is my <canvas> element
    if (vertical == "topic" || vertical == "country")
      $('#graph-container').append('<canvas id="visitors-chart1" height="300"><canvas>');
    else
      $('#graph-container').append('<canvas id="visitors-chart1" height="200"><canvas>');

    $("#colorcode").html("");
    if (measures == "impact")
      $("#colorcode").html(`<span class="mr-2">
                      <i class="fas fa-square text-red"></i> High
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-yellow"></i> Medium
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-green"></i> Low
                    </span>`)
    else if (measures == "likelihood")
      $("#colorcode").html(`<span class="mr-2">
                      <i class="fas fa-square text-red"></i> Business as Usual
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-orange"></i> Probabble
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-yellow"></i> Possible
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-green"></i> Potential
                    </span>`)

    else if (measures == "relevance")
      $("#colorcode").html(`<span class="mr-2">
                      <i class="fas fa-square text-maroon"></i> Growing
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-indigo"></i> Expansionary
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-orange"></i> Established
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-green"></i> Evolving
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-red"></i> Gaining Traction
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-blue"></i> Early stage
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-square text-yellow"></i> Vague
                    </span>`)
    var newJsonData = jsonData;

    var fromYear = $("#fromYearchart").val();
    if (fromYear != "") {
      newJsonData = newJsonData.filter(function (row) {
        return row.start_year.toString() != "";
      });
      newJsonData = newJsonData.filter(function (row) {
        return row.start_year >= parseInt(fromYear);
      });
    }
    var toYear = $("#toYearchart").val();
    if (toYear != "") {
      newJsonData = newJsonData.filter(function (row) {
        return row.end_year.toString() != "";
      });
      newJsonData = newJsonData.filter(function (row) {
        return row.end_year <= parseInt(toYear);
      });
    }

    if (horizontal == "topic" || vertical == "topic")
      newJsonData = newJsonData.filter(function (row) {
        return row.topic != "";
      });
    if (horizontal == "region" || vertical == "region")
      newJsonData = newJsonData.filter(function (row) {
        return row.region != "";
      });
    if (horizontal == "pestle" || vertical == "pestle")
      newJsonData = newJsonData.filter(function (row) {
        return row.pestle != "";
      });
    if (horizontal == "country" || vertical == "country")
      newJsonData = newJsonData.filter(function (row) {
        return row.country != "";
      });
    if (horizontal == "sector" || vertical == "sector")
      newJsonData = newJsonData.filter(function (row) {
        return row.sector != "";
      });
    if (measures == "impact")
      newJsonData = newJsonData.filter(function (row) {
        return row.impact.toString() != "";
      });
    if (measures == "likelihood")
      newJsonData = newJsonData.filter(function (row) {
        return row.likelihood.toString() != "";
      });
    if (measures == "relevance")
      newJsonData = newJsonData.filter(function (row) {
        return row.relevance.toString() != "";
      });

    var chartdata = [];
    var pointBackgroundColor = [];
    for (var i = 0; i < newJsonData.length; i++) {
      var indexOfX = -1;
      var indexOfY = -1;
      if (horizontal == "topic")
        indexOfX = constTopic.indexOf(newJsonData[i][horizontal])
      if (vertical == "topic")
        indexOfY = constTopic.indexOf(newJsonData[i][vertical])
      if (horizontal == "region")
        indexOfX = constRegion.indexOf(newJsonData[i][horizontal])
      if (vertical == "region")
        indexOfY = constRegion.indexOf(newJsonData[i][vertical])
      if (horizontal == "pestle")
        indexOfX = constPestle.indexOf(newJsonData[i][horizontal])
      if (vertical == "pestle")
        indexOfY = constPestle.indexOf(newJsonData[i][vertical])
      if (horizontal == "country")
        indexOfX = constCountry.indexOf(newJsonData[i][horizontal])
      if (vertical == "country")
        indexOfY = constCountry.indexOf(newJsonData[i][vertical])
      if (horizontal == "sector")
        indexOfX = constSector.indexOf(newJsonData[i][horizontal])
      if (vertical == "sector")
        indexOfY = constSector.indexOf(newJsonData[i][vertical])

      if (indexOfX != -1 && indexOfY != -1) {
        chartdata.push({ x: indexOfX, y: indexOfY });
      }

      if (measures == "impact")
        pointBackgroundColor.push(Impact[newJsonData[i][measures]])
      if (measures == "likelihood")
        pointBackgroundColor.push(Likelihood[newJsonData[i][measures]])
      if (measures == "relevance")
        pointBackgroundColor.push(Relevance[newJsonData[i][measures]])
    }

    var ctx = $('#visitors-chart1');//.getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          //labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          pointBackgroundColor: pointBackgroundColor,//['yellow', 'blue', 'red', 'green', 'orange', 'indigo'],
          data: chartdata
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            //type: 'linear',
            //position: 'bottom',
            gridLines: {
              display: false
            },
            ticks: {
              //max: 10,
              //min: 0,
              stepSize: 1,
              callback: function (label, index, labels) {
                if (horizontal == "topic")
                  return constTopic[label];
                else if (horizontal == "region")
                  return constRegion[label];
                else if (horizontal == "pestle")
                  return constPestle[label];
                else if (horizontal == "country")
                  return constCountry[label];
                else if (horizontal == "sector")
                  return constSector[label];
              },
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              //max: 10,
              //min: 0,
              stepSize: 1,
              callback: function (label, index, labels) {
                if (vertical == "topic")
                  return constTopic[label];
                else if (vertical == "region")
                  return constRegion[label];
                else if (vertical == "pestle")
                  return constPestle[label];
                else if (vertical == "country")
                  return constCountry[label];
                else if (vertical == "sector")
                  return constSector[label];
              },
              autoSkip: false
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var labelx = "";
              var labely = "";
              if (horizontal == "topic")
                labelx = constTopic[tooltipItem.xLabel];
              else if (horizontal == "region")
                labelx = constRegion[tooltipItem.xLabel];
              else if (horizontal == "pestle")
                labelx = constPestle[tooltipItem.xLabel];
              else if (horizontal == "country")
                labelx = constCountry[tooltipItem.xLabel];
              else if (horizontal == "sector")
                labelx = constSector[tooltipItem.xLabel];

              if (vertical == "topic")
                labely = constTopic[tooltipItem.yLabel];
              else if (vertical == "region")
                labely = constRegion[tooltipItem.yLabel];
              else if (vertical == "pestle")
                labely = constPestle[tooltipItem.yLabel];
              else if (vertical == "country")
                labely = constCountry[tooltipItem.yLabel];
              else if (vertical == "sector")
                labely = constSector[tooltipItem.yLabel];

              return '(' + labelx + ', ' + labely + ')';
            }
          }
        }
      }
    });
  };

  var getIndexOfData = function (type, typeData) {

  };


  var bindDropdown = function (list, id) {
    $(id).append($("<option></option>").val('').html('All'));
    $.each(list, function (data, value) {
      $(id).append($("<option></option>").val(value).html(value));
    })
  }

  var uniqueAndSort = function (list) {
    var result = [];
    $.each(list, function (i, e) {
      if ($.inArray(e, result) == -1) result.push(e);
    });
    return result.sort(function (a, b) {
      return parseInt(a) - parseInt(b);
    });
  }
  return {
    activate: activate,
    loadFilteredData: loadFilteredData,
    loadGraph: loadGraph
  };
})();

$(document).ready(function () {
  dashboard.activate();
  $("#fromYear").on("change", dashboard.loadFilteredData);
  $("#toYear").on("change", dashboard.loadFilteredData);
  $("#topic").on("change", dashboard.loadFilteredData);
  $("#region").on("change", dashboard.loadFilteredData);
  $("#pestle").on("change", dashboard.loadFilteredData);
  $("#country").on("change", dashboard.loadFilteredData);
  $("#sector").on("change", dashboard.loadFilteredData);


  $(".horizontal").on("change", dashboard.loadGraph);
  $("#vertical").on("change", dashboard.loadGraph);
  $("#measures").on("change", dashboard.loadGraph);
  $("#fromYearchart").on("change", dashboard.loadGraph);
  $("#toYearchart").on("change", dashboard.loadGraph);

});
