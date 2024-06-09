import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o 💪Mundo<span>Maromba</span>
      </h2>
      <p>
        Bem-vindo ao Mundo Maromba! Este blog foi criado para oferecer conteúdo honesto e de qualidade sobre fitness, musculação, nutrição e suplementação. Nossa missão é ajudar a comunidade fitness a alcançar seus objetivos com informações confiáveis e dicas práticas. Desenvolvido com React no front-end e Firebase no back-end, nosso blog proporciona uma experiência de usuário fluida e segura.
      </p>
      <Link to="/posts/create" className="btn">
        Criar novo post
      </Link>
    </div>
  );
};

export default About;
