/****************************************************************************************************************************************************
 This file is used to process the search that comes from a pre-created (or test-driven) search box.  It does not affect the Search Box Builder page.
******************************************************************************************************************************************************/
function _isEmpty(e){
	return (e===null||typeof e==="undefined"||e===undefined);
} 
function ebscoHostSearchParse(ebscohostsearchtext,ebscohostsearchmode) {
 var sT=ebscohostsearchtext.match(/(\(|\)|[^"^\s^)]+)\s*|"([^"]+)"\s*/gi); 
 var sQ=''; 
 var bP=0; 
 var fP=0; 
 var nP=0;
 
 for(var i = 0;i<sT.length;i++) { 
 		sT[i]=sT[i].replace(/\s+$/,""); 
 		switch (sT[i].toUpperCase()) {
 			case 'AA': case 'AB': case 'AC': case 'AD': case 'AE': case 'AF': case 'AG': case 'AI': case 'AK': case 'AL': case 'AM': case 'AN': case 'AO': case 'AP': case 'AR': case 'AS': case 'AT': case 'AV': case 'AW': case 'AZ': case 'BA': case 'BC': case 'BD': case 'BK': case 'BM': case 'BN': case 'BP': case 'BR': case 'BS': case 'BT': case 'CA': case 'CB': case 'CC': case 'CD': case 'CE': case 'CF': case 'CH': case 'CI': case 'CL': case 'CM': case 'CN': case 'CO': case 'CP': case 'CR': case 'CS': case 'CT': case 'CU': case 'CX': case 'CY': case 'DB': case 'DC': case 'DD': case 'DE': case 'DF': case 'DG': case 'DI': case 'DM': case 'DN': case 'DO': case 'DP': case 'DR': case 'DS': case 'DT': case 'DU': case 'DX': case 'EB': case 'EC': case 'ED': case 'EF': case 'EG': case 'EL': case 'EM': case 'EN': case 'ER': case 'ES': case 'ET': case 'EV': case 'FA': case 'FC': case 'FD': case 'FF': case 'FG': case 'FI': case 'FK': case 'FL': case 'FM': case 'FQ': case 'FR': case 'FS': case 'FT': case 'GB': case 'GC': case 'GD': case 'GE': case 'GI': case 'GL': case 'GN': case 'GR': case 'GS': case 'GT': case 'GV': case 'HC': case 'HJ': case 'HS': case 'HT': case 'HY': case 'IA': case 'IB': case 'IC': case 'ID': case 'II': case 'IM': case 'IN': case 'IP': case 'IR': case 'IV': case 'JI': case 'JN': case 'JS': case 'JT': case 'KK': case 'KT': case 'KW': case 'KY': case 'LA': case 'LB': case 'LC': case 'LE': case 'LG': case 'LH': case 'LI': case 'LL': case 'LN': case 'LS': case 'LT': case 'LV': case 'LW': case 'LY': case 'MA': case 'MB': case 'MC': case 'MD': case 'ME': case 'MF': case 'MH': case 'MI': case 'MJ': case 'MM': case 'MN': case 'MO': case 'MP': case 'MQ': case 'MR': case 'MS': case 'MT': case 'MV': case 'MW': case 'NA': case 'NB': case 'NC': case 'ND': case 'NE': case 'NF': case 'NI': case 'NM': case 'NN': case 'NO': case 'NP': case 'NR': case 'NS': case 'NT': case 'NU': case 'OA': case 'OC': case 'OD': case 'OG': case 'OL': case 'OP': case 'OS': case 'OT': case 'PA': case 'PB': case 'PC': case 'PD': case 'PE': case 'PG': case 'PH': case 'PI': case 'PL': case 'PM': case 'PN': case 'PO': case 'PP': case 'PR': case 'PS': case 'PT': case 'PU': case 'PY': case 'PZ': case 'QT': case 'RA': case 'RC': case 'RD': case 'RE': case 'RF': case 'RJ': case 'RL': case 'RN': case 'RO': case 'RP': case 'RR': case 'RS': case 'RT': case 'RV': case 'RW': case 'SA': case 'SB': case 'SC': case 'SD': case 'SE': case 'SG': case 'SH': case 'SI': case 'SJ': case 'SK': case 'SL': case 'SM': case 'SN': case 'SP': case 'SQ': case 'SS': case 'ST': case 'SX': case 'SY': case 'TA': case 'TC': case 'TD': case 'TH': case 'TK': case 'TL': case 'TM': case 'TN': case 'TP': case 'TR': case 'TS': case 'TT': case 'TU': case 'TY': case 'UC': case 'UD': case 'UI': case 'UP': case 'UR': case 'UT': case 'VC': case 'VI': case 'VS': case 'VT': case 'XN': case 'XY': case 'YR': case 'ZL': case 'AA1': case 'AG1': case 'AG2': case 'AG3': case 'AG4': case 'CC4': case 'CE3': case 'CE5': case 'CI2': case 'DE3': case 'DT1': case 'EB1': case 'EC1': case 'EC2': case 'EC3': case 'FC3': case 'FC5': case 'FM3': case 'GN1': case 'GN3': case 'GR2': case 'JN1': case 'LA1': case 'LA10': case 'LA14': case 'LA20': case 'LA5': case 'LA6': case 'LV4': case 'LX': case 'LX1': case 'LX10': case 'LX11': case 'LX12': case 'LX5': case 'LX6': case 'LX9': case 'MH1': case 'MX1': case 'PB1': case 'PF1': case 'PG1': case 'PG4': case 'PT1': case 'PT10': case 'PT100': case 'PT102': case 'PT103': case 'PT11': case 'PT12': case 'PT15': case 'PT16': case 'PT2': case 'PT35': case 'PT61': case 'PT68': case 'PT69': case 'PT70': case 'PT71': case 'PT78': case 'PT79': case 'PT80': case 'PT81': case 'PT82': case 'PT83': case 'PT88': case 'PZ1': case 'PZ26': case 'PZ7': case 'PZ8': case 'PZ9': case 'QL1': case 'SB1': case 'SB8': case 'SC2': case 'SC3': case 'SE5': case 'SL1': case 'SU1': case 'SX1': case 'TL2': case 'TS1': case 'TW': case 'TY2': if (sQ.length>nP) if (bP==0) sQ+=ebscohostsearchmode; if (fP==1) sQ+=sT[i]+ebscohostsearchmode; else if (fP==2) sQ+=sT[i]+'\+'; else sQ+=sT[i]+'\+'; if (fP!=1) fP=2; bP=1; break;
 			case '(': if (sQ.length>nP && bP==0) { if (fP!=2) sQ+=ebscohostsearchmode; else sQ+='\+'; } if (fP!=1) sQ+='(\+'; bP=1; nP+=1; break; 
 			case ')': sQ+='\+)'; if(fP==1) sQ+='\+)'; bP=1; fP=0; nP-=1; break;
 			case 'AND': case 'OR': case 'NOT': if (sQ.length>nP && fP==1 && nP<1) sQ+='\+)'; sQ+='\+'+sT[i].toUpperCase()+'\+'; bP=1; fP=0; break;
 			case '&': case '+': break;
 			default: if (sT[i].toLowerCase().search(/^w([01]?\d\d?|2[0-4]\d|25[0-5])$/)!=-1||sT[i].toLowerCase().search(/^n([01]?\d\d?|2[0-4]\d|25[0-5])$/)!=-1) { sQ+='\+'+sT[i]+'\+'; bP=1; break; } else { if (sQ.length>nP && bP==0) { if (fP!=2) sQ+=ebscohostsearchmode; else sQ+='\+'; } sT[i]=sT[i].replace(/\+/g,"%2b"); sQ+=sT[i]; bP=0; } } }
 			if (fP==1) sQ+='\+)'; sQ=sQ.replace(/\"/g,"%22"); sQ=sQ.replace(/ /g,"+"); sQ=sQ.replace(/,/g,"%2c"); sQ=sQ.replace(/&/g,"%26"); return sQ;
}

/* Grabbing info from the search box form and saving it into variables */
/* Line 38 added June 6th 2011 to address Alert: Ehost App Eng - SI Email Alert (Record Modified) ID: 44186 - GAspen */
function ebscoHostSearchGo(form) {
	function ebscoAddDisciplines() {
		function addScrollBoxLimiters(disciplinesDiv) {
			var visibleDisciplines = document.getElementById('ehostVisibleDisciplines'),
				options = visibleDisciplines ? visibleDisciplines.getElementsByTagName('option') : [],
				selectedOptionValues = [];
			
			if (options.length) {
				for (var i = 0; i < options.length; i++) {
					var theOption = options[i],
					code = theOption.value;
					if ((theOption.selected || (theOption.getAttribute('selected') === 'selected' && theOption.style.display === 'none') ) && code !== '') { // Do not include default option
						selectedOptionValues.push(code);
					}
				}
				
				if (selectedOptionValues.length) {
					// Do not add disciplines limiter if only default option is selected
					if (selectedOptionValues.length === 1 && selectedOptionValues[0].value === '') {
						return;
					}
					
					ebscohosturl += '&cli' + index + '=DISCIPLINE' + '&clv' + index + '=';
					for (var i = 0; i< selectedOptionValues.length; i++) {
						ebscohosturl += 'LO+system.dis-' + selectedOptionValues[i].toLowerCase() + '%7e';
					}
				}

				index++;
			}
			
			function addDisciplinesToUrl () {
				for (var i = 0; i < selectedOptionValues.length; i++) {
					addToUrl(selectedOptionValues[i]);
				}
				
				// Add selected hidden disciplines to url
				var hiddenDisciplines = disciplinesDiv.getElementById('ehostHiddenDisciplines').getElementsByTagName('option');
				for (var i = 0; i < hiddenDisciplines.length; i++ ) {
					addToUrl(hiddenDisciplines[i].value);
				}
				
				function addToUrl (value) {
					ebscohosturl += 'LO+system.dis-' + value.toLowerCase() + '%7e';
				}
			}

		}

		var disciplinesDiv = document.getElementById('disciplineBlock');
		if (disciplinesDiv) {
			var checkboxes = disciplinesDiv.getElementsByTagName('input');

			if (checkboxes.length) {
				ebscohosturl += '&cli' + index + '=DISCIPLINE' + '&clv' + index + '=';

				for (var i = 0; i < checkboxes.length; i++) {
					var checkbox = checkboxes[i],
					code = checkbox.value;
					if (checkbox.checked) {
						ebscohosturl += 'LO+system.dis-' + code.toLowerCase() + '%7e';
					}
				}

				index++;
			}
		}

		if (disciplinesDiv) {
			addScrollBoxLimiters(disciplinesDiv);
		}

		

		ebscohosturl = ebscohosturl.replace(/%7e$/, '');

	}


	 var ebscohostsearchtext = chkObject(form.ebscohostsearchtext,'');
	 var ebscohostkeywords = chkObject(form.ebscohostkeywords,'');
	 var ebscohostsearchsrc = chkObject(form.ebscohostsearchsrc,'');
	 var ebscohostsearchmode = chkObject(form.ebscohostsearchmode,'\+AND\+');
	 var ebscohostwindow = parseInt(chkObject(form.ebscohostwindow,0));
	 var ebscohosturl = chkObject(form.ebscohosturl,'http://search.ebscohost.com/login.aspx?');
	
	 var strAlert="";
	
	 ebscohostsearchtext = encodeURI(ebscohostsearchtext);
	
	 if (ebscohosturl.indexOf('eds-live') == -1 && ebscohosturl.indexOf('edspub-live') === -1) {
	 		if (ebscohostsearchsrc == "db" || ebscohostsearchsrc == "dbgroup") {
	 	 		var ebscohostdatabases = getSelectedDatabases(form.cbs,ebscohostsearchsrc);
	 	 	if (ebscohostdatabases==-1) 
	 		 	strAlert+="Please select one or more databases.\n";
	 	 	
	 	 	ebscohosturl+=ebscohostdatabases; 
		 	}
		}
	
	 if (ebscohostsearchtext=="") 
	 		strAlert+="Please enter search term(s).\n"; 
	 
	 if (strAlert !== "") {
	 	alert(strAlert);
		return false;
	 }	 
	 
	 var cbFT = document.getElementById("chkFullText");
	 var matches=ebscohosturl.match(/cli[0-9]/g);
	 var index = (matches===null)?0:matches.length; 
	 
	 if (!_isEmpty(cbFT) && cbFT.checked) {	 	 
		ebscohosturl	+= "&cli"+index+"=FT&clv"+index+"=Y";
		index++;
	 }	 
	 
	 var cbPR = document.getElementById("chkPeerReviewed");
	 	 
	 if (!_isEmpty(cbPR) && cbPR.checked) {	 	 
	 	var rv = document.getElementById("ebscoIsPubFinder") ? "RV3" : "RV";
	 	ebscohosturl += "&cli" + index + "=" + rv + "&clv" + index + "=Y";
		 index++;
	 }	 
	 
	 var cbCO = document.getElementById("chkCatalogOnly");
	 	 
	 if (!_isEmpty(cbCO) && cbCO.checked) {	 	 
		 ebscohosturl+= "&cli"+index+"=FC&clv"+index+"=Y";
		 index++;
	 }
	 
	 var cbLC = document.getElementById("chkLibraryCollection");
	 	 
	 if (!_isEmpty(cbLC) && cbLC.checked) {	 	 
		 ebscohosturl+= "&cli"+index+"=FT1&clv"+index+"=Y";
		 index++;
		}

		try {
			ebscoAddDisciplines();	
		}
	catch (e) {
		debugger;
		}
		

	
	if (ebscohostkeywords!="") 
		ebscohostkeywords=ebscoHostSearchParse(ebscohostkeywords,ebscohostsearchmode)+'\+AND\+';
	
	var keywordSelector = document.getElementById("guidedField_0"), 
		titleSelector = document.getElementById("guidedField_1"),
		authorSelector = document.getElementById("guidedField_2");	
	if(!_isEmpty(authorSelector) && authorSelector.checked) {
		ebscohosturl+='&bquery=AU+('+ebscohostkeywords+ebscoHostSearchParse(ebscohostsearchtext,ebscohostsearchmode)+')'; 
	} else if(!_isEmpty(titleSelector) && titleSelector.checked) {
		ebscohosturl+='&bquery=TI+('+ebscohostkeywords+ebscoHostSearchParse(ebscohostsearchtext,ebscohostsearchmode)+')'; 
	} else {
		ebscohosturl+='&bquery='+ebscohostkeywords+ebscoHostSearchParse(ebscohostsearchtext,ebscohostsearchmode);  	
	} 
	
	if (ebscohostwindow)
		window.open(ebscohosturl, 'EBSCOhost');
	else
		window.location = ebscohosturl;
		
	return false;
}



function getSelectedDatabases(ob,src) {
 var databases = getMultiple(ob);
 if(databases == "") 
 		return -1;

 var dbInputAry = databases;
 var dbList = "";
 for(var i=0;i<dbInputAry.length; i++) {
  var db = dbInputAry[i];
  dbList += "&" + src + "=" + db;
 }
 return dbList;
}

function getMultiple(ob) { 
 var arSelected = new Array(); 
 for (var i = 0; i < ob.length; i++)
 		if (ob[ i ].checked) 
  			arSelected.push(ob[ i ].value);
 return arSelected;
}

function highlight(id, currentClass, checkboxId) {
 var checkbox_element = findObj(checkboxId);
 var row_element = findObj(id);
 
 row_element.className = checkbox_element.checked ? 'selected' : currentClass;
 if(checkbox_element.checked==false) 
 		findObj('cball').checked=false;
}

function SelectAllCheckBoxes(e) {
	var cbs = document.getElementsByName("cbs"),
		rows = document.getElementsByClassName('choose-db-list')[0].children;
 	for(var i=0;i<cbs.length;i++){
 		var row = rows[i],
 			checkbox = row.getElementsByTagName('input')[0];
		cbs[i].checked = e.checked;
  		if (row.id) {
  			highlight(row.id, (i % 2) ? 'two' : 'one', checkbox.id);
  		}
 	}
}

function findObj(n, d) {
 var p,i,x; 
 
 if(!d) 
 		d=document; 
 if((p=n.indexOf("?"))>0&&parent.frames.length) {
 		d=parent.frames[n.substring(p+1)].document; 
 		n=n.substring(0,p);
 }
 
 if(!(x=d[n])&&d.all) 
 		x=d.all[n]; 
 		
 for (i=0;!x&&i<d.forms.length;i++) 
 		x=d.forms[i][n];
 		
 for(i=0;!x&&d.layers&&i<d.layers.length;i++) 
 		x=findObj(n,d.layers[i].document);
 		
 if(!x && d.getElementById) 
 		x=d.getElementById(n); 
 		
 return x;
}

function chkObject(f,d) {
 if (f != null) 
 		return f.value;
 else 
 		return d;
}
