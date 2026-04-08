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
        karmaPoints: points,
        level: 'Novice'
      });
    } else {
      const currentPoints = userDoc.data().karmaPoints + points;
      let level = 'Novice';
      if (currentPoints >= 1000) level = 'Muhsin';
      else if (currentPoints >= 500) level = 'Explorer';

      await updateDoc(userRef, {
        karmaPoints: increment(points),
        level: level
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${auth.currentUser.uid}`);
  }
}
