import { useContext } from "react";
import "./pagination.css";
import { themecontext } from "../../context/themeContext";
import usePagination from "../../hooks/usePagination";

const Pagination = ({ totalPosts, handlePage,currentPage }) => {
    
  const { theme } = useContext(themecontext);
  const {itemsPerPage} = usePagination()
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={`pagination ${theme}`}>
      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            className={`${currentPage===number? 'current': ''}`}
            onClick={() => {
              handlePage(number);
            }}
          >
            {number}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
