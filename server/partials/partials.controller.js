exports.index = function(req, res) {
    res.render('index');
};

exports.partials = function(req, res) {
	var api = req.params.api;
    var name = req.params.name;
    res.render('partials/' + api + '/' + name);
};