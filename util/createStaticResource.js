var jsforce = require('jsforce');
var b64Resource = 'UEsDBAoAAAAAAJtRh0YAAAAAAAAAAAAAAAAMABAAcGxhY2Vob2xkZXIvVVgMAOXlI1Xl5SNV9QEUAFBLAQIVAwoAAAAAAJtRh0YAAAAAAAAAAAAAAAAMAAwAAAAAAAAAAEDtQQAAAABwbGFjZWhvbGRlci9VWAgA5eUjVeXlI1VQSwUGAAAAAAEAAQBGAAAAOgAAAAAA';

module.exports = {

    buildStaticResource : function(pageName){

        var conn = new jsforce.Connection();
        conn.login('matt+icix-matt-dev1@codescience.com', 'Science1UMcPpMA746aGQ4JPVBErM6Eig', function(err, res) {
         // creating metadata in array
            var metadata = [{
              fullName: pageName,
              content: b64Resource,
              contentType: 'application/zip',
              cacheControl: 'Private'
            }];
            conn.metadata.create('StaticResource', metadata, function(err, results) {
              if (err) { console.log(err); }
              console.log(results);

              return 'success';

              for (var i=0; i < results.length; i++) {
                var result = results[i];
                console.log('success ? : ' + result.success);
                console.log('fullName : ' + result.fullName);
              }
            });
        });
     
    }

};
