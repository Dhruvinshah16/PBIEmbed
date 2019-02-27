$(document).ready(function(){
var accessToken = "";
// Read report Id from Model
var embedReportId = "d81d80ed-92bf-4def-b153-6e07c1f5cd60";
//var domainname = "epcgrtrial";
var Spliturl   = window.location.origin;
var SplitDomain = Spliturl.split('/');
var domainname = SplitDomain[2];

var apiurl = "https://powerbiembed.azurewebsites.net/api/demo/GetToken";
//?reportid="+embedReportId +"&domainname="+domainname;
//?reportid="+embedReportId + "&domainname="+domainname
/*$.ajax({
	type:'POST',
	url:"https://localhost:446/api/demo",
	crossDomain:true,
	dataType: "jsonp",
	success: function(msg) {
		console.log(msg);
	},
	error: function(data){
		console.log(data);
	}
	embedreporturl = "https://app.powerbi.com/reportEmbed?reportId=4a554d68-2ff2-43a4-82ce-ec36f6cd4b83&groupId=c18ca6b9-aa58-457e-a977-397b650359ce&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0In0%3d";
});*/
$.ajax({
	type: 'GET',
	url: apiurl,
	//crossDomain: true,
	//crossOrigin: null,
	//contentType: "text/json; charset=utf-8",
	data: { reportid: embedReportId, domainname: domainname },
	dataType: "jsonp",
	success: function(data) {
		debugger;
		var jsonData = JSON.parse(data);
		accessToken = jsonData.AccessToken;
		// Read embed URL from Model
		var embedUrl = jsonData.EmbedUrl;
		
		var RequestDomain = jsonData.Domain;
	debugger
		// Get models. models contains enums that can be used.
		var models = window['powerbi-client'].models;

		// Embed configuration used to describe the what and how to embed.
		// This object is used when calling powerbi.embed.
		// This also includes settings and options such as filters.
		// You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
		var config = {
			type: 'report',
			tokenType: models.TokenType.Embed,
			accessToken: accessToken,
			embedUrl: embedUrl,
			id: embedReportId,
			permissions: models.Permissions.All,
			settings: {
				filterPaneEnabled: true,
				navContentPaneEnabled: true
			}
		};

		// Get a reference to the embedded report HTML element
		var reportContainer = $('#reportContainer')[0];

		if ("" != "") {
			$("#RLS").prop('checked', true);
			$("#RLSdiv").show();
		}
		else
		{
			$("#RLS").prop('checked', false);
			$("#RLSdiv").hide();
		}

		if ("False" == "True") {
			$("#noRLSdiv").hide();
			$("#RLS").removeAttr("disabled");
			$("#RLS").change(function () {
				if ($(this).is(":checked")) {
					$("#RLSdiv").show(300);
				} else {
					$("#RLSdiv").hide(200);
				}
			});
		}
		else
		{
			$("#noRLSdiv").show();
		}
		// Embed the report and display it within the div container.
		var report = powerbi.embed(reportContainer, config);
		},
		error: function(xhr, status, error) { debugger;console.log(error.message); },
		async: true,
		cache: false
	});
});
