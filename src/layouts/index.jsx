import HeaderLayout from 'layouts/Header'
import SidebarLayout from 'layouts/Sidebar'
import HeaderComponents from 'layouts/components/HeaderComponents'
import SidebarComponents from 'layouts/components/SidebarComponents'
import RightSection, { BodyLayout } from 'layouts/Container'
import 'layouts/style/dashboardStyle.scss'
const Dashboard = ({ children }) => {
    return (
        <>
            <div className='gradient-bar' />
            <div className='dashboard'>
                <SidebarLayout>
                    <SidebarComponents />
                </SidebarLayout>
                <RightSection>
                    <HeaderLayout>
                        <HeaderComponents />
                    </HeaderLayout>
                    <BodyLayout>
                        {children}
                    </BodyLayout>
                </RightSection>
            </div>
        </>
    )
}

export default Dashboard