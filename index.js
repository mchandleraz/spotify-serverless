const request = require('request');

module.exports = {
  Authorization(req, res) {
    const { client_id, redirect_uri, client_secret } = process.env;
    const { code } = req.query;

    if (!code) {
      return res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent('user-read-private user-read-email')}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
    }

    const postBody = {
      client_id,
      redirect_uri,
      client_secret,
      code: code,
      grant_type: 'authorization_code',
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

      console.log('response', Object.keys(response))
      console.log('body', body)

      res.sendStatus(200);
    });
  }
}
