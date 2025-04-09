import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../db/entities/User.js';

const authenticate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let token = req.headers['authorization'] || '';
  token = token.replace(/^Bearer\s+/i, ''); // Remove o prefixo "Bearer"
  let tokenIsValid;
  try {
    tokenIsValid = jwt.verify(token, process.env.SECRET_KEY || '');
  } catch (error) { }

  if (tokenIsValid) {
    const decoded = jwt.decode(token);
    res.locals.user = decoded;
    next();
  } else {
    res.status(401).send("You are Unauthorized!");
  }
}

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }, relations: ["roles"] });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ email: user.email, name: user.name }, process.env.SECRET_KEY || "", { expiresIn: "2w" });
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.roles[0]?.name || "user",
      },
    });
  } else {
    res.status(401).send("Invalid email or password");
  }
};

export { authenticate, login };