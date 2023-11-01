import Header from './DashboardLayout/Header'
import Sidebar from './DashboardLayout/Sidebar'

const Dashboard = () => {
    return (
        <>
            <div className='dashboard' style={{ display: "flex", flexDirection: 'row' }}>
                <Sidebar />
                <Header />

            </div>
        </>
    )
}

export default Dashboard