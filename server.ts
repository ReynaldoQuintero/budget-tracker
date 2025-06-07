import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { passporInitialize } from './src/utils/passport.utils';
import passport from 'passport';
import { initializeDatabase } from './src/models/db';
import session from 'express-session';
import { authRoutes } from './src/controllers/auth.controller';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  // Here, we now use the `AngularNodeAppEngine` instead of the `CommonEngine`
  const angularNodeAppEngine = new AngularNodeAppEngine();

  initializeDatabase();

  server.use(
    session({
      secret: process.env['SESSION_SECRET'] || 'my_secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
      },
    })
  );

  passporInitialize();

  // Initialize passport and session
  server.use(passport.initialize());
  server.use(passport.session());

  server.use(authRoutes);

  server.get('/api/test', (req, res, next) => {
    console.log('Test');
    res.send({ response: 'OK' });
  });

  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // With this config, /404 will not reach the Angular app
  server.get('/404', (req, res, next) => {
    res.send('Express is serving this server only error');
  });

  server.get('**', (req, res, next) => {
    // Yes, this is executed in devMode via the Vite DevServer
    console.log('request', req.url);

    angularNodeAppEngine
      .handle(req, { user: req.user })
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next()
      )
      .catch(next);
  });

  return server;
}

const server = app();
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

console.warn('Node Express server started');

// This exposes the RequestHandler
export const reqHandler = createNodeRequestHandler(server);
