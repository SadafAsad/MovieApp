// 1. import the firebase project keys
import firebaseConfig from "../config/firebase"
 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, doc, setDoc, collection, query, getDoc } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export const createUser = async (username, email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        const userUid = result.user.uid
        await setDoc(
            doc(db, "users", userUid), 
            {
                username: username, 
                following: [],
                follower: [],
                favourites: [],
                watched: [],
                toWatch: []
            }
        )
        console.log('User account created successfully')
        return {e: false, data: userUid}
    } catch (error) {
        console.error('Error creating user account:', error.message)
        return {e: true, data: error.message}
    }
}

export const loginUser = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        console.log('User logged in successfully')
        return {e: false, data: user}
    } catch (error) {
        console.error('Error logging in:', error.message)
        return {e: true, data: error.message}
    }
}

export const checkAuthenticationState = () => {
    return new Promise  ((resolve) =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
            console.log('User is logged in:', user.uid)
            resolve({loggedIn: true, user: user.uid})
            } else {
            console.log('User is not logged in')
            resolve({loggedIn: false, user: ''})
            }
        })
    })
}

export const signOutUser = async () => {
    try {
        await signOut(auth)
        console.log('User signed out successfully')
    } catch (error) {
        console.error('Error signing out:', error.message)
    }
}

export const getUserByUID = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid)
      const userDoc = await getDoc(userRef)
  
      if (userDoc.exists) {
        const userData = userDoc.data()
        return userData
      } else {
        console.log('User not found')
        return null
      }
    } catch (error) {
      console.error('Error retrieving user data:', error)
      return null
    }
}
  
