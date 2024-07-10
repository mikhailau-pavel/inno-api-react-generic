import { BASE_IMAGE_URL } from '../../constants/constants';
import { CardProps } from '../../types/types';
import styles from './Card.module.css'


const Card: React.FC<CardProps> = ({pokemon, id}) => {
  return (
    <div className={styles.cardName}>
      <p>Name:</p>
      <p className={styles.pokemonName}>{pokemon}</p>
      <img src={BASE_IMAGE_URL+ id +'.png'} alt="" />
    </div>
  )
}

export default Card;