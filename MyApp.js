import React from 'react'
import Table from './Table'

const characters = [
    {
      name: 'Hamza',
      job: 'TBD',
    },
    {
      name: 'Aamir Waheed',
      job: 'TBD',
    },
    {
      name: 'Kaveh',
      job: 'TBA',
    },
    {
      name: 'Matt',
      job: 'TBA',
    },
];

function MyApp() {
    return (
        <div className="container">
          <Table characterData={characters} />
        </div>
    )      
}

export default MyApp;
