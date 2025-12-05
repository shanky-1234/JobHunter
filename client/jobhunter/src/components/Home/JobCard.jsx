import React from 'react'
import Card from '../shared/Card'

function JobCard() {
  return (
    <section className='mx-[80px] mt-7 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-center align-middle  items-center gap-4'>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    </section>
  )
}

export default JobCard