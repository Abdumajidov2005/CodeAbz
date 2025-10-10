import React from 'react'
import "./CodePanels.css"
import CodeEditor from '../../components/codeEditor/CodeEditor'

function CodePanels() {
  return (
    <>
      <div className='codePanels'>
          <div className="container">
               <CodeEditor/>
          </div>
      </div>
    </>
  )
}

export default CodePanels