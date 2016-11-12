/*jslint node: true, esversion: 6 */
"use strict";


/**
 * CONTINUOUS DEPLOYMENT
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 *         Getting Contentful — Github — Netlify all talking to eachother
 *         Contentful: CaaS
 *         GitHub: Repositories & Pages
 *         Netlify: The build
 *
 * @requires fs
 * @requires pug
 */



// THE REQUIREMENTS
const dotenv  = require('dotenv').config();
const fs      = require('fs');
const pug     = require('pug');
const request = require('request');


// THE REQUEST
const apiKey = encodeURIComponent(process.env.CONTENTFUL_API_KEY);
const spaceId = encodeURIComponent(process.env.CONTENTFUL_SPACE_ID);
const url = 'https://cdn.contentful.com/spaces/' + spaceId + '/entries?access_token=' + apiKey;

const getSpace = url => {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to fetch space');
      } else {
        resolve(body.items);
      }
    });
  });
};


// INDEX PAGE
const index = pug.compileFile('templates/index.pug');
const post = {
  title: 'Contentful — Github — Netlify',
  content: 'Getting Netlify to pull repository from Github, manage the build and deploy to Github pages. And we have continuous deployment from Github set up. But everything else is turning out to be a bitch.'
};

getSpace(url).then((items) => {
  post.list = [];
  items.forEach(i => post.list.push(i.fields.title));
  fs.writeFileSync('.build/index.html', index(post));
});
