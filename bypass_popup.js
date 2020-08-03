console.log("Bypass Youtube Script v1.0");

function closePopup(dialog) {
    let btnNode = dialog.querySelector('button');
    let event = new Event("click", {"bubbles": true, "cancelable": false});
    btnNode.dispatchEvent(event);
}

const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target.className === 'dialog-container') {
	        const dialog = document.querySelector('dialog');
	        if (dialog) {
	            closePopup(dialog);
	        }
        }
    });
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
