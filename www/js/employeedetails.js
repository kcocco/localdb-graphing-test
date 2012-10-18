var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];

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
		           text: 'Success Rate Cycle to Live Birth'
		       },
		       subtitle: {
		           text: 'Source: CDC Data.gov'
		       },
		       xAxis: {
		           categories: [],
		           title: {
		               text: null
		           }
		       },
		       yAxis: {
		           min: 0,
		           title: {
		               text: 'Success Rate %',
		               align: 'high'
		           },
		           labels: {
		               overflow: 'justify'
		           }
		       },
		       tooltip: {
		           formatter: function() {
		               return ''+
		                   this.series.name +': '+ this.y +' millions';
		           }
		       },
		       plotOptions: {
		           bar: {
		               dataLabels: {
		                   enabled: true
		               }
		           }
		       },
		       /* legend: {
		           layout: 'vertical',
		           align: 'right',
		           verticalAlign: 'top',
		           x: -100,
		           y: 100,
		           floating: true,
		           borderWidth: 1,
		           backgroundColor: '#FFFFFF',
		           shadow: true
		       },*/
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
			$('#actionList').append('<li><p class="line1">' + IVFresults.CurrClinNameAll + ' (' + IVFresults.FshNDLvBirthsRate1 + ') </p><p class="line2">' + IVFresults.ClinCityCode + '</p></li>');
		}
		options.series.push(series);
		// alert(JSON.stringify(options, null, 4));
		var chart = new Highcharts.Chart(options);
		setTimeout(function(){
			scroll.refresh();
		});
		db = null;
}

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
	
	
/* function getEmployee_success(tx, results) {
	$('#busy').hide();
	var employee = results.rows.item(0);
	$('#employeePic').attr('src', 'pics/' + employee.picture);
	$('#fullName').text(employee.firstName + ' ' + employee.lastName);
	$('#employeeTitle').text(employee.title);
	$('#city').text(employee.city);
	console.log(employee.officePhone);
	if (employee.managerId>0) {
		$('#actionList').append('<li><a href="employeedetails.html?id=' + employee.managerId + '"><p class="line1">View Manager</p>' +
				'<p class="line2">' + employee.managerFirstName + ' ' + employee.managerLastName + '</p></a></li>');
	}
	if (employee.reportCount>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + employee.id + '"><p class="line1">View Direct Reports</p>' +
				'<p class="line2">' + employee.reportCount + '</p></a></li>');
	}
	if (employee.email) {
		$('#actionList').append('<li><a href="mailto:' + employee.email + '"><p class="line1">Email</p>' +
				'<p class="line2">' + employee.email + '</p><img src="img/mail.png" class="action-icon"/></a></li>');
	}
	if (employee.officePhone) {
		$('#actionList').append('<li><a href="tel:' + employee.officePhone + '"><p class="line1">Call Office</p>' +
				'<p class="line2">' + employee.officePhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
	}
	if (employee.cellPhone) {
		$('#actionList').append('<li><a href="tel:' + employee.cellPhone + '"><p class="line1">Call Cell</p>' +
				'<p class="line2">' + employee.cellPhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
		$('#actionList').append('<li><a href="sms:' + employee.cellPhone + '"><p class="line1">SMS</p>' +
				'<p class="line2">' + employee.cellPhone + '</p><img src="img/sms.png" class="action-icon"/></a></li>');
	}
	setTimeout(function(){
		scroll.refresh();
	});
	db = null;
}
*/

/* function getEmployee(tx) {
	$('#busy').show();
	var sql = "select e.id, e.firstName, e.lastName, e.managerId, e.title, e.department, e.city, e.officePhone, e.cellPhone, " +
				"e.email, e.picture, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
				"from employee e left join employee r on r.managerId = e.id left join employee m on e.managerId = m.id " +
				"where e.id=:id group by e.lastName order by e.lastName, e.firstName";
	tx.executeSql(sql, [id], getEmployee_success);
}
*/

