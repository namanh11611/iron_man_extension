chrome.storage.sync.get(['enable_iron', 'timeout_iron', 'timeout_recover'], function(result) {
    $("#toggle-enable-iron").prop("checked", result.enable_iron == "yes");
    $("#input-timeout-iron").val(result.timeout_iron);
    $("#input-timeout-recover").val(result.timeout_recover);
});

$(document).ready(function() {
    $("#toggle-enable-iron").change(function(element) {
        chrome.storage.sync.set({enable_iron: this.checked ? 'yes' : 'no'}, function() {
            setTimeout(function() {
                alert("Please reload your browser!");
            }, 1000);
        });
        if (!this.checked) {
            chrome.storage.sync.set({iron_active: 'no'});
        }
    });
    $("#input-timeout-iron").on("keyup", function(element) {
        var input = $(this);
        var regex = /^[1-9][0-9]*$/;
        if (input.val().match(regex)) {
            input.removeClass("invalid").addClass("valid");
        } else {
            input.removeClass("valid").addClass("invalid");
        }
        chrome.storage.sync.set({timeout_iron: input.val()});
    });
    $("#input-timeout-recover").on("keyup", function(element) {
        var input = $(this);
        var regex = /^[1-9][0-9]*$/;
        if (input.val().match(regex)) {
            input.removeClass("invalid").addClass("valid");
        } else {
            input.removeClass("valid").addClass("invalid");
        }
        chrome.storage.sync.set({timeout_recover: input.val()});
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