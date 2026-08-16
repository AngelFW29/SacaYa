import Sidebar from './Sidebar'
import Topbar from './Topbar'
import BottomNav from './BottomNav'

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar/>
      <div className="flex-1 min-w-0">
        <Topbar/>
        <main className="p-5 md:p-7 lg:p-9 pb-20 md:pb-7 lg:pb-9">
          {children}
        </main>
      </div>
      <BottomNav/>
    </div>
  )
}

export default Layout