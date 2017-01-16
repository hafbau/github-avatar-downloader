const request = require('request');

const GITHUB_USER = 'hafbau';
const GITHUB_TOKEN = '065146933e39bb482d8cbb1c426d23e81432d3ae';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // create endpoint following GitHub API at https://developer.github.com/v3/repos/#list-contributors
  let endpoint = `@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}` + endpoint;

  request.get(requestURL, function (err, response) {
    cb(err, response);
  });
}




// calling
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});