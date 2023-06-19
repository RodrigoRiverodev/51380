import { __dirname, connectMongo, connectSocket } from './utils.js'
import apiRouter from "./router/api.routes.js"
import express from 'express'
import handlebars from 'express-handlebars'
import { initSockets } from './socket/socketServer.js'
import path from 'path';
import viewRouter from './router/view.routes.js'
import { testSocketChatRouter } from "./router/socket.chat.routes.js";
import session from 'express-session';
import productsRouter  from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import viewsRouter from './router/views.router.js';
import { authRouter } from './router/auth.router.js';
import MongoStore from 'connect-mongo';
import { usersRouter } from './router/users.router.js'


const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// MULTER
app.use(express.static( 'src/public'));



app.use(
    session({
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://guido35723776:Pechoncha90@mongo-51380-rivero.aj8pasu.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 1000 }),
      secret: 'un-re-secreto',
      resave: true,
      saveUninitialized: true,
    })
  );
  

app.use('/api', apiRouter)
app.use('/', viewRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Server up and running on port http://localhost:${PORT}`)
})
// SOCKET IO
//Rutas: SOCKETS
app.use("/chat", testSocketChatRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/auth', authRouter)
app.use('/api/users', usersRouter);

initSockets(httpServer)

connectMongo();
connectSocket(httpServer) 




