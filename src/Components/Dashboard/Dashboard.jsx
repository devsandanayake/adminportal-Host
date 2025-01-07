import React from 'react'
import Card from './DashboardFisrtBar/Card'

export default function Dashboard() {
  return (
      <>
    <div class="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>

    <div className='row'>
        <Card />
      </div>
  </div>
      
      </>
  )
}