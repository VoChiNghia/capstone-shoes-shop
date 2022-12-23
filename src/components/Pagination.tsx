import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {pagination} from '../util/pagination'
import parse from "html-react-parser";

type Props = {
  totalPages: number;
  postPerPage: number;
  setCurrentPage: any;
  currentPage: number;
};

const Pagination = ({
  totalPages,
  postPerPage,
  setCurrentPage,
  currentPage,
}: Props) => {
  let pages:number[] = [];
  for (let i = 1; i <= Math.ceil(totalPages / postPerPage); i++) {
    pages.push(i);
  }

  document.querySelectorAll('.page').forEach(item => item.addEventListener("click",(e:any) => {
    
    if(e.target.dataset.page){
      const pageNumber = parseInt(e.target.dataset.page, 10);
      setCurrentPage(pageNumber)
      console.log(pageNumber)
    }
   
    
   
   
  }))


  return (
    <div className="my-12 dark:text-white">
      <ul className="flex justify-center">
        <button
          className="md:py-2 md:px-4 p-2 mx-2 border-2 text-2xl disabled:opacity-30"
          disabled={currentPage === pages[0] ? true : false}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <MdChevronLeft />
        </button>
        {/* {pages.map((page: number) => (
          <li
            key={page}
            className={`rounded-lg py-2 px-2 lg:py-2  lg:px-4 mx-2 border-2 ${
              page === currentPage ? "pginationActive" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </li>
        ))} */}
        {
          
          parse(pagination(Number(pages.length),Number(currentPage)))
          
        }
        <button
          className="md:py-2 px-2 md:px-4 mx-2 border-2 text-2xl disabled:opacity-30"
          disabled={currentPage === pages[pages.length - 1] ? true : false}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <MdChevronRight />
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
