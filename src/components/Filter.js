import React from 'react'

function Filter(props) {
  const {data,setdata}=props
  return (
    <div>
      {
        data.map((val)=>{
          return(
            <div>
              <h1>{val.country}</h1>
            </div>
          )
        })
      }
    </div>
  )
}

export default Filter
