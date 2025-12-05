
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Layout from '@/Layout/Layout'
import React from 'react'

function JobDescription() {
  return (
    <Layout>
        <section className='mx-[80px] mt-12'>
            <div className='w-full flex justify-center flex-col md:flex-row md:justify-between gap-12'>
                <div className='flex flex-col md:flex-row justify-center gap-8'>
                <div className='w-16 h-16'>
                    <img src="/Google__G__logo.svg" className='w-full h-full' alt="" />
                </div>
                <div className=''>
                    <h1 className='text-2xl font-bold'>Frontend Developer</h1>
                    <h4 className='text-lg'>Google</h4>
                    <div className='mt-2 flex gap-2'>
                       <Badge variant="default" className={'bg-green-300 text-green-700'}>12 Position</Badge>
                                  <Badge variant="default" className={'bg-blue-300 text-blue-700'}>Part Time</Badge>
                                  <Badge variant="default" className={'bg-red-300 text-red-700'}>50K</Badge>
                    </div>
                </div>
                
            </div>
            <Button className='md:w-30 w-full h-15 font-bold bg-blue-500'>Apply Now</Button>
            </div>
            <hr className='mt-4 border-gray-300'/>
            <main className='mt-6 flex md:flex-row flex-col-reverse gap-8'>
                <div className='space-y-2'>
                    <h2 className='text-xl font-medium'>Job Description</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus minus maiores pariatur explicabo veritatis non provident. Voluptatem possimus nemo perferendis esse magni. Eligendi eaque nostrum assumenda corrupti deleniti nemo consequuntur voluptatibus inventore eos, autem, maxime dolorum numquam, repellat fugit totam ullam harum minima ipsum perferendis alias nisi non animi. Veritatis?</p>
                </div>
                <aside className='w-full '>
                    <div className='p-8 border border-gray-500 space-y-4 rounded-2xl'>
                        <h5 className='font-medium'>Location: <span className='font-bold'>Kathmandu</span></h5>
                        <h5 className='font-medium'>Experience: <span className='font-bold'>Kathmandu</span></h5>
                        <h5 className='font-medium'>Location: <span className='font-bold'>Kathmandu</span></h5>
                        <h5 className='font-medium'>Location: <span className='font-bold'>Kathmandu</span></h5>
                        <h5 className='font-medium'>Location: <span className='font-bold'>Kathmandu</span></h5></div>
                </aside>
            </main>
        </section>
    </Layout>
  )
}

export default JobDescription