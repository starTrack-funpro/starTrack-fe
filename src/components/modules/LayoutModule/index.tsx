import { Navbar } from '@elements'
import { LayoutModuleInterface } from './interface'

export const LayoutModule: React.FC<LayoutModuleInterface> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  )
}
