# Chrome Extension

As developers, we often need to fill forms with fake data.
So most of the times we end up punching our keyboard to get some random combination of `oedsqkdmqslkdzakdmz`.
But that's clearly not nice nor a "real world" input.

wizipsum's Chrome Extension allow you to quickly fill inputs with random funny strings.
Here are a couple of its features:

* Insert titles and/or paragraphs with funny lorem ipsum text
* Insert an email/url (they are both customisable)
* Triggers the usual behavior (meaning frameworks such as Angular properly update their states)
* Copy text to the clipboard

## Add your data

If you want to add your own lorem ipsum version, have a look at the demo page's "[Add yours](https://github.com/wizbii/wizipsum/tree/gh-pages#add-yours)" section.
When your data gets merged, to make it available through the Chrome Extension, here is the process:

1. Fetch the data from the gh-pages branch: `npm run fetch`
2. Build a new version of the extension: `npm run build`
3. Submit an update to Chrome web store
