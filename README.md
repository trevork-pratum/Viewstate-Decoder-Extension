# Viewstate Decoder Extension
 A Chrome extension to detect, notify, and decode Viewstate variables within the HTML of a page.

# How to Install and Use
 To install, clone the repo into an empty folder. Open chrome://extensions, select "Load unpacked", and select the folder where the repo was cloned into.
 To use, the extension will place a red HTML div at the top of any page with a detected Viewstate within the HTML (even if it is empty). On the page, you can click on the extension and get the base64 (raw) value, copy it to your clipboard, or decode it.

# Permissions
 The extension requires read access to all sites. You are free to edit the manifest file or restrict the permissions further if needed.

# TODO
 - Add auto decode and regex search feature for common strings (passwords, API keys, etc.)
 - Clean up popup.html UI
 - Add site exclusion list and other ease-of-use enhancements.

# Inspiration
 I was inspired to make this extension so that I can keep track of normal sites that have decodable Viewstate variables. I also wanted to make an offline version of a decoder to prevent possible privacy concerns.

# License and Credit
 This extension is licensed under GPLv2. Certain Viewstate parsing JS files are licensed under MIT (see Parser.js).
 This project using the JS Viewstate Parser from https://github.com/mutantzombie/JavaScript-ViewState-Parser
