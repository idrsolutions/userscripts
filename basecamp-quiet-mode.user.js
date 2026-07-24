// ==UserScript==
// @name     Basecamp Quiet Mode
// @author   Leon Atherton
// @version  5
// @match    https://3.basecamp.com/*
// @match    https://app.basecamp.com/*
// @downloadURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-quiet-mode.user.js
// @updateURL   https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-quiet-mode.user.js
// @run-at   document-idle
// @grant    none
// ==/UserScript==

// This userscript disables the notification circle in the favicon on Basecamp tabs. It is similar to the native
// 'Focus Mode' however notifications will continue to appear normally within Basecamp.
// It is for people who still want to see there are notifications when browsing Basecamp but do not want Basecamp tabs
// to be calling for attention when focusing on other work in a different tab.

var PLAIN_ICON = "/favicon-32x32.png";

var setIcon = function() {
    Array.from(document.head.querySelectorAll("[rel*='icon']")).filter(icon => icon.getAttribute("href") !== PLAIN_ICON).map(icon => icon.setAttribute("href", PLAIN_ICON));
};

setIcon();
new MutationObserver(setIcon).observe(document.head, { attributes: true, childList: true, subtree: true });
