// Para uso de atutenticação com JWT
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    
    var token = req.headers['x-access-token'];
    console.log('token',token)
   
    if (!token)
        return res.json({ auth: false, message: 'Nenhum token adicionado.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
            return res.json({ auth: false, message: 'Falha na autenticação do token!' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyJWT;
