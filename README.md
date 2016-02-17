# wizipsum

We all have funny mates, right?

* [Demo Page](https://wizbii.github.io/wizipsum)
* [Chrome Extension](https://chrome.google.com/webstore/detail/wizipsum/ncibdpfgnoldfhagojkniefnaokacfhf)

## Add yours

If you want to add your own lorem ipsum, simply submit a pull request that adds a `name.json` file into `public/data`.
Please note that:

* The json should only contain a list of strings (e.g [public/data/wizbii.json](https://github.com/wizbii/wizipsum/blob/gh-pages/public/data/wizbii.json))
* Use a relevant name as that's what you'll share (e.g for a file named **wizbii.json**, you'd have to share [https://wizbii.github.io/wizipsum#wizbii](https://wizbii.github.io/wizipsum#wizbii))

To make it available through the demo page and from the Chrome Extension, add the name to `public/data/index.json`.
If you do so, you'll also need to run `npm run build`.
