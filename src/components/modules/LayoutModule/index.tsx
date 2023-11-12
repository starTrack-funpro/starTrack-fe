'use client'

import { Navbar } from '@elements'
import { LayoutModuleInterface } from './interface'
import { Toaster } from 'react-hot-toast'
import { AuthContextProvider } from '@contexts'

export const LayoutModule: React.FC<LayoutModuleInterface> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <AuthContextProvider>
        <Navbar />
        {children}
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: '#4CD353',
                color: 'white',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#4CD353',
              },
            },
            error: {
              style: {
                background: '#FF165C',
                color: 'white',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#FF165C',
              },
            },
          }}
        />
      </AuthContextProvider>
    </div>
  )
}
