// ==UserScript==
// @name     Basecamp 4 Column Home Screen
// @author   Jacob Collins
// @version  2
// @match    https://3.basecamp.com/*
// @match    https://app.basecamp.com/*
// @downloadURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-four-column-home-screen.user.js
// @updateURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/basecamp-four-column-home-screen.user.js
// @run-at   document-start
// @grant    none
// ==/UserScript==

(function() {
    'use strict';

    const ID = 'bc5-4column-home-styles';

    let init = function() {
        if (document.title.trim() !== 'Home') {
            document.getElementById(ID)?.remove();
            return;
        }

        if (document.getElementById(ID)) {
            return;
        }

        const style = document.createElement('style');
        style.id = ID;

        style.textContent = `
            @media (min-width: 110rem) {
                #home_menu {
                    inline-size: 96rem !important;
                }

                .home-menu.nav-menu__sheet--jump.nav-menu__sheet--jump {
                    max-width: 1400px !important;
                    width: 100% !important; min-width:
                    1100px !important;
                }
                .home-menu__scroller.home-menu__scroller,
                .home-card-grid.home-card-grid,
                #my-navigation-menu-listbox,
                .home-card-grid__cards.home-card-grid__cards,
                .home-card-grid__panel.home-card-grid__panel {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                #home_project_cards .card-grid--home.card-grid--home {
                    --card-grid-columns: 4 !important;
                    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
                }
            }`;

        document.documentElement.appendChild(style);
    }

    init();
    document.addEventListener('turbo:load', init);
})();
