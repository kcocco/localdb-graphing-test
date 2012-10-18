var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

function getUrlVars() {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
}

//highcharts
var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'area',
                inverted: true
            },
            title: {
                text: 'Patient Diagnosis Comparison'
            },
            subtitle: {
                style: {
                    position: 'absolute',
                    right: '0px',
                    bottom: '10px'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 10,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF'
            },
            xAxis: {
                categories: [
                    'Tubal factor',	
					'Ovulatory dysfunction',
					'Diminished ovarian reserve',
					'Endometriosis',
					'Uterine factor',
					'Male factor',
					'Other factor',
					'Unknown factor',
					'Multi-Female factors only',
					'Multi-Female & Male factors'
                ]
            },
            yAxis: {
                title: {
                    text: 'Percentage %'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                },
                min: 0
            },
            tooltip: {
                formatter: function() {
                    return ''+
                    this.x +': '+ this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },	
			credits: {
			    enabled: false
			},
            series: [{
                name: 'Clinic Selected',
                data: [4, 8, 14, 7, 4, 14, 8, 11, 14, 16]
            }, {
				/* National Patient Diagnosis
				Tubal factor	7%	
				Ovulatory dysfunction	7%
				Diminished ovarian reserve	15%		
				Endometriosis	4%
				Uterine factor	1%
				Male factor	17%		
				Other factor	7%
				Unknown factor	12%
				Multi-Female factors only	11%
				Multi-Female & Male factors	18%
				*/
                name: 'National Average',
                data: [7, 7, 15, 4, 1, 17, 7, 12, 11, 18]
            }]   
});

/*
var db;

document.addEventListener("deviceready", onDeviceReady, false);
onDeviceReady();

function onDeviceReady() {
	console.log("opening database");
	var shortName = 'IVFdata3';
    var version = '1.0';
    var displayName = 'PhoneGap Demo3';
    var maxSize = 1024 * 1024; // 1MB ... in bytes
    db = window.openDatabase(shortName, version, displayName, maxSize);
	console.log("database opened");
    db.transaction(getEmployee, transaction_error);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function getEmployee(tx) {
	$('#busy').show();
	var sql = "SELECT OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll, FshNDLvBirthsRate1 " +
			  "from IVF " +
			  "where ClinStateCode=:id " +
			  "order by FshNDLvBirthsRate1 DESC";
	tx.executeSql(sql, [id], getEmployee_success);
}

function getEmployee_success(tx, results) {
		$('#busy').hide();
		$('#fullName').text(results.rows.item(0).ClinStateCode);
		
		//highcharts
		var options = {
			    chart: {
				   renderTo: 'container',
		           type: 'bar'
		       },
		       title: {
		           text: 'Percentage of cycles resulting in live births'
		       },
		       subtitle: {
		           text: 'Source: Assisted Reproductive Technology (ART) Report CDC.gov'
		       },
		       xAxis: {
		           categories: [],
		           title: {
		               text: null
		           }
		       },		
		       yAxis: {
			       allowDecimals: false,
		           min: 0,
		           title: {
		               text: 'Success Rate %',
		               align: 'middle',
		               style: {
		                    fontWeight: 'bold'
		                }
		           }
			   },
		       labels: {
		               overflow: 'justify'
		       },
		       tooltip: {
		           formatter: function() {
		               return ''+
		                   this.series.name +': '+ this.y +' %';
		           }
		       },
		       plotOptions: {
		           bar: {
		               dataLabels: {
		                   enabled: true
		               }
		           }
		       },
		       legend: {
				   enabled: false,
		           layout: 'vertical',
		           align: 'right',
		           verticalAlign: 'top',
		           x: -100,
		           y: 100,
		           floating: true,
		           borderWidth: 1,
		           backgroundColor: '#FFFFFF',
		           shadow: true
		       },
		       credits: {
		           enabled: false
		       },
		       series: []
			};
		
		var series = { 
			data: []
		};
		series.name = 'Cycle to Live Birth';
		var len = results.rows.length;
	    for (var i=0; i<len; i++) {
	    	var IVFresults = results.rows.item(i);
			options.xAxis.categories.push(IVFresults.CurrClinNameAll);
			series.data.push(parseFloat(IVFresults.FshNDLvBirthsRate1));
			$('#actionList').append('<li><a href="clinicdetails.html?id=' + employee.OrderID + '"><p class="line1">' + IVFresults.CurrClinNameAll + ' (' + IVFresults.FshNDLvBirthsRate1 + ') </a></p><p class="line2">' + IVFresults.ClinCityCode + '</p></li>');
		}
		options.series.push(series);
		// alert(JSON.stringify(options, null, 4));
		var chart = new Highcharts.Chart(options);
		
		// National Average
		chart.yAxis[0].addPlotLine({
		                value: 41.5,
		                color: 'blue',
		                width: 4,
		                id: 'NationalAvg'
		            });
		
		// State (selected) Average 
					   chart.yAxis[0].addPlotLine({
		               value: 37.5,
		               color: 'green',
		               width: 4,
		               id: 'NationalAvg'
		           });
		
		setTimeout(function(){
			scroll.refresh();
		});
		db = null;
}


	
*/