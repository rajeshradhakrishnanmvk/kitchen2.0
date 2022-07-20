chrome.alarms.create("every5min", {
    periodInMinutes: 5
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "every5min") {
        checkIfNewContent();
    }
});


var RssUrl = "https://www.deshabhimani.com/rss/kerala";


function checkIfNewContent() {

    fetch(RssUrl).then((res) => {
        res.text().then((plainxml) => {

            var domParser = new DOMParser();
            var xmlParsed = domParser.parseFromString(plainxml, 'text/xml');

            var lastBuildDate = xmlParsed.querySelectorAll('lastBuildDate')[0].textContent;

            chrome.storage.local.get('lastbuild', function (result) {
                if (result.lastbuild != lastBuildDate) {
                    chrome.storage.local.set({ 'lastbuild': lastBuildDate }, function () {
                        chrome.browserAction.setBadgeText({ text: 'News' });
                        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
                    });
                }

            });

        })
    });


}