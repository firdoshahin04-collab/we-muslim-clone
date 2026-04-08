import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

export async function awardKarma(points: number) {
  if (!auth.currentUser) return;

  const userRef = doc(db, 'users', auth.currentUser.uid);
  
  try {
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName || 'User',
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        karmaPoints: points,
        level: 1
      });
    } else {
      const currentPoints = (userDoc.data().karmaPoints || 0) + points;
      const level = Math.floor(currentPoints / 1000) + 1;

      await updateDoc(userRef, {
        karmaPoints: increment(points),
        level: level,
        photoURL: auth.currentUser.photoURL // Sync photo
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${auth.currentUser.uid}`);
  }
}
