import HeaderLayout from './DashboardLayout/HeaderLayout'
import SidebarLayout from './DashboardLayout/SidebarLayout'
import HeaderComponents from './DashboardLayout/components/HeaderComponents'
import SidebarComponents from './DashboardLayout/components/SidebarComponents'
import RightSection from './DashboardLayout/RightSection'
import { BodyLayout } from './DashboardLayout/RightSection'
import "./DashboardLayout/style/dashboardStyle.scss"
const LayOutDashboard = ({ children }) => {
    return (
        <>
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

                {/* <div>Hello World</div> */}
            </div>
        </>
    )
}

export default LayOutDashboard