import './index.css'
import {Button} from "./componenents/Buttons"
import { PlusIcon } from './componenents/ui/icons/PlusIcon'
import { ShareIcon } from './componenents/ui/icons/shareicon'
import { Card } from './componenents/card'
import { CreateContentModal } from './componenents/ui/CreateContentModal'
import { useState } from 'react'
import { Sidebar } from './componenents/Sidebar'

function App() {
  const [modalOpen , setmodalOpen] = useState(false)
  return (
    <>
      <div>
      {/* sidebar */}
      <Sidebar />
      {/* -------------- */}


      {/* ---maincintent--- */}
      <div className='ml-72 p-4 min-h-screen bg-gray-100 border-2'>
      <CreateContentModal open = {modalOpen} onClose = {() => {
          setmodalOpen(false)
      }}/> 
      <div className='flex gap-4 justify-end p-4'>
      <Button onClick = {() => {setmodalOpen(true)}} startIcon = {<PlusIcon size="lg" />} size = "md" variant="Primary" text="Add Content" />
      <Button startIcon={<ShareIcon size = "lg"/>} size = "md" variant="Secondary" text="Share Brain" />
      </div>
      <div className='flex gap-4'>
      <Card tittle = "hello" link = "https://x.com/AmanTiw25918616/status/1999159634440212923?s=20" type = "twitter" />
      <Card tittle = "hello" link = "https://www.youtube.com/watch?v=eVli-tstM5E&list=RDeVli-tstM5E&start_radio=1" type = "youtube" />
      </div>
      {/* --------------- */}
      </div>
      </div>
    </>
  )
}

export default App
