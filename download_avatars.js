var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // create endpoint following GitHub API at https://developer.github.com/v3/repos/#list-contributors
  let endpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`; 

  request.get(endpoint, function (err, response) {
    cb(err, response);
  });
}




// calling
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});