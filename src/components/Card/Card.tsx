import { CardProps } from '../../types/types';
import styles from './Card.module.css'


const Card: React.FC<CardProps> = ({pokemon, id}) => {
  return (
    <div className={styles.cardName}>
      <p>Name:</p>
      <p className={styles.pokemonName}>{pokemon}</p>
      <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ id +'.png'} alt="" />
    </div>
  )
}

export default Card;