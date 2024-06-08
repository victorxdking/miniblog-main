import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthValue } from '../../contexts/AuthContext';
import styles from './CreateComment.module.css';

const CreateComment = ({ postId }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuthValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!text) {
      setError('Por favor, escreva um comentário.');
      return;
    }

    try {
      await addDoc(collection(db, `posts/${postId}/comments`), {
        text,
        createdBy: user.displayName,
        createdAt: Timestamp.now(),
        uid: user.uid
      });
      setText('');
    } catch (error) {
      console.error('Erro ao adicionar comentário: ', error);
      setError('Erro ao adicionar comentário. Tente novamente.');
    }
  };

  return (
    <div className={styles.create_comment}>
      <h3>Adicionar Comentário</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Comentário:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn">Enviar Comentário</button>
      </form>
    </div>
  );
};

export default CreateComment;
