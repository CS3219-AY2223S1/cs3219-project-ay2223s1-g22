import express from 'express';
import cors from 'cors';
import { checkIfAuthenticated } from './middleware/firebase-middleware.js';
import { createUserAccount, deleteUser, loginUser, logoutUser, resetPassword } from './controller/user-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'));
router.get('/firebaseauth/authenticate', checkIfAuthenticated, (_, res) => res.send("true"));
router.post('/firebaseauth/login', loginUser);
router.post('/firebaseauth/signup', createUserAccount);
router.post('/firebaseauth/logout', logoutUser);
router.post('/firebaseauth/deleteuser', deleteUser);
router.post('/firebaseauth/resetpassword', resetPassword);

app.use('/api', router).all((_, res) => {
	res.setHeader('content-type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'));