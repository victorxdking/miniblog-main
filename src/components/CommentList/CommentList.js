import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext';
import styles from './CommentList.module.css';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthValue();

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

  const handleDelete = async (commentId) => {
    if (window.confirm('Tem certeza que deseja deletar este comentário?')) {
      await deleteDoc(doc(db, `posts/${postId}/comments`, commentId));
    }
  };

  const handleEdit = (commentId) => {
    navigate(`/posts/${postId}/comments/edit/${commentId}`);
  };

  return (
    <div className={styles.comment_list}>
      <h3>Comentários</h3>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment_item}>
          <p>{comment.text}</p>
          <p className={styles.createdby}>
            Por {comment.createdBy} em {new Date(comment.createdAt.seconds * 1000).toLocaleDateString("pt-BR")}
          </p>
          {user && user.uid === comment.uid && (
            <div className={styles.btn_container}>
              <button onClick={() => handleEdit(comment.id)} className={`${styles.btn} ${styles.btn_edit}`}>Editar</button>
              <button onClick={() => handleDelete(comment.id)} className={`${styles.btn} ${styles.btn_delete}`}>Deletar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
