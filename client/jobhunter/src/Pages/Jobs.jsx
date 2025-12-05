import Filtercard from '@/components/JobSection/Filtercard'
import JobSectionCard from '@/components/shared/JobSectionCard'
import Layout from '@/Layout/Layout'
import React from 'react'

const jobArray = [1,2,3,4,5,6,7,8]

function Jobs() {
  return (
    <Layout>
      <section className='md:mx-[80px] mx-[40px] w-[1/2] mt-12  '>
      <div className='justify-between gap-4 flex md:flex-row flex-col'>
        <aside className='w-1/4'>
        <div className='p-4 sticky top-4 '>
          <Filtercard />
        </div>
        </aside>
        <main>
        <div className='grid lg:grid-cols-3 md:grid-col-2 justify-center grid-cols-1 gap-4'>
            {jobArray.map((items,index)=>{
              return <JobSectionCard key={index}/>
            })}
        </div>
        </main>
        </div>
      </section>
    </Layout>
  )
}

export default Jobs