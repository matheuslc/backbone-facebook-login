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
  return {
    options: {},
    events: Backbone.events,

    loadSDK: function() {
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/"+ options.language || 'en_US' +"/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      return this;
    },

    initSDK: function(credentials) {
      FB.init({
        appId   : options.appId,
        cookie  : options.cookie || true,
        xfbml   : options.xfbml || true,
        version : options.version || 'v2.4'
      });

      this.events.trigger('sdk-ready');

      return this;
    },

    login: function() {
      FB.login(function(response) {
        this.events.trigger('login-status-changed', response.status);

        return response.status;
      }).bind(this);
    },

    logout: function() {
      FB.logout(function(response) {
        this.events.trigger('login-status-changed', response.status);

        return response.status;
      }).bind(this);
    },

    call: function(url, data, options) {
      this.options = options || '';
      this.attr    = data || url.split('/');

      FB.api(url, options, function(response) {
          if (response && !response.error) {
            return response;
          }
      }).bind(this);
    },

    init: function() {
      if (window.FB === false) {
        this.loadSDK();
      }

      window.fbAsyncInit = initSDK;
    }
  }
});
