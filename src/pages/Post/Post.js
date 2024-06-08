import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import CreateComment from '../../components/CreateComment/CreateComment';
import CommentList from '../../components/CommentList/CommentList';
import styles from './Post.module.css';

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument('posts', id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <p className={styles.createdby}>
            Por {post.createdBy} em {new Date(post.createdAt.seconds * 1000).toLocaleDateString('pt-BR')}
          </p>
          <img src={post.image} alt={post.title} className={styles.post_image} />
          <div className={styles.post_content}>
            {post.body.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
          <CreateComment postId={id} />
          <CommentList postId={id} />
        </>
      )}
    </div>
  );
};

export default Post;
