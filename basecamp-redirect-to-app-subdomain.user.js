// ==UserScript==
// @name         Basecamp Redirect 3 to app Subdomain
// @author       Jacob Collins
// @version      1
// @match        https://3.basecamp.com/*
// @downloadURL  https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-redirect-to-app-subdomain.user.js
// @updateURL    https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-redirect-to-app-subdomain.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const newURL = new URL(window.location.href);
    newURL.hostname = 'app.basecamp.com';
    window.location.replace(newURL.toString());
})();
