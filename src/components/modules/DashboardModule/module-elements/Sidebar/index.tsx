import { Button } from '@elements'

export const Sidebar = () => {
  return (
    <aside className="flex flex-col w-1/5 min-h-screen px-2 border-r-2 border-r-white/20">
      <Button variant="transparent" className="text-xl">
        Your Series
      </Button>
    </aside>
  )
}
