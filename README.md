# Introduction

This repo has been made to provide a (very quick and dirty) way of a one-way integration from Trello to our website.
If you are willing to do so, you will propably easy be able to find a lot of security issues. Please do not exploit them, since we are only a small student council which just wants to get more efficiency in their workflow and to realize that with very limited resources.

# Architecture

Actually, an integration consists of three components:

1. The HTML script tag on the webpage and the HTML anchor the content is supposed to be displayed in
2. The JS File which will be run when included in the above script tag, which has both card code and id of the upper HTML anchor stored
3. The Trello card which is being used to control your content

When the page is being loaded, the JS file will be loaded and run. In that script, the content of the card with the given code is requested from the Atlassian REST API, some operations performed on it and then be displayed in the HTML anchor with the given id.

The JS file will be served via GitHub Pages, which is being used as a CDN. So whenever you push something on the master branch, it will be accessible through the link.

# Adding a new integration

For a new integration, you only need those three things:

1. A Trello card and its card code
2. An HTML anchor on the site where you want to display your content
3. The (JS implemented) logic in between

We recommend to start like that.

1. Create a folder with a meaningful name.
2. Create a file index.js in it, it is recommended to use the template provided in sample-integration/index.js
3. Rename the config vars in that file with your configs (card code and id of HTML anchor)
4. Copy the template section from github-dev.html as HTML into your page
5. Replace the folder path in the script source url with the name of your newly created directory. For example, if your new folder would be my-cool-new-integration, then the new src attribute would be https://it-stuv-heidenheim.github.io/my-cool-new-integration/index.js.
6. Push your changes and see the description of your card. If there isn't any description yet, you will see a placeholder text.

# Existing integrations documentation

| Page title             | Page Path           | Trello List | Trello Card Title | Short description                                                                                                    |
| ---------------------- | ------------------- | ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| The sample integration | /sample-integration | Test        | Wetter am Samstag | This is just to test whether everything is working properly. Actually meant to learn the integrations for a student. |

Syntax:

### <PAGE TITLE> - /<PATH>

- <FUNCTIONAL NAME>: <TRELLO LIST>/<TRELLO CARD TITLE>

Our example would then be documented as following:

### Sample integration - /sample-integration

- The sample integration

### Sitzung - /sitzung

- Agenda: StuV-Sitzung
- Link:
