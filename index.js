const express = require('express')
const bcrypt = require('bcrypt')
const {initializeApp} = require('firebase/app')
const {getFirestore} = require('firebase/firestore')
require('dotenv/config')

//configuracion de la firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjIb_A2GoxBwG_kyvT9Cr_nmJjz5pRogQ",
    authDomain: "back-firebase-e6748.firebaseapp.com",
    projectId: "back-firebase-e6748",
    storageBucket: "back-firebase-e6748.appspot.com",
    messagingSenderId: "92595115631",
    appId: "1:92595115631:web:e8f69c74ceb9471395df9a"
  };

//inicializar bd
const firebaseapp = initializeApp(firebaseConfig)
const db = getFirestore()
//iniciar el server
const app = express()

const PORT = process.env.PORT || 19000
//ejecutar el servidor
app.listen(PORT, () =>{
    console.log(`se escucha ${PORT}`)
})
