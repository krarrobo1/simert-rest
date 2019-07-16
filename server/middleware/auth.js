const JWT = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.get('Authorization');
    JWT.verify(token, process.env.SEED, (err, decoded) => {
        if (err) return res.status(401).json({ ok: false, err: { message: 'Token no valido' } });
        // Si coincide escribe una propiedad usuario en el request
        // decoded (payload del token)
        req.user = decoded.user;

        // Continua con el flujo de ejecucion
        next();
    });
}

function verifyAgentRole(req, res, next) {
    let usuario = req.user;
    if (usuario.role !== 'AGENT_ROLE') return res.status(400).json({ ok: true, message: 'Agent permissions denied' });
    console.log('Correcto!');
    next();
}

module.exports = { verifyToken, verifyAgentRole }