import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const deleteComment = async (postId, commentId) => {
  try {
    await deleteDoc(doc(db, `posts/${postId}/comments`, commentId));
    alert('Comentário deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar comentário: ', error);
    alert('Erro ao deletar comentário. Tente novamente.');
  }
};

export default deleteComment;
