import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { data } from 'react-router'


const filterCategories = [{
    filterType : "Location",
    data:['Kathmandu','Pokhara','Lumbini']
},
{
    filterType:"Industry",
    data:['Frontend Developer','Backend Developer','Fullstack Developer', 'Devops Enigineer']
},{
    filterType:"Salary",
    data:["0-40k","40k-80k","80k-1lakh"]
}]

function Filtercard() {
  return (
    <div>
        <h1 className='text-lg font-bold'>Filter Options</h1>
        <hr  className='mt-3'/>
        <div>
             <RadioGroup>
            {
                filterCategories.map((items,index)=>{
                    return (
                        
                <div key={index} className='w-full mt-4'>
                    <div>
                        <h3 className='font-bold'>{items.filterType}</h3>
                    </div>
                    {
                        items.data.map((data,index)=>{
                            return(
                                <div key={index} className='flex flex-col'>
                    <div className='flex items-center gap-3 '>
                    <RadioGroupItem value={data} id={data} className={'border-1 border-black'}/>
                    <label>{data}</label>
                    </div>
                     </div>
                            )
                        })
                    
                    }
               
                </div>
          
                    )
                })
            }
            </RadioGroup>
        </div>
            
    </div>
  )
}

export default Filtercard