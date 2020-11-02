var port = chrome.runtime.connect();

window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        port.postMessage(event.data.text);
    }
}, false);

var isEnableIron;
var isIronActive;
var timeOutIron = 0;
chrome.storage.sync.get(['enable_iron', 'iron_active', 'timeout_iron'], function (result) {
    isEnableIron = result.enable_iron == "yes";
    isIronActive = result.iron_active == "yes";
    timeOutIron = result.timeout_iron;
});

setTimeout(function () {
    if (isIronActive) {
        goToSleep();
    } else if (isEnableIron) {
        var timeCountDown = timeOutIron * 60000;
        setTimeout(function () {
            goToSleep();
            chrome.storage.sync.set({ iron_active: 'yes' });
        }, timeCountDown);
    }
}, 5000);

function goToSleep() {
    $("ytd-app").hide();
    $("video").get(0).pause();
    $("body").append("<p style='text-align: center; margin: 200px; font-size: 40px;'>Đã hết thời gian xem Youtube. Vui lòng nghỉ ngơi và dành thời gian ra ngoài vui chơi.</p>");
}