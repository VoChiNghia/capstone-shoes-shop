

 export const pagination = (totalPages:number,curPage:number,truncate:boolean = true,delta:number = 1) => {
  
  
    const range:number = delta + 4; // use for handle visible number of links left side
    let result:string = ''
    let render:string = "";
    let renderTwoSide:string = "";
    let dot:string = `<li class="pg-item"><a class="pg-link">...</a></li>`;
    let countTruncate:number = 0; // use for ellipsis - truncate left side or right side
  
    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;
  
    let active = "";
    for (let pos = 1; pos <= totalPages; pos++) {
      active = pos === curPage ? "pginationActive" : "";
  
      // truncate
      if (totalPages >= 2 * range - 1 && truncate) {
        if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
          // truncate 2 side
          if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
            renderTwoSide += renderPage(pos, active);
          }
        } else {
          // truncate left side or right side
          if (
            (curPage < range && pos <= range) ||
            (curPage > totalPages - range && pos >= totalPages - range + 1) ||
            pos === totalPages ||
            pos === 1
          ) {
            render += renderPage(pos, active);
          } else {
            countTruncate++;
            if (countTruncate === 1) render += dot;
          }
        }
      } else {
        // not truncate
        render += renderPage(pos, active);
      }
    }
    if (renderTwoSide) {
      renderTwoSide =
        renderPage(1,"") + dot + renderTwoSide + dot + renderPage(totalPages,"");
       return result = renderTwoSide;
    } else {
      return  result = render;
    }

   
  }


  const renderPage = (index:number, active = "") => {
    return ( ` <li
    className='page rounded-lg py-2 px-2 lg:py-2 cursor-pointer  lg:px-4 mx-2 border-2 ${active}' data-page="${index}"
  >
    ${index}
  </li>`

     
    )   
  }