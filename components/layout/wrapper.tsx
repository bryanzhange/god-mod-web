'use client'

import { LoadingPopup } from '@components/loading'
import useAuth from '@hooks/useAuth'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'stores'

export function Wrapper(props: { children: React.ReactNode }) {
  const isLoading = useSelector((state: RootState) => state.page.isLoading)
  const { auth, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      auth()
    }
  }, [])

  return (
    <>
      <LoadingPopup isOpen={isLoading} />
      {props.children}
    </>
  )
}
