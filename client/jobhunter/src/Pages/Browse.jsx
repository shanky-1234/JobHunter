import Card from '@/components/shared/Card'
import Layout from '@/Layout/Layout'
import React from 'react'

const jobSearch = [1,2,3]

function Browse() {
  return (
    <Layout>
        <section className='mx-[80px] mt-12'>
            <div>
                <h1 className='text-xl font-bold'>Search Result (3)</h1>
            </div>
            <main>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    {
                        jobSearch.map((items,index)=>{
                            return <Card/>
                        })
                    }
                </div>
            </main>
        </section>
    </Layout>
  )
}

export default Browse