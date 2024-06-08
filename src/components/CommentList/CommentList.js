import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthValue } from '../../contexts/AuthContext';
import styles from './CommentList.module.css';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
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

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleUpdate = async (e, commentId) => {
    e.preventDefault();
    if (!editText) return;

    try {
      const docRef = doc(db, `posts/${postId}/comments`, commentId);
      await updateDoc(docRef, { text: editText });
      setEditingCommentId(null);
      setEditText('');
    } catch (error) {
      console.error('Erro ao atualizar comentário: ', error);
    }
  };

  return (
    <div className={styles.comment_list}>
      <h3>Comentários</h3>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment_item}>
          {editingCommentId === comment.id ? (
            <form onSubmit={(e) => handleUpdate(e, comment.id)}>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={styles.edit_textarea}
              />
              <button type="submit" className={`${styles.btn} ${styles.btn_update}`}>Atualizar</button>
              <button onClick={() => setEditingCommentId(null)} className={styles.btn_cancel}>Cancelar</button>
            </form>
          ) : (
            <>
              <p>{comment.text}</p>
              <p className={styles.createdby}>
                Por {comment.createdBy} em {new Date(comment.createdAt.seconds * 1000).toLocaleDateString("pt-BR")}
              </p>
              {user && user.uid === comment.uid && (
                <div className={styles.btn_container}>
                  <button onClick={() => handleEditClick(comment)} className={`${styles.btn} ${styles.btn_edit}`}>Editar</button>
                  <button onClick={() => handleDelete(comment.id)} className={`${styles.btn} ${styles.btn_delete}`}>Deletar</button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
