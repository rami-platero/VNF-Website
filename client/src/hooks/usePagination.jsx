import { useState } from "react";

const usePagination = ( items ) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15

  const handlePage = (number)=>{
    setCurrentPage(number)
  }

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

  return {currentItems,handlePage,setCurrentPage,currentPage,itemsPerPage};
};

export default usePagination;
