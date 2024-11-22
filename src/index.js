import { initializeApp } from "firebase/app"
import { 
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, updateDoc, doc,
    query, where,
    serverTimestamp,
    getDoc
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBERsHEcDv6yI9GW8hAywGOTWrr8zqMVdM",
    authDomain: "belajar-firebase-7b55d.firebaseapp.com",
    projectId: "belajar-firebase-7b55d",
    storageBucket: "belajar-firebase-7b55d.firebasestorage.app",
    messagingSenderId: "988812323254",
    appId: "1:988812323254:web:5b7d1df51d2196d30cf917"
}

initializeApp(firebaseConfig)

const db = getFirestore()
const colRef = collection(db, "boxers")

// queries
// const q = where(colRef, where("weight", "==", "57"))

// get realtime collection data
onSnapshot(colRef, (snapshot) => {
    let boxers = []
    snapshot.docs.forEach((doc) => {
        boxers.push({ ...doc.data(), id: doc.id })
    })
    console.log(boxers)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  addDoc(colRef, {
    name: addBookForm.name.value,
    weight: addBookForm.weight.value,
    createdAt: serverTimestamp()
  }).then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, "boxers", deleteBookForm.id.value)
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset()
    })
})

// get a single document
const docRef = doc(db, "boxers", "G8tH5pA0yNZZOAHGsHt5")

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector(".update")
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, "boxers", updateForm.id.value)
  updateDoc(docRef, {
    title: "juanda lopan hasbiadi"
  }).then(() => {
    updateForm.reset()
  })
})