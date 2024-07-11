import { BASE_IMAGE_URL } from '../../constants/constants';
import { CardProps } from '../../types/types';
import styles from './Card.module.css'


const Card: React.FC<CardProps> = ({pokemon, id}) => {
  return (
    <div className={styles.cardContainer}>
      <p>Name:</p>
      <p className={styles.pokemonName}>{pokemon.slice(0,1).toUpperCase() + pokemon.slice(1)}</p>
      <img src={BASE_IMAGE_URL+ id.slice(0,-1) +'.png'} alt="" />
    </div>
  )
}

export default Card;