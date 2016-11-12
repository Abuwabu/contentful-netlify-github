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
const fs = require('fs');
const pug = require('pug');



const index = pug.compileFile('templates/index.pug');
const post = {
  title: 'Contentful — Github — Netlify',
  content: 'Getting Netlify to pull repository from Github, manage the build and deploy to Github pages. And we have continuous deployment from Github set up.'
};

const data = index(post);
fs.writeFileSync('.build/index.html', data);
