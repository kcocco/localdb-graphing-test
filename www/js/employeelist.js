//alert("employeelist.js running");

var db;
var dbCreated = false;

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

document.addEventListener("deviceready", onDeviceReady, false);
onDeviceReady();

function onDeviceReady() {
    try {
	    if (!window.openDatabase) {
	        alert('window.openDatabase - not supported');
	    } else {
	        var shortName = 'IVFdata';
	        var version = '1.0';
	        var displayName = 'PhoneGap Demo';
	        var maxSize = 1024 * 1024; // 1MB ... in bytes
			// Note var db at head of code
	        db = window.openDatabase(shortName, version, displayName, maxSize);
			//alert(db); // You should have a database instance in db.
			db.transaction(populateDB, transaction_error, populateDB_success);
	    }
	} catch(e) {
	    // Error handling code goes here.
	    if (e == 2) {
	        // Version number mismatch.
	        alert("Invalid database version.");
	    } else {
	        alert("Unknown error "+e+".");
	    }
	    return;
	}

	if (dbCreated)
    	db.transaction(getEmployees, transaction_error);
    else
		//alert("dbCreated false call pop db");
		db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getEmployees, transaction_error);
}

function getEmployees(tx) {
	//alert("getemployee");
	var sql = "SELECT ClinStateCode, COUNT( ClinStateCode ) As StateCount " + 
			  "FROM IVF " +
			  "GROUP BY ClinStateCode";
	tx.executeSql(sql, [], getEmployees_success);
}

