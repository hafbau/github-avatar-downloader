require('dotenv').config();

const request = require('request');
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');
let [owner, repo] = (function() {
  if (process.argv.slice(2).length > 1 ) return process.argv.slice(2);
  console.log('Try again with owner and repo e.g "node download_avatar.js owner repo"');
  process.exit(1);
})();

function getRepoContributors(repoOwner, repoName, cb) {
  // create endpoint following GitHub API at https://developer.github.com/v3/repos/#list-contributors
  let endpoint = `@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  let requestURL = `https://${process.env.GITHUB_USER}:${process.env.GITHUB_TOKEN}` + endpoint;

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
          .pipe(fs.createWriteStream(filePath));
}

// calling
getRepoContributors(owner, repo, function(err, result) {
  if(err) console.log("Errors:", err);

  result.forEach(contrib => {
    let path = 'avatars/' + contrib.login + '.jpg';
    downloadImageByURL(contrib.avatar_url, path);
  });
});
