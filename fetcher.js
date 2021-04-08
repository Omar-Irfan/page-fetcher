let args = process.argv.slice(2);
let url = args[0];
let local = args[1];
const request = require('request');
const fs = require('fs');

const Page = function(callback) {
  request(url, (error, response, body) => {
    if (error) {
      console.log('error:', error);
    } else if (response.statusCode !== 200) {
      console.log('response error');
    } else {
      callback(body);
    }
  });
};

const download = function(htmlBody) {
  fs.writeFile(local, htmlBody, (error) => {
    if (error) {
      console.log('error:', error);
    } else {
      const stats = fs.statSync(local);
      const fileSize = stats.size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${local}`);
    }
  });
};
Page(download);