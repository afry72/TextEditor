const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // get deferred prompt
    const clickEvent = window.deferredPrompt;
    if (!clickEvent) {
        // if no prompt exists log it 
        console.log("no click event")
        return;
    }
    //starts installation prompt
    clickEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList('hidden', true);
    console.log("click event finished");
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
