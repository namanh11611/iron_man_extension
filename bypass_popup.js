function closePopup(dialog) {
    let btnConfirm = dialog.querySelector('#confirm-button');
    let event = new Event("click", {"bubbles": true, "cancelable": false});
    btnConfirm.dispatchEvent(event);
}

const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
            console.log(mutation);
            const dialog = document.querySelector('yt-confirm-dialog-renderer');
            if (dialog) {
                console.log(dialog);
	              closePopup(dialog);
	          }
        }
    });
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
