/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  var app = document.querySelector('#app');

  // Program state vars:
  // Active Kong Server/Cluster
  app.settings = window.kongSettings;

  app.tbCrumbs = null;
  app.tbActions = [];
  app.server = null;

  // Route List & Loaded API
  app.routes = [];
  app.api = {};

  // Consumer List & Loaded Consumer
  app.consumers = [];
  app.consumer = {};

  // Plugin List & Actively Edited plugin for loaded API
  app.plugins = [];
  app.plugin = {};

  app.navHome = function(){
    page("/");
  };

  app.addAPI = function(){
    page("/addAPI");
  };

  app.editAPI = function(e){
    page("/api/" + e.currentTarget.id);
  };

  app.addConsumer = function(){
    app.consumer = {};
    page("/addConsumer");
  };

  app.editConsumer = function(e){
    page("/consumer/" + e.currentTarget.id);
  };

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  app.handleRouteResponse = function(e){
    if(e.detail.parseResponse() != null)
      app.routes = e.detail.parseResponse().data;
  };

  app.handleConsumerResponse = function(e){
    if(e.detail.parseResponse() != null)
      app.consumers = e.detail.parseResponse().data;
  };



  app.refreshServerData = function(){
    // TODO: Load info for based on selected server
    app.$.ajaxRoute.url = "/admin/apis";
    app.$.ajaxRoute.generateRequest();

    app.$.ajaxConsumer.url = "/admin/consumers";
    app.$.ajaxConsumer.generateRequest();
  };

  app.onSelectServerChange = function(e) {
    if(e.target.value) {
      app.server = e.target.value;

      // Wipe state data incase of partial data
      // load failure
      this.routes = [];
      this.api = {};
      this.consumers = [];
      this.consumer = {};
      this.plugins = [];
      this.plugin = {};

      app.refreshServerData();
    }
  };

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered

    // Set active server to default value in server_select
    app.server = document.querySelector("#server_select").value;
    app.refreshServerData();

    // Take action when user changes kong server
    document.querySelector("#server_select").onchange = app.onSelectServerChange;
  });

  /* ---- Internal Housekeeping Below --- */

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('.app-name');
    var middleContainer = document.querySelector('.middle-container');
    var bottomContainer = document.querySelector('.bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

})(document);
