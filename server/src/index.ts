import { TestServer } from './server'

const port = process.env.PORT || 3030;

/**
 *  App Configuration
 */

const server = new TestServer();
server.start(port);
