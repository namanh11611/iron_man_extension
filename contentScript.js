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
var timeOutRecover = 0;
var timeStartSleep = 0;
chrome.storage.sync.get(['enable_iron', 'iron_active', 'timeout_iron', 'timeout_recover', 'time_start_sleep'], function (result) {
    isEnableIron = result.enable_iron == "yes";
    isIronActive = result.iron_active == "yes";
    timeOutIron = result.timeout_iron;
    timeOutRecover = result.timeout_recover;
    timeStartSleep = result.time_start_sleep;
});

setTimeout(function () {
    var timeNow = (new Date()).getTime();
    if (isIronActive && ((timeNow - timeStartSleep) < (timeOutIron * 60000))) {
        goToSleepNow();
    } else if (isEnableIron) {
        goToSleepLate();
    }
}, 5000);

function goToSleepNow() {
    var timeSleep = (new Date()).getTime();
    chrome.storage.sync.set({ time_start_sleep: timeSleep });
    $("ytd-app").hide();
    $("video").get(0).pause();
    $("body").append("<p id='nan-block-youtube' style='text-align: center; margin: 200px; font-size: 40px;'>Đã hết thời gian xem Youtube. Vui lòng nghỉ ngơi và dành thời gian ra ngoài vui chơi.</p>");

    wakeUp();
}

function goToSleepLate() {
    var timeCountDown = timeOutIron * 60000;
    setTimeout(function () {
        goToSleepNow();
        chrome.storage.sync.set({ iron_active: 'yes' });
    }, timeCountDown);
}

function wakeUp() {
    var timeWakeUp = timeOutRecover * 60000;
    setTimeout(function () {
        $("ytd-app").show();
        $("#nan-block-youtube").remove();
        chrome.storage.sync.set({ iron_active: 'no' });

        goToSleepLate();
    }, timeWakeUp);
}