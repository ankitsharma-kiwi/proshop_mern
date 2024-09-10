import { forwardRef, useEffect } from 'react'

const EditorCanvas = forwardRef(({ canvas, setCurrentFilter }, ref) => {
  function handleKeyDown(e) {
    if (e.key === 'Delete') {
      for (const obj of canvas.getActiveObjects()) {
        canvas.remove(obj)
        canvas.discardActiveObject()
      }
    }
  }

  document.addEventListener('keydown', handleKeyDown, false)

  useEffect(() => {
    if (!canvas) return

    function handleSelection(e) {
      const obj = e.selected?.length === 1 ? e.selected[0] : null
      const filter = obj?.filters?.at(0)
      setCurrentFilter(filter ? filter.type.toLowerCase() : null)
    }

    canvas.on({
      'selection:created': handleSelection,
      'selection:updated': handleSelection,
      'selection:cleared': handleSelection,
    })

    return () => {
      canvas.off({
        'selection:created': handleSelection,
        'selection:updated': handleSelection,
        'selection:cleared': handleSelection,
      })
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [canvas, setCurrentFilter])

  return (
    <div className="canvasbox">
      <canvas ref={ref} width="1116" height="728"></canvas>
    </div>
  )
})

export default EditorCanvas
