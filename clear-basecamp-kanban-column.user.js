// ==UserScript==
// @name     Clear Basecamp Kanban List
// @author   Jacob Collins
// @version  2.1
// @match    https://3.basecamp.com/*
// @match    https://app.basecamp.com/*
// @downloadURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/clear-basecamp-kanban-column.user.js
// @updateURL https://github.com/idrsolutions/userscripts/raw/refs/heads/main/clear-basecamp-kanban-column.user.js
// @run-at   document-idle
// @grant    none
// ==/UserScript==

async function trashCard(cardId) {
    const csrfToken = document.querySelector('meta[name=csrf-token]')?.content;
    if (!csrfToken) {
        console.error('Failed to trash card', cardId, 'No CSRF token');
    }

    const accountSlug = document.querySelector('meta[name=current-account-slug-path]')?.content;
    if (!accountSlug) {
        console.error('Failed to trash card', cardId, 'No account slug');
    }

    const bucketId = document.querySelector('meta[name=current-bucket-id]')?.content;
    if (!bucketId) {
        console.error('Failed to trash card', cardId, 'No bucket ID');
    }

    const url = `${window.location.origin}${accountSlug}/buckets/${bucketId}/recordings/${cardId}/status/trashed.json`;

    const res = await fetch(url, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        }
    });

    if (!res.ok && res.status !== 204) {
        console.error('Failed to trash card', cardId, res.status);
    }
}

let addButtonToColumn = function(kanbanColumn) {
    if (kanbanColumn.querySelector('.custom-remove-item')) {
        return;
    }

    const listItem = document.createElement('ul');
    listItem.className = 'custom-remove-item action-list';

    const button = listItem
            .appendChild(document.createElement('li'))
            .appendChild(document.createElement('button'));
    button.className = 'action-list__action';
    button.innerHTML = 'Trash all cards';

    kanbanColumn.querySelector('.action-menu.action-menu__content').
            appendChild(listItem);

    button.addEventListener('click', async function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (button.disabled) {
            return;
        }

        button.disabled = true;

        try {
            const cards = kanbanColumn.getElementsByClassName('kanban-card__wrap');
            for (const card of Array.from(cards)) {
                const cardId = card.getAttribute('data-drag-and-drop-id');

                if (!cardId ) {
                    console.warn('Missing card', card);
                    return;
                }

                await trashCard(cardId);
            }
        } finally {
            button.disabled = false;
        }
    });
}

let init = function() {
    const columns = document.getElementsByClassName('kanban-column__content');
    Array.from(columns).forEach(addButtonToColumn);
}

init();
document.addEventListener('turbolinks:load', init);
