import React from 'react'
import '../Style/loading.css'

type Props = {}



const Loading = (props: Props) => {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-20 bg-gray-800/30 flex justify-center items-center">
        <div className="lds-dual-ring"></div>
    </div>
  )
}
export default Loading