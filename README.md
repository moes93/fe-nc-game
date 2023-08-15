# Northcoders Games 🎮

🎰 Hello fellow gamers and welcome to my Games Website! 🎰

I have developed a social games content rating, and discussion website. Northcoders Games has game reviews which are divided into categories.
Each review has user curated ratings and can be up or down voted using the API. Users can also add and delete comments about an review.

You can also access my Games website live by clicking on this link 🔗 [here](https://msncgames.netlify.app/) or by copying the following url to your browser 🔗 `https://msncgames.netlify.app/`

This Website is built by using my back-end API which can be found 🔗 [here](https://github.com/moes93/mohamed-nc-games) or by copying the following url to your browser 🔗 `https://github.com/moes93/mohamed-nc-games`

Important Notes: You will need to have Node.js v19.3.0 or later!

## ♟️ Getting started

First you need to clone this repository to your local machine by using 🔗 `git clone https://github.com/moes93/fe-nc-game`

Next we need to install the following dependencies by using `npm install `:

`react`

`react-dom`

`react-router-dom`

`react-scripts`

`axios`

If you like to use Bootstrap styling you could install the following dependencies by using `npm install `:

`bootstrap`

`react-bootstrap`

## 🪁 Setup Redirects

Add a file, ``_redirects`` (no file extension) to your public directory. This file should contain the redirect rule: ``/*  /index.html 200``. This is telling Netlify "if a request comes in to any endpoint on our base url - serve our index.html page and give a 200 status". We put this in the public directory to ensure that Webpack includes this file in the production build of the app.

## 🏆 Hosting and deploying the website

To host your website and render it online you can use a free service on 🔗 `https://www.netlify.com/`. Deploy an new website by connecting your git-hub repository.

Please use the following command to create a production version of your app:

`npm run build`

Finally you can deploy your website on netlify dashboard.
