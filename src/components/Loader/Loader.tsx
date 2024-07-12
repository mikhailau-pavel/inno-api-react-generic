import loader from '../../assets/loader.gif';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <img
        src={loader}
        alt="rotating pokeball"
        className={styles.loaderImage}
      />
      <p className={styles.loaderText}> Loading </p>
    </div>
  );
};
export default Loader;
