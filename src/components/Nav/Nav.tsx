import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

//third party libraries
import Lottie from 'lottie-web'

//data
import logoAnimation from '../../static/lottie/logo.json'

//styles
import './Nav.scss'

type NavProps = {
    transitionTime: number,
    callback: () => void,
    isHome?: boolean,
    currentRoute: string
}

type NavRoutes = {
    text: string,
    route: string
}

const Nav = ({ transitionTime, callback, isHome = false, currentRoute }: NavProps) => {
    const routes: Array<NavRoutes> = [
        {
            text: 'inicio',
            route: '/'
        },
        {
            text: 'sobre mi',
            route: '/about'
        },
        {
            text: 'trabajos',
            route: '/work'
        },
        {
            text: 'contacto',
            route: '/contact'
        }
    ]

    useEffect(() => {
        if (currentRoute != '/') {
            const navLogoContainer = document.getElementById('nav-logo') as HTMLElement
            let logo = Lottie.loadAnimation({
                container: navLogoContainer,
                animationData: logoAnimation,
                autoplay: false,
                loop: false,
                name: 'navLogo'
            })

            setTimeout(() => {
                navLogoContainer.style.opacity = '1'
                logo.playSegments([0, 180], true)
            }, 500);
        }
    }, [])

    const timer = (ms: number) => { return new Promise(res => setTimeout(res, ms)) }
    const navigate = useNavigate()

    const timerImplementation = async (route: string) => {
        callback()
        const navLogoContainer = document.getElementById('nav-logo') as HTMLElement
        currentRoute === '/' ? undefined : navLogoContainer.style.opacity = '0'
        await timer(transitionTime)
        navigate(route)
    }

    return (
        <nav className='no-blur-bg'>
            <div id="nav-container">
                {
                    currentRoute === '/' ? <span></span> : <a href="/" id='nav-logo-link'><div id="nav-logo"></div></a>
                }

                <div id="navigator">
                    {
                        routes.map(route => {
                            return (
                                <NavLink
                                    onClick={(event) => {
                                        event.preventDefault()
                                        currentRoute === route.route ? window.scrollTo(0, 0) : timerImplementation(route.route)
                                    }}
                                    to={route.route}
                                    key={route.text}
                                >
                                    {route.text}
                                </NavLink>
                            )
                        })
                    }

                    <div id="menu-button"></div>
                </div>
            </div>
        </nav>
    )
}

export default Nav

