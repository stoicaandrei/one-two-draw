import { useState, useEffect } from 'react';
import { projectFirestore } from 'firebase_config';

const useCollection = <T>(collection: string) => {
  const [docs, setDocs] = useState<T[]>([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents: T[] = [];
        snap.forEach((doc) => {
          documents.push(({ ...doc.data(), id: doc.id } as unknown) as T);
        });
        setDocs(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmount
  }, [collection]);

  return { docs };
};

export default useCollection;
