chrome.storage.sync.get(['enable_iron', 'timeout_iron'], function(result) {
    console.log("Get Iron Man: " + result.enable_iron);
    $("#toggle-enable-iron").prop("checked", result.enable_iron == "yes");
    $("#input-timeout-iron").val(result.timeout_iron);
});

$(document).ready(function() {
    $("#toggle-enable-iron").change(function(element) {
        chrome.storage.sync.set({enable_iron: this.checked ? 'yes' : 'no'}, function() {
            console.log("Enable Iron Man: " + (this.checked ? 'yes' : 'no'));
            setTimeout(function() {
                alert("Please reload your browser!");
            }, 1000);
        });
        if (!this.checked) {
            chrome.storage.sync.set({iron_active: 'no'});
        }
    });
    $("#input-timeout-iron").on("keyup", function(element) {
        console.log("Change timeout: " + $("#input-timeout-iron").val());
        chrome.storage.sync.set({timeout_iron: $("#input-timeout-iron").val()});
    });
});

// let bypass = document.getElementById('bypass');

// bypass.onclick = function(element) {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             {file: 'bypass_popup.js'});
//     });
// };