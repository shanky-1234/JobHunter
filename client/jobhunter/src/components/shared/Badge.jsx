import React from 'react'

function Badge({content}) {
  return (
    <div className='p-2 bg-blue-500 rounded-xl w-full text-white'>
        <h4 className='text-md font-medium'>
          {content}
        </h4>
    </div>
  )
}

export default Badge