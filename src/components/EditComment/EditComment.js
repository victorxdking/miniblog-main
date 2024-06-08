import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from './EditComment.module.css';

const EditComment = () => {
  const { postId, commentId } = useParams();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComment = async () => {
      const docRef = doc(db, `posts/${postId}/comments`, commentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setText(docSnap.data().text);
      } else {
        console.log('No such document!');
      }
    };

    fetchComment();
  }, [postId, commentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!text) {
      setError('Por favor, escreva um comentário.');
      return;
    }

    try {
      const docRef = doc(db, `posts/${postId}/comments`, commentId);
      await updateDoc(docRef, {
        text
      });
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error('Erro ao atualizar comentário: ', error);
      setError('Erro ao atualizar comentário. Tente novamente.');
    }
  };

  return (
    <div className={styles.edit_comment}>
      <h3>Editar Comentário</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Comentário:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn">Atualizar Comentário</button>
      </form>
    </div>
  );
};

export default EditComment;
