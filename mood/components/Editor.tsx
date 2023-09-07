'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsloading] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsloading(true)
      const update = await updateEntry(entry.id, _value)
      setIsloading(false)
    },
  })
  return (
    <div className="w-full h-full">
      {isLoading && <div>...loading</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  )
}

export default Editor
