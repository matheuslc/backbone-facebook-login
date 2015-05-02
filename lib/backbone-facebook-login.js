;(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(['jquery', 'underscore', 'backbone'], factory);

  } else if(typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
    module.exports = factory(require('underscore'));
    module.exports = factory(require('backbone'));

  } else {
    root.$ = window.$;
    root._ = window._;
    root.Backbone = window.Backbone;
  }

})(this, function($, _, Backbone) {

  return Backbone.Model.extend({
    defaults: {
      userData    : '',
      loginStatus : ''
    },

    checkLoginState: function() {
      var that = this;

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          that.set({
            'loginStatus': 'logged',
            'userData'   : response
          });

        } else if (response.status === 'not_authorized') {
          this.set({'logged': 'not_authorized'});

        } else {
          this.set({'logged': 'not-logged'});
        }
      });
    },

    loadSDK: function() {
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },

    initSDK: function(credentials) {
      FB.init({
        appId      : credentials.appId,
        cookie     : credentials.cookie || true,
        xfbml      : credentials.xfbml || true,
        version    : 'v2.2'
      });
    },

    login: function(scope) {
      var that = this;

      FB.login(function(response) {
        that.checkLoginState();
      }, {});
    },

    logout: function() {
      var that = this;

      FB.logout(function(response) {
        that.set({'loginStatus': 'not-logged'});
      });
    },

    getUserData: function(url, dataName, options) {
      var attrName = dataName || url.split('/'),
          that     = this;

      if (!options) {
        options = '';
      }

      FB.api(url, options, function(response) {
        if (response && !response.error) {
          that.attributes[dataName] = response;
        }
      });
    },

    init: function(options) {
      var that = this;

      this.loadSDK();

      window.fbAsyncInit = function() {
        that.initSDK(options.credentials);
        that.login(options.scope);
      }
    }
  });
});
