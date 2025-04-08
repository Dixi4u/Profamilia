import app from "./app.js";

import "./database.js";

import "./src/config.js";

import {config} from "./src/config.js"

async function main() {
    //const port = 4000;
    app.listen(config.server.port);
    console.log("Me prendio esta babosada" + config.server.port);
}

//Ejecuto la funcion
main();
