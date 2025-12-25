import '../index.css'
import {Button} from "../componenents/Buttons"
import { PlusIcon } from '../componenents/ui/icons/PlusIcon'
import { ShareIcon } from '../componenents/ui/icons/Shareicon'
import { Card } from '../componenents/card'
import { CreateContentModal } from '../componenents/ui/CreateContentModal'
import ShareModal from '../componenents/ui/ShareModal'
import { useState, useEffect } from 'react'
import { Sidebar } from '../componenents/Sidebar'
import { useContent } from '../componenents/hooks/useContent'
import axios from 'axios'
export function Dashboard() {
  const [modalOpen , setmodalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | undefined>(undefined)
  const { contents } = useContent()
  const [filter, setFilter] = useState<'all'|'youtube'|'twitter'>('all')

  useEffect(() => {
    const handler = (e: any) => {
      const f = e?.detail || 'all'
      setFilter(f)
    }
    window.addEventListener('filter:content', handler)
    return () => window.removeEventListener('filter:content', handler)
  }, [])

  const filtered = contents.filter((c: any) => {
    if (!filter || filter === 'all') return true
    const t = (c.type || '').toString().toLowerCase()
    return t === filter
  })
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

      <Button
        onClick={async () => {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("You must be signed in to create a share link.");
            return;
          }
          try {
            const response = await axios.post(
              `http://localhost:3000/api/v1/brain/share`,
              { share: true },
              { headers: { Authorization: token } }
            );
            const url = `${window.location.origin}/share/${response.data.hash}`
            try {
              await navigator.clipboard.writeText(url);
            } catch {}
            setShareUrl(url)
            setShareModalOpen(true)
          } catch (err: any) {
            console.error("Share failed", err);
            alert(err?.response?.data?.message || "Failed to create share link");
          }
        }}
        startIcon={<ShareIcon size="lg" />}
        size="md"
        variant="Secondary"
        text="Share Brain"
      />
      <ShareModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} initialUrl={shareUrl} />





      </div>
      <div className='flex gap-4 flex-wrap'>
       {filtered.map((c: any) => (
         <Card key={c._id} id={c._id} type={c.type} link={c.link} tittle={c.title} />
       ))}
      </div>
      {/* --------------- */}
      </div>
      </div>
    </>
  )
}

export default Dashboard
