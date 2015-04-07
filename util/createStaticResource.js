var jsforce = require('jsforce');
var settings = require('../config/settings.js');
var page = require('./createApexPage.js');
var b64Resource = 'UEsDBAoAAAAAAJtRh0YAAAAAAAAAAAAAAAAMABAAcGxhY2Vob2xkZXIvVVgMAOXlI1Xl5SNV9QEUAFBLAQIVAwoAAAAAAJtRh0YAAAAAAAAAAAAAAAAMAAwAAAAAAAAAAEDtQQAAAABwbGFjZWhvbGRlci9VWAgA5eUjVeXlI1VQSwUGAAAAAAEAAQBGAAAAOgAAAAAA';

module.exports = {

    buildStaticResource : function(pageName){

        var conn = new jsforce.Connection();
        conn.login(settings.getUserName(),'' + settings.getPassword() + ''+ settings.getToken(), function(err, res) {
         // creating metadata in array
            var metadata = [{
              fullName: pageName,
              content: b64Resource,
              contentType: 'application/zip',
              cacheControl: 'Private'
            }];
            conn.metadata.create('StaticResource', metadata, function(err, results) {
                if (err) { 

                    console.log(err);
                    console.log(results); 

                } else {
                    
                    if(results.success === true){
                        console.log('New Static Resouce: ' + results.fullName + ' created!');
                        page.buildPage(pageName);
                    }else{
                        console.log(results);
                    }

                }
           
            });
        });
     
    }

};
