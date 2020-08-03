let bypass = document.getElementById('bypass');

bypass.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'bypass_popup.js'});
    });
};