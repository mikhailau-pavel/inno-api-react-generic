import { PaginationProps } from "../../types/types";

const Pagination: React.FC<PaginationProps> = ({itemsPerPage, totalItems}) => {
  const totalPages: number = Math.ceil(totalItems / itemsPerPage)

  return (
    <>
    <p>Total: {totalPages}</p>
    </>
  )
}

export default Pagination;