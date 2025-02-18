
//App de back de Orion

import { Server } from "./Server"

(()=>(
    main()
))()

function main (){
    const port = 3000;
    const server = new Server(port)

    server.start()
}
