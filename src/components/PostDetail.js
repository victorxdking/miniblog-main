import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";

export const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <Link to={`/posts/${post.id}`}>
        <img src={post.image} alt={post.title} className={styles.post_image} />
      </Link>
      <h2>{post.title}</h2>
      <p className={styles.createdby}>
        Por {post.createdBy} em {new Date(post.createdAt.seconds * 1000).toLocaleDateString("pt-BR")}
      </p>
      <p>{post.body.substring(0, 150)}...</p>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Leia mais
      </Link>
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
