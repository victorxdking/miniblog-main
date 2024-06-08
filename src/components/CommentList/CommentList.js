import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from './CommentList.module.css';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, `posts/${postId}/comments`), (snapshot) => {
      let commentsArray = [];
      snapshot.forEach((doc) => {
        commentsArray.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentsArray);
    });

    return () => unsubscribe();
  }, [postId]);

  return (
    <div className={styles.comment_list}>
      <h3>Comentários</h3>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment_item}>
          <p>{comment.text}</p>
          <p className={styles.createdby}>
            Por {comment.createdBy} em {new Date(comment.createdAt.seconds * 1000).toLocaleDateString("pt-BR")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
