const { async } = require("@firebase/util");
var admin = require("firebase-admin");

var serviceAccount = require("./pb-coder-firebase-adminsdk-9vrxp-9e1c60aac0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firestore conectado')

const CRUD = async ()=>{
    const db = admin.firestore()
    query = db.collection('productos')

    try{
        const doc = query.doc()
        await doc.create({
            title: 'Producto1',
            price: 123
        })
        console.log('Usuario creado')

    }catch(error){
        console.log(error)
    }
}
CRUD()
