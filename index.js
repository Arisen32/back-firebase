const express = require('express')
const bcrypt = require('bcrypt')
const {initializeApp} = require('firebase/app')
const {getFirestore, collection, getDoc, doc, setDoc, getDocs, deleteDoc, updateDoc} = require('firebase/firestore')
const cors = require('cors')
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
const corsOptions = {
  "origin":"*",
  "optionsSucessStatus": 200
}
app.use(express.json())
app.use(cors(corsOptions))




//rutas peticiones E
app.post('/registro', (req, res) => {
  const {name, lastname, email, password, number} = req.body
  //validaciones de datos
  if(name.length < 3){
    res.json({
      'alert':'nombre requiere 3 caracteres minimo'
    })
  }else if (!email.length){
    res.json({
      'alert': 'escribe un correo electronico'
    })
    
  }else if (password.length < 8){
    res.json({
      'alert': 'password minimo de 8 caracteres'
    })
  }else if (!Number(number) || number.length < 10){
    res.json({
      'alert': 'introduce un telefono'
    })
  }else{
    const users = collection(db, 'users')
    //verificar que no exista ese correo
    getDoc(doc(users,email)).then(user => {
      if(user.exists()){
        res.json({
          'alert': 'ya existe el correo'
        })
      }else{
        bcrypt.genSalt(10, (err,salt) =>{
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash 

            //guardarla en bd
            setDoc(doc(users,email), req.body).then(reg => {
              res.json({
                'alert': 'si se pudo👌👌👌',
                'data': reg
              })
            })
          })
        })
      }
    })
  }
})

app.get('/usuarios',async(req,res) => {
  const colRef = collection(db, 'users')
  const docsSnap = await getDocs(colRef)
  let data= []
  docsSnap.forEach(doc => {
data.push(doc.data())
  })
  res.json({
    'alert':'success',
    data
  })
})

app.post('/login', (req,res) => {
 let {email,password} = req.body
 if (!email.length || !password.length) {
   return res.json({
    'alert':'no se hay datos correctos'
  })
 } 
 const users = collection(db, 'users')
 getDoc(doc(users, email))
 .then(user => {
  if (!user.exists) {
    return res.json({
      'alert':'no se ha registrado el correo'
    })
  }else{
    bcrypt.compare(password, user.data().password, (error, result) => {
if (result) {
  let data = user.data()
  res.json({
    'alert':'Success',
    name: data.name,
    email: data.email
  })
}else{
  return res.json({
    'alert':'password incorrecto'
  })
}
    })
  }
 })
})

//ruta borrar
app.post('delete', (res,req) => {
  let { id } = req.body

  deleteDoc(doc(collection(db, 'users'), id))
  .then((response) => {
   res.json({
    'alert':'success'
   })
  })
  .catch((error) => {
    res.json({
      'alert': error
    })
  }) 
})

app.post('update', (res,req) => {
  const {name, number} = req.body
  //validaciones de datos
  if(name.length < 3){
    res.json({
      'alert':'nombre requiere 3 caracteres minimo'
    })
  }else if (!Number(number) || number.length < 10){
    res.json({
      'alert': 'introduce un telefono'
    })
  }else{
db.collection('users').doc(id)
const updateData = {
  name,
  lastname,
  number
}
    updateDoc(doc(db, 'users'), updateData, id)
    .then((response) => {
     res.json({
      'alert':'success'
     })
    })
    .catch((error) => {
      res.json({
        'alert': error
      })
    }) 
  }
})

app.post('getallusers',async (res,req) => {
 
  
    await this.$axios.get('/getallusers', config)
    .then((res) => {
        console.log('res', res)
    })
    .catch((error) => {
        console.log('error', error)
    })



})




 




const PORT = process.env.PORT || 19000


//ejecutar el servidor
app.listen(PORT, () =>{
    console.log(`se escucha ${PORT}`)
})
