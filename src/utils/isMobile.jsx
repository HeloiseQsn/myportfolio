import { useState, useEffect } from 'react'

function IsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800) //si largeur écran <800 px => SetisMobile = true
    }

    handleResize()
    window.addEventListener('resize', handleResize) //écouteur d'évènement lorsque la taille de l'écran change

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

export default IsMobile
