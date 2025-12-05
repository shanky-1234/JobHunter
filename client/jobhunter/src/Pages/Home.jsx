import CategoryCarousel from '@/components/Home/CategoryCarousel'
import HeroSection from '@/components/Home/HeroSection'
import JobCard from '@/components/Home/JobCard'
import Layout from '@/Layout/Layout'
import Footer from '@/components/shared/Footer'
import React from 'react'
import useGetAllJobs from '@/hooks/useGetAllJobs'

function Home() {
  useGetAllJobs()
  return (
    <Layout>
        <HeroSection/>
        <CategoryCarousel />
        <JobCard />
       
    </Layout>
  )
}

export default Home