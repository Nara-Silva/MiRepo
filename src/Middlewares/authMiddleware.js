const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Entre al authMidlleware")
  console.log("Authorization recibido:", req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("Entre al error de authMidlleware")
    return res.status(401).json({ error: "Token faltante o inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; 
    console.log("Usuario encontrado con el jwt verify", decoded);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;
