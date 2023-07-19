'use client'

import React from 'react'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-[1200px] mx-auto my-0'>{children}</div>
  )
}
