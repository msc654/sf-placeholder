var jsforce = require('jsforce');
var settings = require('../config/settings.js');
var btoa = require('btoa');

module.exports = {

    buildPage : function(pageName){

        var page    = '<apex:page showHeader="false" sidebar="false" standardStylesheets="false" cache="false" expires="0" >'
        page        +=     '<html class="no-js">';
        page        +=          '<head>';
        page        +=              '<base href="/'+pageName+'" target="_blank" />'
        page        +=              '<meta charset="utf-8"/>';
        page        +=              '<!-- <title>spa</title> -->';
        page        +=              '<meta name="description" content=""/>';
        page        +=              '<meta name="viewport" content="width=device-width"/>';
        page        +=              '<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet" />';
        page        +=              '<apex:includeScript value="{!URLFOR($Resource.'+pageName+',\'bundle.js\')}"/>';
        page        +=              '<script type="text/javascript">';
        page        +=                  'var path = window.location.pathname;';
        page        +=                  'var page = path.split("/").pop();';
        page        +=                  'if(document.URL.indexOf("force") > 0) {';
        page        +=                      'staticURL = "{!$Resource.' + pageName + '}";';
        page        +=                  '}else{';
        page        +=                      'staticURL= "";';
        page        +=                  '}';
        page        +=                  'configSettings = {';
        page        +=                      'staticPath: staticURL,';
        page        +=                      'config: {},';
        page        +=                      'remoteActions: {},';
        page        +=                      'baseName: page'
        page        +=                      '};';
        page        +=              '</script>';
        page        +=          '</head>';
        page        +=          '<body ng-app="app">';
        page        +=              '<div ng-controller="MainController">';
        page        +=                  '<ui-view></ui-view>';
        page        +=              '</div>';
        page        +=          '</body>';
        page        +=     '</html>';
        page        +='</apex:page>';


        var b64Page = btoa(page);

        var conn = new jsforce.Connection();
        conn.login(settings.getUserName(),'' + settings.getPassword() + ''+ settings.getToken(), function(err, res) {
         // creating metadata in array
            var metadata = [{
              fullName: pageName,
              label: pageName,
              content: b64Page,
              description : 'A visualforce page'
            }];
            conn.metadata.create('ApexPage', metadata, function(err, results) {

                if (err) { 

                    console.log(err);
                    console.log(results); 

                } else {
                    
                    if(results.success === true){
                        console.log('New Visualforce Page: ' + results.fullName + ' created!');
                    }else{
                        console.log(results);
                    }

                }
                
            });
        });

        
    }

};

