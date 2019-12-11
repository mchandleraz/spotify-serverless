const request = require('request');

module.exports = {
  Authorization(req, res) {
    if (!req.query.code) {
      const scopes = 'user-read-private user-read-email';
      const { client_id, redirect_uri } = process.env;

      return res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
    }

    const postBody = {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: process.env.redirect_uri,
    };
    console.log(postBody)

    request.post({
      url: 'https://accounts.spotify.com/api/token',
      body: JSON.stringify(postBody),
      json: true,
    }, (err, response, body) => {
      if (err) {
        console.log('err', err)
        return res.sendStatus(500)
      }

      console.log('body', body)

      res.sendStatus(200);
    });
  }
}
