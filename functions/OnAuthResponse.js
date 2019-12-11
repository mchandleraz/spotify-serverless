const request = require('request');

module.exports = (req, res) => {
  request.post({
    url: 'https://accounts.spotify.com/api/token',
    body: {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: process.env.redirect_uri,
    }
  }, (err, response, body) => {
    res.send(body)
  });
};
