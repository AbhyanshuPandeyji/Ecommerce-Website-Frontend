import React from 'react'

const History = () => {
  return (
    <div>
      
    </div>
  )
}

export default History;


declare function HistoryRouter(
    props: HistoryRouterProps
  ): React.ReactElement;
  
  interface HistoryRouterProps {
    basename?: string;
    children?: React.ReactNode;
    history: History;
  }