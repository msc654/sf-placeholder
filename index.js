var settings = require('./config/settings.js');
var resource = require('./util/createStaticResource.js');

module.exports = {

    defineUserName : function(username){
        settings.setUserName(username);
    },
    definePassword : function(password){
        settings.setPassword(password);
    },
    defineToken : function(token){
        settings.setToken(token);
    },
    setupPageAndResource : function(name){
        resource.buildStaticResource(name);
    }  
    
};