function getEmployees_success(tx, results) {
	//alert("get emp success");	
	
	$('#busy').hide();
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var IVFresults = results.rows.item(i);
		$('#employeeList').append('<li><a href="employeedetails.html?id=' + IVFresults.ClinStateCode + '">' +
				'<p class="line1">' + IVFresults.ClinStateCode + '</p>' +
				'<span class="bubble">' + IVFresults.StateCount + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

function populateDB(tx) {
	$('#busy').show();
	    tx.executeSql('DROP TABLE IF EXISTS IVF');
	    tx.executeSql('CREATE TABLE IF NOT EXISTS IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1)');	    
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (1,"ALABAMA","BIRMINGHAM","Alabama Fertility Specialists","28.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (2,"ALABAMA","BIRMINGHAM","ART Fertility Program of Alabama","32.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (3,"ALABAMA","BIRMINGHAM","University of Alabama at Birmingham","4 / 18")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (4,"ALABAMA","HUNTSVILLE","Huntsville Reproductive Medicine  PC","45.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (5,"ALABAMA","MOBILE","Center for Reproductive Medicine","46.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (6,"ALABAMA","MOBILE","University of South Alabama IVF and ART Program","8 / 16")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (7,"ALASKA","SOLDOTNA","Peninsula Medical Center  John Nels Anderson  MD","21.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (8,"ARIZONA","GLENDALE","Troché Fertility Centers","52.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (9,"ARIZONA","PHOENIX","Arizona Reproductive Medicine Specialists","31.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (10,"ARIZONA","PHOENIX","Southwest Fertility Center","29.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (11,"ARIZONA","SCOTTSDALE","Advanced Fertility Care  PLLC","52.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (12,"ARIZONA","SCOTTSDALE","Arizona Associates for Reproductive Health","48.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (13,"ARIZONA","SCOTTSDALE","Arizona Center for Fertility Studies","6 / 18")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (14,"ARIZONA","SCOTTSDALE","IVF Phoenix","5 / 11")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (15,"ARIZONA","TEMPE","Fertility Treatment Center","34.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (16,"ARIZONA","TUCSON","Arizona Center for Reproductive Endocrinology and Infertility","41.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (17,"ARIZONA","TUCSON","Reproductive Health Center","33.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (18,"ARKANSAS","LITTLE ROCK","Arkansas Fertility Center  Little Rock Fertility Center","44.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (19,"CALIFORNIA","AGOURA HILLS","LifeStart Fertility Center","5 / 8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (20,"CALIFORNIA","BERKELEY","Alta Bates In Vitro Fertilization Program","4 / 11")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (21,"CALIFORNIA","BEVERLY HILLS","California Center for Reproductive Health  Beverly Hills Reproductive Fertility Center","50.0")');
	}
	/*
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (22,"CALIFORNIA","BEVERLY HILLS","Center for Reproductive Health & Gynecology  (CRH&G)","61.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (23,"CALIFORNIA","BEVERLY HILLS","Southern California Reproductive Center","50.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (24,"CALIFORNIA","BEVERLY HILLS","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.",null)');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (25,"CALIFORNIA","BREA","Fertility Care of Orange County","44.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (26,"CALIFORNIA","CLOVIS","Central California IVF Program  Women s Specialty and Fertility Center","30.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (27,"CALIFORNIA","DAVIS","California IVF: Davis Fertility Center  Inc.","32.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (28,"CALIFORNIA","ENCINO","The Fertility Institutes  Los Angeles  New York  Guadalajara","58.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (29,"CALIFORNIA","ENCINO","HRC Fertility-Encino","57.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (30,"CALIFORNIA","FOSTER CITY","Zouves Fertility Center","32.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (31,"CALIFORNIA","FOUNTAIN VALLEY","West Coast Fertility Centers","46.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (32,"CALIFORNIA","FOUNTAIN VALLEY","Xpert Fertility Care of California  Minh N. Ho  MD  FACOG","2 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (33,"CALIFORNIA","FREMONT","Kaiser Permanente Center for Reproductive Health","40.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (34,"CALIFORNIA","GLENDALE","Kathleen Kornafel  MD  PhD","1 / 5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (35,"CALIFORNIA","IRVINE","Coastal Fertility Medical Center  Inc.","32.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (36,"CALIFORNIA","IRVINE","Fertility Center of Southern California","52.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (37,"CALIFORNIA","IRVINE","Reproductive Fertility Center-OC","48.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (38,"CALIFORNIA","LA JOLLA","Reproductive Partners-UCSD Regional Fertility Center","55.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (39,"CALIFORNIA","LA JOLLA","Reproductive Sciences Center","5 / 18")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (40,"CALIFORNIA","LAGUNA HILLS","HRC Fertility-Orange County","56.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (41,"CALIFORNIA","LAGUNA NIGUEL","Acacio Fertility Center","34.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (42,"CALIFORNIA","LOMA LINDA","Loma Linda University Center for Fertility and IVF","39.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (43,"CALIFORNIA","LOS ANGELES","California Fertility Partners","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (44,"CALIFORNIA","LOS ANGELES","Cedars Sinai Medical Center  Center for Fertility and Reproductive Medicine","3 / 15")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (45,"CALIFORNIA","LOS ANGELES","CHA Fertility Center","41.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (46,"CALIFORNIA","LOS ANGELES","Pacific Fertility Center-Los Angeles","45.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (47,"CALIFORNIA","LOS ANGELES","UCLA Fertility Center","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (48,"CALIFORNIA","LOS ANGELES","USC Reproductive Endocrinology and Infertility","46.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (49,"CALIFORNIA","MONTEREY","The Fertility and Gynecology Center  Monterey Bay IVF Program","35.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (50,"CALIFORNIA","MOUNTAIN VIEW","Nova In Vitro Fertilization","51.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (51,"CALIFORNIA","NEWPORT BEACH","Reproductive Specialty Medical Center","1 / 17")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (52,"CALIFORNIA","NEWPORT BEACH","Southern California Center for Reproductive Medicine","50.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (53,"CALIFORNIA","ORANGE","IVF-Orange Surgery Center","0 / 4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (54,"CALIFORNIA","PALO ALTO","Stanford University IVF/ART Program  Department of Gynecology and Obstetrics","30.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (55,"CALIFORNIA","PASADENA","HRC-Pasadena","50.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (56,"CALIFORNIA","PORTOLA VALLEY","Palo Alto Medical Foundation  Reproductive Endocrinology & Fertility","21.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (57,"CALIFORNIA","REDONDO BEACH","Reproductive Partners-Redondo Beach","45.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (58,"CALIFORNIA","ROSEVILLE","Northern California Fertility Medical Center","41.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (59,"CALIFORNIA","SACRAMENTO","Kaiser Permanente Center for Reproductive Health-Sacramento","53.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (60,"CALIFORNIA","SAN DIEGO","Fertility Specialists Medical Group","43.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (61,"CALIFORNIA","SAN DIEGO","NTC Infertility Clinic","37.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (62,"CALIFORNIA","SAN DIEGO","San Diego Fertility Center  (SDFC)","40.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (63,"CALIFORNIA","SAN DIMAS","Williams OB/GYN","2 / 4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (64,"CALIFORNIA","SAN FRANCISCO","Laurel Fertility Care","20.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (65,"CALIFORNIA","SAN FRANCISCO","Pacific Fertility Center","34.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (66,"CALIFORNIA","SAN FRANCISCO","UCSF Center for Reproductive Health","36.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (67,"CALIFORNIA","SAN JOSE","Fertility Physicians of Northern California","39.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (68,"CALIFORNIA","SAN LUIS OBISPO","Alex Steinleitner  MD  Inc.","60.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (69,"CALIFORNIA","SAN RAMON","Reproductive Science Center of the San Francisco Bay Area","38.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (70,"CALIFORNIA","SANTA BARBARA","Santa Barbara Fertility Center","4 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (71,"CALIFORNIA","SANTA MONICA","Parker-Rosenman-Rodi Gynecology and Infertility Medical Group","3 / 11")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (72,"CALIFORNIA","SANTA ROSA","Advanced Fertility Associates Medical Group  Inc.","38.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (73,"CALIFORNIA","SHERMAN OAKS","Valley Center for Reproductive Health  Tina Koopersmith  MD","5 / 9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (74,"CALIFORNIA","SOUTH PASADENA","Garfield Fertility Center","7 / 9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (75,"CALIFORNIA","TARZANA","The Center for Fertility and Gynecology  Vermesh Center for Fertility","47.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (76,"CALIFORNIA","TARZANA","Tree of Life Center for Fertility  Snunit Ben-Ozer  MD","4 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (77,"CALIFORNIA","THOUSAND OAKS","Fertility and Surgical Associates of California","41.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (78,"CALIFORNIA","TORRANCE","Pacific Reproductive Center","53.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (79,"CALIFORNIA","TORRANCE","University Fertility Center","28.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (80,"CALIFORNIA","WESTMINSTER","Reproductive Partners-Westminster","54.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (81,"COLORADO","AURORA","Advanced Reproductive Medicine  University of Colorado","44.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (82,"COLORADO","COLORADO SPRINGS","Reproductive Medicine & Fertility Center","28.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (83,"COLORADO","COLORADO SPRINGS","Eric H. Silverstein  MD  Professional LLC dba  The Fertility Center of Colorado","6 / 13")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (84,"COLORADO","DENVER","Colorado Reproductive Endocrinology","23.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (85,"COLORADO","FORT COLLINS","Rocky Mountain Center for Reproductive Medicine","43.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (86,"COLORADO","LITTLETON","Conceptions Reproductive Associates","54.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (87,"COLORADO","LONE TREE","Colorado Center for Reproductive Medicine","68.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (88,"COLORADO","PARKER","Rocky Mountain Fertility Center  PC","44.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (89,"CONNECTICUT","BRIDGEPORT","Connecticut Fertility Associates","34.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (90,"CONNECTICUT","FARMINGTON","The Center for Advanced Reproductive Services at the University of Connecticut Health Center","45.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (91,"CONNECTICUT","GREENWICH","Greenwich Fertility and IVF Center  PC","68.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (92,"CONNECTICUT","NEW HAVEN","Yale Fertility Center","44.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (93,"CONNECTICUT","NORWALK","Reproductive Medicine Associates of Connecticut","53.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (94,"CONNECTICUT","STAMFORD","New England Fertility Institute","40.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (95,"CONNECTICUT","STAMFORD","The Stamford Hospital","1 / 11")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (96,"CONNECTICUT","STAMFORD","Women s Fertility Center  Dr. Nora R. Miller","2 / 8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (97,"CONNECTICUT","TRUMBULL","Park Avenue Fertility and Reproductive Medicine","47.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (98,"DELAWARE","NEWARK","Delaware Institute for Reproductive Medicine  PA","18.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (99,"DELAWARE","NEWARK","Reproductive Associates of Delaware","45.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (100,"DISTRICT OF COLUMBIA","WASHINGTON","The A.R.T. Institute of Washington  Inc.  Walter Reed Army Medical Center","41.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (101,"DISTRICT OF COLUMBIA","WASHINGTON","Columbia Fertility Associates","48.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (102,"DISTRICT OF COLUMBIA","WASHINGTON","The George Washington University Medical Faculty Associates","27.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (103,"DISTRICT OF COLUMBIA","WASHINGTON","James A. Simon  MD  PC",null)');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (104,"FLORIDA","BOCA RATON","BocaFertility","40.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (105,"FLORIDA","BOCA RATON","Palm Beach Fertility Center","46.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (106,"FLORIDA","BOYNTON BEACH","Advanced Reproductive Care Center","1 / 2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (107,"FLORIDA","COOPER CITY","Infertility and Reproductive Medicine of South Broward","40.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (108,"FLORIDA","FORT MYERS","Southwest Florida Fertility Center  PA","30.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (109,"FLORIDA","FORT MYERS","Specialists in Reproductive Medicine and Surgery  PA","26.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (110,"FLORIDA","GAINESVILLE","University of Florida Women s Health at Magnolia Parke","33.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (111,"FLORIDA","JACKSONVILLE","Assisted Fertility Program of North Florida","27.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (112,"FLORIDA","JACKSONVILLE","Brown Fertility Associates","37.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (113,"FLORIDA","JACKSONVILLE","Florida Institute for Reproductive Medicine","45.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (114,"FLORIDA","JACKSONVILLE","Jacksonville Center for Reproductive Medicine","28.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (115,"FLORIDA","LUTZ","Center for Reproductive Medicine","2 / 12")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (116,"FLORIDA","MARGATE","IVF Florida","36.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (117,"FLORIDA","MELBOURNE","Viera Fertility Center  Fertility and Reproductive Medicine Center for Women","30.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (118,"FLORIDA","MIAMI","Fertility & IVF Center of Miami  Inc.","29.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (119,"FLORIDA","MIAMI","University of Miami Infertility Center","29.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (120,"FLORIDA","MIAMI LAKES","Palmetto Fertility Center of South Florida","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (121,"FLORIDA","ORLANDO","Center for Reproductive Medicine  PA","46.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (122,"FLORIDA","ORLANDO","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","2 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (123,"FLORIDA","PENSACOLA","New Leaders in Infertility & Endocrinology  LLC","42.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (124,"FLORIDA","PLANTATION","Fertility & Genetics","47.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (125,"FLORIDA","SARASOTA","Fertility Center and Applied Genetics of Florida  Inc.","43.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (126,"FLORIDA","SOUTH MIAMI","South Florida Institute for Reproductive Medicine","48.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (127,"FLORIDA","TAMPA","Reproductive Health Associates  PA","9.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (128,"FLORIDA","TAMPA","The Reproductive Medicine Group","45.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (129,"FLORIDA","TAMPA","University of South Florida IVF","25.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (130,"FLORIDA","WESTON","F.I.R.S.T.  Florida Institute for Reproductive Sciences and Technologies","2 / 9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (131,"FLORIDA","WINTER PARK","Fertility Center of Assisted Reproduction & Endocrinology","31.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (132,"GEORGIA","ATLANTA","Atlanta Center for Reproductive Medicine","35.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (133,"GEORGIA","ATLANTA","Emory Reproductive Center","70.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (134,"GEORGIA","ATLANTA","Georgia Reproductive Specialists  LLC","50.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (135,"GEORGIA","AUGUSTA","Reproductive Medicine and Infertility Associates","7 / 12")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (136,"GEORGIA","AUGUSTA","Servy Institute for Reproductive Endocrinology","6 / 14")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (137,"GEORGIA","COLUMBUS","Columbus Center for Reproductive Endocrinology and Infertility  LLC","43.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (138,"GEORGIA","MACON","Central Georgia Fertility Institute","2 / 11")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (139,"GEORGIA","SANDY SPRINGS","Reproductive Biology Associates","40.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (140,"GEORGIA","SAVANNAH","The Georgia Center for Reproductive Medicine","69.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (141,"HAWAII","HONOLULU","Advanced Reproductive Center of Hawaii","45.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (142,"HAWAII","HONOLULU","Advanced Reproductive Medicine & Gynecology of Hawaii  Inc.","11 / 19")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (143,"HAWAII","HONOLULU","IVF Hawaii","11 / 18")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (144,"HAWAII","HONOLULU","Pacific In Vitro Fertilization Institute","26.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (145,"HAWAII","TRIPLER AMC","Tripler Army Medical Center IVF Institute","2 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (146,"IDAHO","BOISE","Idaho Center for Reproductive Medicine","34.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (147,"ILLINOIS","AURORA","Rush-Copley Center for Reproductive Health","26.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (148,"ILLINOIS","BERWYN","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","0 / 1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (149,"ILLINOIS","CHICAGO","Martin S. Balin  MD  PhD","2 / 5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (150,"ILLINOIS","CHICAGO","Center for Reproductive Medicine & Fertility  The University of Chicago Medical Center","25.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (151,"ILLINOIS","CHICAGO","Institute for Human Reproduction (IHR)","36.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (152,"ILLINOIS","CHICAGO","Northwestern University","31.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (153,"ILLINOIS","CHICAGO","River North IVF-Fertility Centers of Illinois","37.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (154,"ILLINOIS","CHICAGO","University of Illinois at Chicago IVF Program","25.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (155,"ILLINOIS","CHICAGO","Women s Health Consultants","43.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (156,"ILLINOIS","CREST HILL","Center for Reproductive Health Joliet IVF","28.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (157,"ILLINOIS","DOWNERS GROVE","Midwest Fertility Center","46.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (158,"ILLINOIS","EVANSTON","The Rinehart Center for Reproductive Medicine","28.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (159,"ILLINOIS","EVANSTON","The Rinehart-Coulam Center","4 / 14")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (160,"ILLINOIS","GURNEE","Advanced Fertility Center of Chicago","57.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (161,"ILLINOIS","HANOVER PARK","Chicago Infertility Associates  Ltd.","1 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (162,"ILLINOIS","HIGHLAND PARK","Highland Park IVF Center","38.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (163,"ILLINOIS","HINSDALE","Hinsdale Center for Reproduction","37.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (164,"ILLINOIS","HOFFMAN ESTATES","Reena Jabamoni  MD  SC","27.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (165,"ILLINOIS","HOFFMAN ESTATES","Karande and Associates  SC dba  InVia Fertility Specialists","48.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (166,"ILLINOIS","JOLIET","Reproductive Health Specialists  Ltd.","41.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (167,"ILLINOIS","NAPERVILLE","The Advanced IVF Institute  Charles E. Miller  MD  SC & Associates","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (168,"ILLINOIS","NAPERVILLE","IVF1","32.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (169,"ILLINOIS","OAK BROOK","Oak Brook Fertility Center","45.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (170,"ILLINOIS","ROCKFORD","Reproductive Health and Fertility Center","23.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (171,"ILLINOIS","SKOKIE","North Shore Fertility  SC","18.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (172,"ILLINOIS","SPRINGFIELD","Reproductive Endocrinology Associates  SC","25.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (173,"ILLINOIS","SPRINGFIELD","Southern Illinois University School of Medicine Fertility and IVF Center","70.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (174,"ILLINOIS","TINLEY PARK","Seth Levrant  MD  PC  Partners in Reproductive Health","43.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (175,"INDIANA","CARMEL","American Health Network Reproductive Medicine","45.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (176,"INDIANA","CARMEL","Jarrett Fertility Group","51.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (177,"INDIANA","CARMEL","Midwest Fertility Specialists","36.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (178,"INDIANA","EVANSVILLE","Advanced Reproduction Institute  LLC  Advanced Fertility Group","34.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (179,"INDIANA","INDIANAPOLIS","Advanced Fertility Group","30.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (180,"INDIANA","INDIANAPOLIS","Community Reproductive Endocrinology","70.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (181,"INDIANA","INDIANAPOLIS","Family Beginnings  PC","21.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (182,"INDIANA","INDIANAPOLIS","Indiana University Hospital","3 / 9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (183,"INDIANA","INDIANAPOLIS","Reproductive Care of Indiana","50.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (184,"INDIANA","NOBLESVILLE","Women s Specialty Health Centers  PC","7 / 12")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (185,"IOWA","CLIVE","Mid-Iowa Fertility  PC","50.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (186,"IOWA","IOWA CITY","University of Iowa Hospitals and Clinics  Center for Advanced Reproductive Care","47.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (187,"KANSAS","OLATHE","Midwest Reproductive Center  PA","45.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (188,"KANSAS","OVERLAND PARK","Center for Advanced Reproductive Medicine","30.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (189,"KANSAS","OVERLAND PARK","Reproductive Resource Center of Greater Kansas City","40.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (190,"KANSAS","SHAWNEE MISSION","Reproductive Medicine & Infertility  Shawnee Mission Medical Center","31.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (191,"KANSAS","WICHITA","The Center for Reproductive Medicine","38.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (192,"KENTUCKY","LEXINGTON","Bluegrass Fertility Center","37.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (193,"KENTUCKY","LEXINGTON","University of Kentucky","0 / 6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (194,"KENTUCKY","LOUISVILLE","Fertility and Endocrine Associates  Louisville Reproductive Center","41.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (195,"KENTUCKY","LOUISVILLE","University Women s HealthCare Fertility Center","51.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (196,"LOUISIANA","BATON ROUGE","A Woman s Center for Reproductive Medicine","40.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (197,"LOUISIANA","LAFAYETTE","Fertility and Women s Health Center of Louisiana","43.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (198,"LOUISIANA","METAIRIE","The Fertility Institute of New Orleans","48.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (199,"LOUISIANA","SHREVEPORT","Center for Fertility and Reproductive Health","48.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (200,"MARYLAND","BALTIMORE","Center for ART at Union Memorial Hospital","17.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (201,"MARYLAND","BALTIMORE","Fertility Center of Maryland","39.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (202,"MARYLAND","BALTIMORE","Shady Grove Fertility RSC at GBMC","51.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (203,"MARYLAND","LUTHERVILLE","Endrika Hinton  MD","2 / 13")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (204,"MARYLAND","LUTHERVILLE","Johns Hopkins Fertility Center","32.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (205,"MARYLAND","ROCKVILLE","Shady Grove Fertility Reproductive Science Center","47.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (206,"MASSACHUSETTS","BOSTON","Brigham and Women s Hospital Center for Assisted Reproductive Technology","38.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (207,"MASSACHUSETTS","BOSTON","Massachusetts General Hospital Fertility Center","43.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (208,"MASSACHUSETTS","BOSTON","REI Division at Tufts Medical Center","41.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (209,"MASSACHUSETTS","LEXINGTON","Reproductive Science Center","40.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (210,"MASSACHUSETTS","READING","Fertility Centers of New England  Inc.  New England Clinics of Reproductive Medicine  Inc.","40.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (211,"MASSACHUSETTS","SPRINGFIELD","Baystate Reproductive Medicine","44.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (212,"MASSACHUSETTS","STONEHAM","Cardone Reproductive Medicine and Infertility","29.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (213,"MASSACHUSETTS","WALTHAM","Boston IVF","32.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (214,"MICHIGAN","ANN ARBOR","Center for Reproductive Medicine  University of Michigan Reproductive Endocrinology and Infertility","31.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (215,"MICHIGAN","BIRMINGHAM","Center for Reproductive Medicine and Surgery  PC","26.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (216,"MICHIGAN","BLOOMFIELD HILLS","Advanced Reproductive Medicine and Surgery  PC","47.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (217,"MICHIGAN","BRIGHTON","Gago IVF","37.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (218,"MICHIGAN","DEARBORN","Michigan Comprehensive Fertility Center","21.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (219,"MICHIGAN","GRAND RAPIDS","Grand Rapids Fertility & IVF  PC","28.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (220,"MICHIGAN","GRAND RAPIDS","Michigan Reproductive & IVF Center  PC","37.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (221,"MICHIGAN","ROCHESTER HILLS","IVF Michigan","42.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (222,"MICHIGAN","SOUTHFIELD","Wayne State University Physician Group","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (223,"MICHIGAN","TROY","Henry Ford Reproductive Medicine","19.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (224,"MICHIGAN","TROY","Reproductive Medicine Associates of Michigan","45.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (225,"MICHIGAN","WARREN","Michigan Center for Fertility and Women s Health  PLC","43.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (226,"MINNESOTA","MAPLE GROVE","The Midwest Center for Reproductive Health  PA","55.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (227,"MINNESOTA","MINNEAPOLIS","Center for Reproductive Medicine  Advanced Reproductive Technologies","56.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (228,"MINNESOTA","MINNEAPOLIS","Reproductive Medicine Center","49.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (229,"MINNESOTA","ROCHESTER","Mayo Clinic Assisted Reproductive Technologies","35.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (230,"MINNESOTA","WOODBURY","Reproductive Medicine & Infertility Associates","44.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (231,"MISSISSIPPI","JACKSON","Mississippi Fertility Institute","28.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (232,"MISSISSIPPI","JACKSON","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","3 / 11")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (233,"MISSOURI","CHESTERFIELD","Infertility Center of St. Louis  Sherman J. Silber  MD","39.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (234,"MISSOURI","COLUMBIA","Mid-Missouri Reproductive Medicine and Surgery  Inc.","55.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (235,"MISSOURI","COLUMBIA","Missouri Center for Reproductive Medicine and Fertility  IVF Embryology Laboratory","1 / 15")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (236,"MISSOURI","KANSAS CITY","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","48.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (237,"MISSOURI","SAINT PETERS","Fertility Partnership","35.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (238,"MISSOURI","ST. LOUIS","Fertility Center at Missouri Baptist Medical Center","48.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (239,"MISSOURI","ST. LOUIS","The Infertility and Reproductive Medicine Center at Washington University School of Medicine and Barnes-Jewish Hospital","43.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (240,"NEBRASKA","OMAHA","Heartland Center for Reproductive Medicine  PC","45.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (241,"NEBRASKA","OMAHA","Nebraska Methodist Hospital REI","43.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (242,"NEVADA","LAS VEGAS","Fertility Center of Las Vegas","37.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (243,"NEVADA","LAS VEGAS","Nevada Fertility C.A.R.E.S.","42.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (244,"NEVADA","LAS VEGAS","Red Rock Fertility Center","47.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (245,"NEVADA","RENO","The Nevada Center for Reproductive Medicine","39.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (246,"NEW HAMPSHIRE","LEBANON","Dartmouth-Hitchcock Medical Center","45.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (247,"NEW JERSEY","BEDMINSTER","Sher Institute for Reproductive Medicine-New Jersey","44.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (248,"NEW JERSEY","EATONTOWN","Reproductive Science Center of New Jersey","42.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (249,"NEW JERSEY","EDISON","Center for Advanced Reproductive Medicine & Fertility","34.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (250,"NEW JERSEY","ENGLEWOOD","Dr. Philip Lesorgen  Women s Fertility Center","3 / 19")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (251,"NEW JERSEY","ENGLEWOOD CLIFFS","North Hudson I.V.F.  Center for Fertility and Gynecology","4 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (252,"NEW JERSEY","FAIR LAWN","Douglas S. Rabin  MD","2 / 12")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (253,"NEW JERSEY","HASBROUCK HEIGHTS","University Reproductive Associates  PC","36.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (254,"NEW JERSEY","LAKEWOOD","Shore Institute for Reproductive Medicine","32.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (255,"NEW JERSEY","LAWRENCEVILLE","Delaware Valley OBGYN and Infertility Group  Princeton IVF","40.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (256,"NEW JERSEY","LAWRENCEVILLE","Princeton Center for Infertility & Reproductive Medicine","6 / 13")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (257,"NEW JERSEY","LITTLE SILVER","East Coast Infertility and IVF","34.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (258,"NEW JERSEY","LIVINGSTON","Institute for Reproductive Medicine and Science  Saint Barnabas Medical Center","34.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (259,"NEW JERSEY","MARLTON","Cooper Institute for Reproductive Hormonal Disorders","29.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (260,"NEW JERSEY","MARLTON","Delaware Valley Institute of Fertility and Genetics","38.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (261,"NEW JERSEY","MARLTON","South Jersey Fertility Center","35.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (262,"NEW JERSEY","MILLBURN","Diamond Institute for Infertility","35.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (263,"NEW JERSEY","MORRISTOWN","Reproductive Medicine Associates of New Jersey","60.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (264,"NEW JERSEY","PARAMUS","Valley Hospital Fertility Center","46.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (265,"NEW JERSEY","SOMERSET","IVF New Jersey","44.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (266,"NEW JERSEY","VOORHEES","Dr. Louis R. Manara","34.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (267,"NEW JERSEY","WAYNE","North Jersey Fertility Associates  LLC","39.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (268,"NEW JERSEY","WESTWOOD","Fertility Institute of New Jersey and New York","25.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (269,"NEW MEXICO","ALBUQUERQUE","Center for Reproductive Medicine of New Mexico","66.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (270,"NEW YORK","BROOKLYN","The Fertility Institute at New York Methodist Hospital","27.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (271,"NEW YORK","BROOKLYN","Genesis Fertility & Reproductive Medicine","43.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (272,"NEW YORK","BUFFALO","Infertility & IVF Medical Associates of Western New York","36.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (273,"NEW YORK","FISHKILL","Hudson Valley Fertility  PLLC","18.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (274,"NEW YORK","FLUSHING","The New York Fertility Center","15.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (275,"NEW YORK","HARTSDALE","Montefiore s Institute for Reproductive Medicine and Health","29.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (276,"NEW YORK","LOUDONVILLE","Albany IVF  Fertility","46.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (277,"NEW YORK","MANHASSET","North Shore University Hospital  Center for Human Reproduction","38.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (278,"NEW YORK","MELVILLE","Long Island IVF","48.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (279,"NEW YORK","MINEOLA","Reproductive Specialists of New York","33.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (280,"NEW YORK","MT. KISCO","Westchester Reproductive Medicine","6 / 14")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (281,"NEW YORK","NEW YORK","Advanced Fertility Services","23.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (282,"NEW YORK","NEW YORK","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","27.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (283,"NEW YORK","NEW YORK","Batzofin Fertility Services","25.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (284,"NEW YORK","NEW YORK","Beth Israel Center for Infertility & Reproductive Health","16.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (285,"NEW YORK","NEW YORK","Brooklyn/Westside Fertility Center  Brooklyn Fertility Center","2 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (286,"NEW YORK","NEW YORK","Columbia University Center for Women s Reproductive Care","36.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (287,"NEW YORK","NEW YORK","IVF New York","0 / 3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (288,"NEW YORK","NEW YORK","Manhattan Reproductive Medicine","34.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (289,"NEW YORK","NEW YORK","Medical Offices for Human Reproduction  Center for Human Reproduction (CHR)","28.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (290,"NEW YORK","NEW YORK","Metropolitan Reproductive Medicine  PC","2 / 4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (291,"NEW YORK","NEW YORK","New Hope Fertility Center","37.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (292,"NEW YORK","NEW YORK","New York Fertility Institute","44.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (293,"NEW YORK","NEW YORK","NYU Fertility Center  New York University School of Medicine","43.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (294,"NEW YORK","NEW YORK","Offices for Fertility and Reproductive Medicine","9 / 17")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (295,"NEW YORK","NEW YORK","Reproductive Endocrinology Associates of St. Luke s Roosevelt Hospital Center","38.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (296,"NEW YORK","NEW YORK","Reproductive Medicine Associates of New York  LLP","47.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (297,"NEW YORK","NEW YORK","Geoffrey Sher  MD  PC","43.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (298,"NEW YORK","NEW YORK","Weill Medical College of Cornell University  The Center for Reproductive Medicine and Infertility","40.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (299,"NEW YORK","PLAINVIEW","East Coast Fertility","47.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (300,"NEW YORK","ROCHESTER","Rochester Fertility Care  PC","37.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (301,"NEW YORK","ROCHESTER","Strong Fertility Center","30.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (302,"NEW YORK","STATEN ISLAND","Island Reproductive Services","45.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (303,"NEW YORK","SYOSSET","Gold Coast IVF  Reproductive Medicine and Surgery Center","48.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (304,"NEW YORK","SYRACUSE","CNY Fertility Center","30.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (305,"NEW YORK","SYRACUSE","SUNY Upstate Medical University","2 / 6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (306,"NEW YORK","WHITE PLAINS","Westchester Fertility and Reproductive Endocrinology","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (307,"NORTH CAROLINA","CARY","North Carolina Center for Reproductive Medicine  The Talbert Fertility Institute","26.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (308,"NORTH CAROLINA","CHAPEL HILL","University of North Carolina A.R.T. Clinic","35.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (309,"NORTH CAROLINA","CHARLOTTE","Institute for Assisted Reproduction","38.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (310,"NORTH CAROLINA","CHARLOTTE","Program for Assisted Reproduction  Carolinas Medical Center  CMC Women s Institute","47.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (311,"NORTH CAROLINA","DURHAM","Duke Fertility Center  Duke University Medical Center","46.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (312,"NORTH CAROLINA","GREENVILLE","East Carolina University","47.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (313,"NORTH CAROLINA","HIGH POINT","Premier Fertility Center  High Point Regional Health System","45.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (314,"NORTH CAROLINA","HUNTERSVILLE","Advanced Reproductive Concepts","45.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (315,"NORTH CAROLINA","RALEIGH","Carolina Conceptions  PA","47.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (316,"NORTH CAROLINA","WINSTON-SALEM","Wake Forest University Center for Reproductive Medicine","50.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (317,"NORTH DAKOTA","FARGO","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","27.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (318,"OHIO","AKRON","Fertility Unlimited  Northeastern Ohio Fertility Center","6 / 10")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (319,"OHIO","AKRON","Reproductive Gynecology","34.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (320,"OHIO","CINCINNATI","Bethesda Center for Reproductive Health & Fertility","37.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (321,"OHIO","CINCINNATI","Center for Reproductive Health","34.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (322,"OHIO","CINCINNATI","Institute for Reproductive Health","38.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (323,"OHIO","CLEVELAND","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","43.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (324,"OHIO","COLUMBUS","Ohio Reproductive Medicine","42.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (325,"OHIO","DAYTON","Wright State Physicians Women s Health Care","4 / 15")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (326,"OHIO","KETTERING","Kettering Reproductive Medicine","32.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (327,"OHIO","TOLEDO","Fertility Center of Northwestern Ohio","30.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (328,"OKLAHOMA","OKLAHOMA CITY","Henry G. Bennett  Jr.  Fertility Institute","51.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (329,"OKLAHOMA","OKLAHOMA CITY","OU Physicians Reproductive Medicine","52.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (330,"OKLAHOMA","TULSA","Tulsa Fertility Center","40.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (331,"OREGON","EUGENE","Fertility Center of Oregon","45.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (332,"OREGON","PORTLAND","Northwest Fertility Center","46.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (333,"OREGON","PORTLAND","Oregon Reproductive Medicine","56.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (334,"OREGON","PORTLAND","University Fertility Consultants  Oregon Health & Science University","43.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (335,"PENNSYLVANIA","ABINGTON","Toll Center for Reproductive Sciences","36.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (336,"PENNSYLVANIA","ALLENTOWN","Infertility Solutions  PC","18.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (337,"PENNSYLVANIA","ALLENTOWN","Reproductive Medicine Associates of Pennsylvania","52.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (338,"PENNSYLVANIA","BETHLEHEM","Family Fertility Center","41.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (339,"PENNSYLVANIA","BRYN MAWR","Main Line Fertility and Reproductive Medicine","46.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (340,"PENNSYLVANIA","DANVILLE","Geisinger Medical Center Fertility Program","34.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (341,"PENNSYLVANIA","HARRISBURG","Advanced Center for Infertility and Reproductive Medicine  RPC","4 / 10")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (342,"PENNSYLVANIA","HERSHEY","Penn State Milton S. Hershey Medical Center","30.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (343,"PENNSYLVANIA","KING OF PRUSSIA","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","52.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (344,"PENNSYLVANIA","PHILADELPHIA","Fertility and Gynecology Associates","8 / 12")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (345,"PENNSYLVANIA","PHILADELPHIA","Jefferson IVF","1 / 10")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (346,"PENNSYLVANIA","PHILADELPHIA","University of Pennsylvania  Penn Fertility Care","33.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (347,"PENNSYLVANIA","PITTSBURGH","Jones Institute at West Penn Allegheny Health System","36.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (348,"PENNSYLVANIA","PITTSBURGH","Reproductive Health Specialists  Inc.","47.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (349,"PENNSYLVANIA","PITTSBURGH","University of Pittsburgh Physicians  Center for Fertility and Reproductive Endocrinology","26.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (350,"PENNSYLVANIA","UPLAND","Reproductive Endocrinology and Fertility Center","26.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (351,"PENNSYLVANIA","WAYNE","Reproductive Science Institute of Suburban Philadelphia","51.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (352,"PENNSYLVANIA","WEST READING","Women s Clinic  Ltd.","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (353,"PENNSYLVANIA","YORK","The Fertility Center  LLC","48.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (354,"PUERTO RICO","BAYAMON","Pedro J. Beauchamp  MD","40.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (355,"PUERTO RICO","CAGUAS","Clinica de Fertilidad HIMA-San Pablo","2 / 10")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (356,"PUERTO RICO","SANTURCE","GREFI  Gynecology  Reproductive Endocrinology & Fertility Institute","0 / 9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (357,"RHODE ISLAND","PROVIDENCE","Women and Infants  Division of Reproductive Medicine and Infertility","41.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (358,"SOUTH CAROLINA","GREENVILLE","Piedmont Reproductive Endocrinology Group  PA","57.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (359,"SOUTH CAROLINA","GREENVILLE","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","37.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (360,"SOUTH CAROLINA","MOUNT PLEASANT","Southeastern Fertility Center  PA","46.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (361,"SOUTH CAROLINA","WEST COLUMBIA","Advanced Fertility & Reproductive Endocrinology","46.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (362,"SOUTH DAKOTA","SIOUX FALLS","Sanford Women s Health","46.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (363,"TENNESSEE","CHATTANOOGA","Fertility Center  LLC","51.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (364,"TENNESSEE","CHATTANOOGA","Tennessee Reproductive Medicine","48.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (365,"TENNESSEE","JOHNSON CITY","Quillen Fertility and Women s Services","50.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (366,"TENNESSEE","KNOXVILLE","East Tennessee IVF and Andrology Center","4 / 12")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (367,"TENNESSEE","KNOXVILLE","Southeastern Fertility Center","1 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (368,"TENNESSEE","MEMPHIS","Kutteh Ke Fertility Associates of Memphis  PLLC","37.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (369,"TENNESSEE","NASHVILLE","The Center for Reproductive Health","26.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (370,"TENNESSEE","NASHVILLE","Nashville Fertility Center","41.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (371,"TEXAS","AUSTIN","Texas Fertility Center  Drs. Vaughn  Silverberg and Hansard","42.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (372,"TEXAS","AUSTIN","Dr. Jeffrey Youngkin  Austin Fertility Center","1 / 4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (373,"TEXAS","BEDFORD","Center for Assisted Reproduction","46.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (374,"TEXAS","DALLAS","Dallas-Fort Worth Fertility Associates","41.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (375,"TEXAS","DALLAS","Fertility and Advanced Reproductive Medicine","20.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (376,"TEXAS","DALLAS","Fertility Specialists of Texas  PLLC","57.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (377,"TEXAS","DALLAS","IVF Institute","7 / 13")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (378,"TEXAS","DALLAS","ReproMed Fertility Center","55.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (379,"TEXAS","DALLAS","Sher Institute for Reproductive Medicine-Dallas","43.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (380,"TEXAS","DALLAS","Texas Center for Reproductive Health","54.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (381,"TEXAS","DESOTO","The Women s Place","0 / 7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (382,"TEXAS","DICKINSON","University Fertility Center","46.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (383,"TEXAS","EL PASO","Southwest Center for Reproductive Health  PA","34.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (384,"TEXAS","FORT SAM HOUSTON","Brooke Army Medical Center","54.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (385,"TEXAS","FORT WORTH","Fort Worth Fertility  PA","47.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (386,"TEXAS","FRISCO","Dallas IVF","55.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (387,"TEXAS","HOUSTON","Advanced Fertility Center of Texas","37.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (388,"TEXAS","HOUSTON","Baylor Family Fertility Program","28.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (389,"TEXAS","HOUSTON","Fertility Specialists of Houston","37.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (390,"TEXAS","HOUSTON","Houston Fertility Institute","51.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (391,"TEXAS","HOUSTON","Houston Infertility Clinic  Sonja Kristiansen  MD","39.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (392,"TEXAS","HOUSTON","Houston IVF","50.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (393,"TEXAS","IRVING","Advanced Reproductive Care Center of Irving","49.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (394,"TEXAS","LUBBOCK","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (395,"TEXAS","LUBBOCK","The Centre for Reproductive Medicine","46.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (396,"TEXAS","MCALLEN","Reproductive Institute of South Texas","47.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (397,"TEXAS","PLANO","Presbyterian Hospital Plano ARTS","40.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (398,"TEXAS","SAN ANTONIO","Fertility Center of San Antonio","54.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (399,"TEXAS","SAN ANTONIO","Institute for Women s Health  Advanced Fertility Laboratory","2 / 9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (400,"TEXAS","SAN ANTONIO","Perinatal and Fertility Specialists","3 / 6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (401,"TEXAS","SAN ANTONIO","Reproductive Medicine Associates of Texas  PA","43.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (402,"TEXAS","SAN ANTONIO","University of Texas Medicine Women s Health Center","2 / 17")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (403,"TEXAS","THE WOODLANDS","North Houston Center for Reproductive Medicine  PA  (NHCRM)","61.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (404,"TEXAS","WEBSTER","Center of Reproductive Medicine (CORM)","49.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (405,"UTAH","PLEASANT GROVE","Utah Fertility Center","50.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (406,"UTAH","SALT LAKE CITY","Utah Center for Reproductive Medicine","51.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (407,"UTAH","SANDY","Reproductive Care Center","38.2")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (408,"VERMONT","BURLINGTON","Vermont Center for Reproductive Medicine","24.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (409,"VIRGINIA","ANNANDALE","Washington Fertility Center","40.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (410,"VIRGINIA","ARLINGTON","Dominion Fertility and Endocrinology","18.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (411,"VIRGINIA","CHARLOTTESVILLE","Reproductive Medicine and Surgery Center of Virginia  PLC","35.4")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (412,"VIRGINIA","FAIRFAX","Genetics & IVF Institute","29.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (413,"VIRGINIA","FAIRFAX","The Muasher Center for Fertility and IVF","23.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (414,"VIRGINIA","NORFOLK","Jones Institute for Reproductive Medicine","27.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (415,"VIRGINIA","RESTON","Virginia Center for Reproductive Medicine","58.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (416,"VIRGINIA","RICHMOND","Fertility Institute of Virginia","45.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (417,"VIRGINIA","RICHMOND","LifeSource Fertility Center","35.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (418,"VIRGINIA","RICHMOND","The Richmond Center for Fertility and Endocrinology","48.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (419,"VIRGINIA","RICHMOND","University Center for Advanced Reproductive Medicine","2 / 10")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (420,"VIRGINIA","VIRGINIA BEACH","The New Hope Center for Reproductive Medicine","50.6")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (421,"VIRGINIA","WINCHESTER","Francisco M. Irianni  MD","4 / 10")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (422,"WASHINGTON","BELLEVUE","Overlake Reproductive Health Inc.  PS","55.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (423,"WASHINGTON","BELLEVUE","Washington Center for Reproductive Medicine","47.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (424,"WASHINGTON","BELLINGHAM","Bellingham IVF  Emmett Branigan  MD","59.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (425,"WASHINGTON","KIRKLAND","Northwest Center for Reproductive Sciences","47.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (426,"WASHINGTON","OLYMPIA","Olympia Women s Health","31.8")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (427,"WASHINGTON","SEATTLE","Pacific Northwest Fertility and IVF Specialists","42.7")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (428,"WASHINGTON","SEATTLE","Seattle Reproductive Medicine  Integramed America","53.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (429,"WASHINGTON","SEATTLE","University Reproductive Care","2 / 3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (430,"WASHINGTON","SPOKANE","The Center for Reproductive Endocrinology and Fertility","75.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (431,"WASHINGTON","TACOMA","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (432,"WASHINGTON","TACOMA","Madigan Army Medical Center","47.1")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (433,"WEST VIRGINIA","CHARLESTON","West Virginia University Fertility Center","33.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (434,"WEST VIRGINIA","HUNTINGTON","Center for Advanced Reproductive Medicine","5 / 15")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (435,"WEST VIRGINIA","MORGANTOWN","West Virginia University Center for Reproductive Medicine","48.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (436,"WISCONSIN","GREEN BAY","Aurora Fertility Services-Green Bay  The Women s Center at Aurora BayCare Medical Center","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (437,"WISCONSIN","LA CROSSE","Gundersen Lutheran Fertility Center","23.5")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (438,"WISCONSIN","MIDDLETON","University of Wisconsin-Generations Fertility Care","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (439,"WISCONSIN","MIDDLETON","Wisconsin Fertility Institute","28.3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (440,"WISCONSIN","MILWAUKEE","Reproductive Medicine Center  Froedtert-Medical College","44.0")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (441,"WISCONSIN","MILWAUKEE","Reproductive Specialty Center","42.9")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (442,"WISCONSIN","WAUKESHA","This clinic has closed or reorganized since 2010.  Information on current clinic services and profile therefore is not provided here.  Contact the NASS Help Desk for current information about this clinic.","0 / 3")');
		tx.executeSql('INSERT INTO IVF (OrderID, ClinStateCode, ClinCityCode, CurrClinNameAll,FshNDLvBirthsRate1) VALUES (443,"WISCONSIN","WEST ALLIS","Aurora Health Care-Aurora Fertility Services  West Allis","48.1")');
	}
	*/

/* OLD EMPLOYEE-DB CODE BELOW ***************************

function getEmployees(tx) {
	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
				"from employee e left join employee r on r.managerId = e.id " +
				"group by e.id order by e.lastName, e.firstName";
	tx.executeSql(sql, [], getEmployees_success);
}

function getEmployees_success(tx, results) {
	$('#busy').hide();
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var employee = results.rows.item(i);
		$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
				'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
				'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
				'<p class="line2">' + employee.title + '</p>' +
				'<span class="bubble">' + employee.reportCount + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

function populateDB(tx) {
	$('#busy').show();
	tx.executeSql('DROP TABLE IF EXISTS employee');
	var sql = 
		"CREATE TABLE IF NOT EXISTS employee ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"firstName VARCHAR(50), " +
		"lastName VARCHAR(50), " +
		"title VARCHAR(50), " +
		"department VARCHAR(50), " + 
		"managerId INTEGER, " +
		"city VARCHAR(50), " +
		"officePhone VARCHAR(30), " + 
		"cellPhone VARCHAR(30), " +
		"email VARCHAR(30), " +
		"picture VARCHAR(200))";
    tx.executeSql(sql);

    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (12,'Steven','Wells',4,'Software Architect','Engineering','617-000-0012','781-000-0012','swells@fakemail.com','Boston, MA','steven_wells.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (11,'Amy','Jones',5,'Sales Representative','Sales','617-000-0011','781-000-0011','ajones@fakemail.com','Boston, MA','amy_jones.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (10,'Kathleen','Byrne',5,'Sales Representative','Sales','617-000-0010','781-000-0010','kbyrne@fakemail.com','Boston, MA','kathleen_byrne.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (9,'Gary','Donovan',2,'Marketing','Marketing','617-000-0009','781-000-0009','gdonovan@fakemail.com','Boston, MA','gary_donovan.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (8,'Lisa','Wong',2,'Marketing Manager','Marketing','617-000-0008','781-000-0008','lwong@fakemail.com','Boston, MA','lisa_wong.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (7,'Paula','Gates',4,'Software Architect','Engineering','617-000-0007','781-000-0007','pgates@fakemail.com','Boston, MA','paula_gates.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (5,'Ray','Moore',1,'VP of Sales','Sales','617-000-0005','781-000-0005','rmoore@fakemail.com','Boston, MA','ray_moore.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (6,'Paul','Jones',4,'QA Manager','Engineering','617-000-0006','781-000-0006','pjones@fakemail.com','Boston, MA','paul_jones.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (3,'Eugene','Lee',1,'CFO','Accounting','617-000-0003','781-000-0003','elee@fakemail.com','Boston, MA','eugene_lee.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (4,'John','Williams',1,'VP of Engineering','Engineering','617-000-0004','781-000-0004','jwilliams@fakemail.com','Boston, MA','john_williams.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (2,'Julie','Taylor',1,'VP of Marketing','Marketing','617-000-0002','781-000-0002','jtaylor@fakemail.com','Boston, MA','julie_taylor.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (1,'James','King',0,'President and CEO','Corporate','617-000-0001','781-000-0001','jking@fakemail.com','Boston, MA','james_king.jpg')");
}
*/
