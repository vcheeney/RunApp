import React, { FC, useEffect, useState } from 'react'
import Navbar from './Navbar'

type Props = {}

const LandingLayout: FC<Props> = ({ children }) => {
  const [navbarShadow, setNavbarShadow] = useState(false)

  function handleScroll() {
    if (window.scrollY === 0) {
      setNavbarShadow(false)
    } else if (!navbarShadow && window.scrollY > 0) {
      setNavbarShadow(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="h-screen bg-gray-100">
      <Navbar shadow={navbarShadow} showActions={false} />
      {children}
    </div>
  )
}

export default LandingLayout
