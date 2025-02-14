
//App de back de Orion

import { Server } from "./Server"

(()=>(
    main()
))()

async function main (){
    const port = 3000;
    const server = new Server(port)


    server.start()
}
