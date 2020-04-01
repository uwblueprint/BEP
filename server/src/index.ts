import { BackendServer } from './server';

const port = process.env.PORT || '3030';

/**
 *  Server Configuration
 */

const server = new BackendServer();
server.start(port);
