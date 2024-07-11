import { useEffect } from "react";
import { PaginationProps } from "../../types/types";
import styles from './Pagination.module.css'

const Pagination: React.FC<PaginationProps> = ({itemsPerPage, totalItems}) => {
  const totalPages: number = Math.ceil(totalItems / itemsPerPage)

  
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        console.log('scroll over')
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll',handleScroll)
  },[]);

  
  return (
    <div className={styles.paginationContainer}>
    <p>Total: {totalPages}</p>
    </div>
  )
}

export default Pagination;