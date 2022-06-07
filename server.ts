import express from "express";
import cors from "cors";
import {config as dotenvConfig} from "dotenv";
// routers
import SimplexRouter from './routes/simplex';
class Server {
    public app: express.Application;
    constructor() {
        
        this.app = express();
        this.config();
        this.routes();
    }
    config(){
        dotenvConfig();
        this.app.set('port', process.env.PORT || 3020);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        
        
    }
    routes(){
        this.app.use('/api',SimplexRouter); 
    }

    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log("server listenig in port "+this.app.get('port'));
        });
    }
}
let server = new Server();

server.start();