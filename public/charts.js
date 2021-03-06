let counties;
let bagsArray;
let profilesArray;
let teamsArray;
let labelsArray;


function makeChart() {

    chartDiv = document.getElementsByClassName('chart')[0]
    console.log(chartDiv.childNodes)
    if (chartDiv.childNodes.length > 1)  {
    while (chartDiv.firstChild) {
        
            chartDiv.removeChild(chartDiv.firstChild)
        }
    }

        chartDiv.innerHTML = '<canvas id="barChart"></canvas>'

        let ctx = document.getElementById("barChart").getContext("2d");
        let data = {
            labels: labelsArray,
            datasets: [
                {
                    label: "Bags",
                    backgroundColor: "#006f3b",
                    data: bagsArray
                },
                {
                    label: "Users",
                    backgroundColor: "#70A3AB",
                    data: profilesArray
                },
                {
                    label: "Teams",
                    backgroundColor: "#D8D036",
                    data: teamsArray
                }
            ]
        };
        

        counties = vermont.counties
        bagsArray = data.datasets[0].data;
        profilesArray = data.datasets[1].data;
        teamsArray = data.datasets[2].data;
        labelsArray = data.labels;

        if (level === 'state') {
            console.log(vermont.counties)
             data.datasets[0].data =[];
             data.datasets[1].data =[];
             data.datasets[2].data =[];
             data.labels = [];
            for (let county in vermont.counties) {
                data.datasets[0].data.push(vermont.counties[county].stats.bagCount);
                data.datasets[1].data.push(vermont.counties[county].stats.userActivity);
                data.datasets[2].data.push(vermont.counties[county].stats.totalTeams);
                data.labels.push(vermont.counties[county].name.replace(/\b\w/g, c => c.toUpperCase()));
            }
        }


        else if (level === 'county') {
            data.datasets[0].data =[];
            data.datasets[1].data =[];
            data.datasets[2].data =[];
            data.labels = [];
            let countyForGraph = vermont.countyNumber(currentCounty)
            for (let town in countyForGraph.towns) {
                data.datasets[0].data.push(countyForGraph.towns[town].stats.bagCount);
                data.datasets[1].data.push(countyForGraph.towns[town].stats.userActivity);
                data.datasets[2].data.push(countyForGraph.towns[town].stats.totalTeams);
                data.labels.push(countyForGraph.towns[town].name.replace(/\b\w/g, c => c.toUpperCase()));

            }
        } else if (level === 'town') {
            data.datasets[0].data =[];
            data.datasets[1].data =[];
            data.datasets[2].data =[];
            data.labels = [];

                data.datasets[0].data.push(currentTown.stats.bagCount);
                data.datasets[1].data.push(currentTown.stats.userActivity);
                data.datasets[2].data.push(currentTown.stats.totalTeams);
                data.labels.push(currentTown.name.replace(/\b\w/g, c => c.toUpperCase()));


        }

            var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                barValueSpacing: 20,
                legend: {
                    labels: {
                        boxWidth: 100,
                        fontColor: 'grey',
                        fontSize: 18,
                        padding: 15,
                        
                scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                }
                            }]
                        }
                        
                    }
                }
            }
        });
    
}