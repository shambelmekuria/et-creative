import axios from 'axios'
import React from 'react'

export default async function Test() {
    const sample_data =  await fetch('http://localhost:3000/api/core/location/').then(res=>res.json());
  console.log(sample_data)
  return (
    <div>Test</div>
  )
}
