// ==UserScript==
// @name     Basecamp Always Visible Home Button
// @author   Jacob Collins
// @version  1
// @match    https://3.basecamp.com/*
// @match    https://app.basecamp.com/*
// @downloadURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-always-visible-home-button.user.js
// @updateURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-always-visible-home-button.user.js
// @run-at   document-start
// @grant    none
// ==/UserScript==

(function() {
    'use strict';

    const ID = 'bc5-home-button-styles';

    let init = function() {
        if (document.getElementById(ID)) {
            return;
        }

        const style = document.createElement('style');
        style.id = ID;

        style.textContent = `
            .nav__home-link.nav__home-link {
                display: inline-flex !important;
            }`;

        document.documentElement.appendChild(style);
    }

    init();
    document.addEventListener('turbo:load', init);
})();
