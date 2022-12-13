import logo from '../images/logo.png'
import minimalLogo from '../images/minimal-logo.png'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Nav = ({minimal, authToken, setShowModal, showModal, setIsSignup, isLogin, picture}) => {
    let navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const handleLogout = () => {
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);
        removeCookie('Profile', cookies.Profile);
        removeCookie('Email', cookies.Email);
        removeCookie('Mobile', cookies.Mobile);
        removeCookie('FullName', cookies.FullName);
        navigate('/');
        window.location.reload();
    }

    const handleClick = () => {
        setShowModal(true)
        setIsSignup(false)
    }
    const handleHome = () => {
        navigate('/')
    }
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? minimalLogo : logo} alt='Logo' onClick={handleHome}/>
            </div>
            
            
            {!authToken && !minimal && 
            <>
                <div className='tab-container'>
                    <a className='header-navigation-link' href=''>About us</a>
                    <a className='header-navigation-link' href='http://localhost:3000/dashboard'>Services</a>
                    <a className='header-navigation-link' href=''>Our work</a>
                </div>
                <div className='profile'>
                    {isLogin ? (
                        <>
                            <div className='nav-no-button'>
                                <img src={picture} alt="profile pic" />
                                {/* <img src={logout} alt="logout icon" className='logout' onClick={handleLogout}/> */}
                            </div>
                            <button className='nav-button-logout' onClick={handleLogout}>
                                Signout
                            </button>
                        </>
                    ) : (
                        <button className='nav-button' onClick={handleClick} disabled={showModal}>Log in</button>
                    )}
                </div>
            </>
            }
            
        </nav>
    )
}

export default Nav