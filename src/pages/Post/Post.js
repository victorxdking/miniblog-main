import styles from "./Post.module.css";
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <p className={styles.createdby}>
            Por {post.createdBy} em {new Date(post.createdAt.seconds * 1000).toLocaleDateString("pt-BR")}
          </p>
          <img src={post.image} alt={post.title} className={styles.post_image} />
          <div className={styles.post_content}>
            <p>{post.body}</p>
          </div>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
