// 1. import the firebase project keys
import firebaseConfig from "../config/firebase"
 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export const createUserAccount = async (username, email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        const userUid = result.user.uid
        await setDoc(doc(db, "users", userUid), {username: username})
        console.log('User account created successfully')
        return {e: false, data: userUid}
    } catch (error) {
        console.error('Error creating user account:', error.message)
        return {e: true, data: error.message}
    }
}
  
