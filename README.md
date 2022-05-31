# Introduction

This repo has been made to provice a very dirty way of a one-way integration from Trello to our website.

# Architecture

On each site, there is an HTML anchor

# Adding a new integration

For a new integration, you basically need only three things;

1. A Trello card and its card code
2. An HTML anchor on the site where you want to display your content
3. The logic in between

We recommend to start like that.

1. Create a folder with a meaningful name.
2. Create a file index.js in it, it is recommended to use the template provided in sample-integration/index.js
3. Rename the config vars in that file with your configs (card code and id of HTML anchor)
4. Copy the template section from github-dev.html as HTML into your page
5. Replace the folder path in the script source url with the name of your newly created directory. For example, if your new folder would be my-cool-new-integration, then the new src attribute would be https://it-stuv-heidenheim.github.io/my-cool-new-integration/index.js.
6. Push your changes and see the description of your card. If there isn't any description yet, you will see a placeholder text.
