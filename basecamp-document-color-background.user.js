// ==UserScript==
// @name     Basecamp Docs & Files Background Color
// @author   Jacob Collins
// @version  1.1
// @match    https://3.basecamp.com/*
// @match    https://app.basecamp.com/*
// @downloadURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-document-color-background.user.js
// @updateURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-document-color-background.user.js
// @run-at   document-start
// @grant    none
// ==/UserScript==

(function() {
    'use strict';

    const ID = 'bc4-document-color-background';

    let init = function() {

        if (document.getElementById(ID)) {
            return;
        }

        const style = document.createElement('style');
        style.id = ID;

        style.textContent = `
            .vault__content .vaultable-line.vaultable-line {
                background: color-mix(in oklab, var(--recording-color) 20%, transparent);
            }
        `;

        document.documentElement.appendChild(style);
    }

    init();
    document.addEventListener('turbo:load', init);
})();
