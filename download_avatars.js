const request = require('request');
const fs = require('fs');

const GITHUB_USER = 'hafbau';
const GITHUB_TOKEN = '065146933e39bb482d8cbb1c426d23e81432d3ae';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // create endpoint following GitHub API at https://developer.github.com/v3/repos/#list-contributors
  let endpoint = `@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}` + endpoint;

  let options = {
                  url: requestURL,
                  headers: {
                              'User-Agent': 'GitHub Avatar Downloader - Student Project'
                            }
                };

  request.get(options, function (err, response, body) {

    cb(err, JSON.parse(body));
  });
}


function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
          .on('error', function (err) { throw err; })
          .pipe(fs.createWriteStream(filePath))
}

// calling
getRepoContributors("jquery", "jquery", function(err, result) {
  if(err) console.log("Errors:", err);

  result.forEach(contrib => {
    let path = 'avatars/' + contrib.login + '.jpg';
    downloadImageByURL(contrib.avatar_url, path);
  });
});
