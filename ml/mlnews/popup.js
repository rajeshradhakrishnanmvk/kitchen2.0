class InitPopup {
    constructor() {
        this.RssUrl = "https://www.deshabhimani.com/rss/kerala";
    }

    async populatePopup() {
        await fetch(this.RssUrl).then((res) => {
            res.text().then((plainxml) => {

                var domParser = new DOMParser();
                var xmlParsed = domParser.parseFromString(plainxml, 'text/xml');
                let index = 0;
                xmlParsed.querySelectorAll('item').forEach((item, index) => {
                    // Creating the render
                    var h1 = document.createElement('h1');
                    h1.textContent = item.querySelector('title').textContent;

                    var publicationDate = document.createElement('span');
                    publicationDate.textContent = item.querySelector('pubDate').textContent;
                    var link = document.createElement('a');
                    link.setAttribute('id', 'link-' + index);
                    link.appendChild(h1);
                    link.appendChild(publicationDate);
                    link.onclick = function () {
                        chrome.tabs.create({ active: true, url: item.querySelector('link').textContent });
                    };

                    document.getElementById('render-div').appendChild(link);
                })

                let newsdata = [];
                xmlParsed.querySelectorAll('item').forEach((item) => {
                    newsdata.push(item.querySelector('title').textContent);
                })

                this.postData('http://localhost:8080/api/get-classify', { "text": newsdata });
            })
        });


    }


    async postData(url = '', data = {}) {
        console.log(JSON.stringify(data));
        const response = await fetch(url, {
            method: 'POST',// *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
        ).then((response) => {
            if (response.ok) {
                // parses JSON response into native JavaScript objects
                return response.json();
            }
            throw new Error('Something went wrong');
        })
            .then((responseJson) => {
                //console.log(responseJson); // JSON data parsed by `data.json()` call
                //console.log(responseJson["classified"][0]["label"]);
                // ['business', 'entertainment', 'sports', 'technology']
                document.querySelectorAll("a").forEach((item, index) => {
                    var cat = "UNKOWN";
                    switch (responseJson["classified"][index]["label"]) {
                        case "LABEL_0":
                            cat = "business";
                            break;
                        case "LABEL_1":
                            cat = "entertainment";
                            break;
                        case "LABEL_2":
                            cat = "sports";
                            break;
                        case "LABEL_3":
                            cat = "technology";
                            break;
                    }
                    var category = document.createElement('span');
                    category.textContent = " " + cat;
                    item.appendChild(category)
                })

                return responseJson;
            })
            .catch((error) => {
                console.log(error)
            });
    }

}

// Au click sur la popup
chrome.browserAction.setBadgeText({ text: '' });
new InitPopup().populatePopup();