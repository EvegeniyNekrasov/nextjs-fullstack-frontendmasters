'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()
  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <div>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          disabled={loading}
          value={value}
          type="text"
          onChange={onChange}
          placeholder="Ask a question"
          className="border border-black/20 px-4 py-2 text-lg  rounded-lg w-full"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg w-40"
        >
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div className='px-4 py-8 bg-cyan-100 rounded-lg mt-3'>{response}</div>}
    </div>
  )
}

export default Question
