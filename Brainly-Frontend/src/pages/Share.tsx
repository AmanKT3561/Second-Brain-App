import '../index.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card } from '../componenents/card'

export function SharePage() {
  const { shareLink } = useParams<{ shareLink: string }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [contents, setContents] = useState<any[]>([])

  useEffect(() => {
    if (!shareLink) return
    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        // include token if present, otherwise call without it
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:3000/api/v1/brain/shareLink/${shareLink}`, {
          headers: token ? { Authorization: token } : undefined,
        })
        setUsername(res.data.username)
        setContents(res.data.content || [])
      } catch (err: any) {
        console.error('Failed to load share', err)
        setError(err?.response?.data?.message || 'Failed to load share')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [shareLink])

  const copyShareUrl = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      alert('Share URL copied to clipboard')
    } catch {
      alert('Could not copy URL — please copy it manually')
    }
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">{username}'s Brain</h1>
            <p className="text-sm text-gray-600">Shared collection of links</p>
          </div>
          <div>
            <button onClick={copyShareUrl} className="bg-purple-600 text-white px-3 py-1 rounded">Copy Share URL</button>
          </div>
        </div>

        {contents.length === 0 ? (
          <div className="text-gray-600">No shared content found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {contents.map((c: any) => (
              <Card key={c._id} type={c.type} link={c.link} tittle={c.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SharePage
