// ==UserScript==
// @name     Basecamp Text Shortcuts
// @author   Sam Howard
// @author   Jacob Collins
// @version  3.1
// @match    https://3.basecamp.com/*
// @match    https://app.basecamp.com/*
// @run-at   document-idle
// @grant    none
// ==/UserScript==

(function() {
    'use strict';

    addEventListener("lexxy:initialize", event => {
        const { toolbarElement } = event.target;
        const bulletButton = toolbarElement.querySelector("[data-command=insertUnorderedList]");
        bulletButton.setAttribute("data-hotkey", "ctrl+u cmd+u");
        const numberButton = toolbarElement.querySelector("[data-command=insertOrderedList]");
        numberButton.setAttribute("data-hotkey", "ctrl+o cmd+o");
    })

})();