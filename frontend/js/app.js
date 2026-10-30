async function loadPage(tabId) {
    const content = document.getElementById(`${tabId}-tab-pane`);
    try {
        const response = await fetch(`./${tabId}.html`);
        if (!response.ok) {
            throw new Error('Page not found');
        }

        const html = await response.text();

        content.innerHTML = html;

    } catch (error) {
        console.error('Error fetching data:', error);
        content.innerHTML = `<p>Error loading content.</p>`;
    }
}

loadPage('home');

document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
    tab.addEventListener('shown.bs.tab', (event) => {
        const tabId = event.target.id.replace('-tab', '');
        loadPage(tabId);
    });
});