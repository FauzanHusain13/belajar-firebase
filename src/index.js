import { initializeApp } from "firebase/app"
import { 
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, updateDoc, doc,
    query, where,
    serverTimestamp,
    getDoc
} from "firebase/firestore"

import { 
        getAuth,
        createUserWithEmailAndPassword,
        signOut,
        signInWithEmailAndPassword,
        onAuthStateChanged
      } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBERsHEcDv6yI9GW8hAywGOTWrr8zqMVdM",
    authDomain: "belajar-firebase-7b55d.firebaseapp.com",
    projectId: "belajar-firebase-7b55d",
    storageBucket: "belajar-firebase-7b55d.firebasestorage.app",
    messagingSenderId: "988812323254",
    appId: "1:988812323254:web:5b7d1df51d2196d30cf917"
}

initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()
const colRef = collection(db, "boxers")

// queries
// const q = where(colRef, where("weight", "==", "57"))

// get realtime collection data
const unsubCol = onSnapshot(colRef, (snapshot) => {
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
// const docRef = doc(db, "boxers", "G8tH5pA0yNZZOAHGsHt5")

// onSnapshot(docRef, (doc) => {
//   console.log(doc.data(), doc.id)
// })

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

// signup user
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password).then((credential) => {
    // console.log("user created :", credential.user)
    signupForm.reset()
  }).catch((err) => {
    console.log(err.message)
  })
})

// login & logout user
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password).then((credential) => {
    // console.log("user login :", credential.user)
    loginForm.reset()
  }).catch((err) => {
    console.log(err.message)
  })
})

const logoutForm = document.querySelector('.logout')
logoutForm.addEventListener('click', (e) => {
  signOut(auth).then(() => {
    console.log("the user signed out")
  }).catch((err) => {
    console.log(err.message)
  })
})

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log("user status changed :", user)
})

// unsubscribing from changes (auth & db)
const unsubButton = document.querySelector(".unsub")
unsubButton.addEventListener('click', () => {
  console.log("unsubscribing")
  unsubCol()
  unsubAuth()
})