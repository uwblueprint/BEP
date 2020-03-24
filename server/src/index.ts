import { BackendServer } from './server'

const port = process.env.PORT || "3030";

/**
 *  Server Configuration
 */

<<<<<<< HEAD
/**
 *  App Configuration
 */


 
const server = new TestServer();
=======
const server = new BackendServer();
>>>>>>> 29ef92502fe1d4b8f1e4aebf74a1d62f661834a8
server.start(port);


