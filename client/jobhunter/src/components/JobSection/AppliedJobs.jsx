import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'

function AppliedJobs() {
  return (
    <div className='flex justify-center'>
        <Table>
            <TableHeader className='font-bold'>
                <TableRow>
                    <TableHead>
                        Date
                    </TableHead>
                    <TableHead>
                        Job Role
                    </TableHead>
                    <TableHead>
                        Company
                    </TableHead>
                    <TableHead>
                        Status
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1,2,3,4].map((items,index)=>{
                        return(
                            <TableRow key={index}>
                                <TableCell>
                                    01-01-2025
                                </TableCell>
                                    <TableCell>
                                    Frontend Developer
                                </TableCell>
                                      <TableCell>
                                    Google
                                </TableCell>
                                  <TableCell>
                                    <Badge>Selected</Badge>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobs