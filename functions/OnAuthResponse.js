exports.OnAuthResponse = (req, res) => {
    console.log(req.query)
    res.send(200);
};