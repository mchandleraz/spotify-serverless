module.exports = function Authorization(req, res) {
  const scopes = 'user-read-private user-read-email';
  const { client_id, redirect_uri } = process.env;

  res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
}
