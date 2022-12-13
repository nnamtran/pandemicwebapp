import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

import qrcode from '../images/qrcode.png'
import positivecovid from '../images/positivecovid.png'
import tracing from '../images/tracing.png'

import axios from "axios"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

const Dashboard = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [user, setUser] = useState(null)
    const [image, setImage] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()

    const userId = cookies.UserId


    const getUser = async () => {
        console.log(userId)
        try {
            const response = await axios.get('https://pandemica-authentication.herokuapp.com/user', {
                params: {userId}
            })
            setUser(response.data)
            setImage(response.data.url)
            setCookie('Profile', response.data.url)
            setCookie('FullName', response.data.first_name)
            setCookie('Email', response.data.email)
            setCookie('Mobile', response.data.mobile)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
        console.log(user)
    }, [])

    const handleNavigateQRCode = () => {
        navigate('/qrcode')
    }

    const handleNavigateCT = () => {
        navigate('/contacttracing')
    }

    const handleNavigateReg = () => {
        navigate('/testresult')
    }


    return (
        <>
            {user &&
            <div className="dashboard">
                <Nav isLogin={isLogin} picture={image}/>
                <div className="service-container">
                    <div className="service-headline">Services</div>
                    <div className="service-box">
                        <div className="service" onClick={handleNavigateQRCode}>
                            <img className="service-photo1" src={qrcode} alt="QR code check-in"/>
                            <div className="service-content">
                                <h1>QR code check-in</h1>
                                <p>See exactly who's visiting your location, and promote a healthy environment with a touchless sign-in</p>
                            </div>
                        </div>
                        <div className="service" onClick={handleNavigateCT}>
                            <img className="service-photo2" src={tracing} alt="Contact tracing"/>
                            <div className="service-content">
                                <h1>Contact tracing</h1>
                                <p>All contact tracing is streamlined through leading edge technology eliminating paper trails and human error</p>
                            </div>
                        </div>
                        <div className="service" onClick={handleNavigateReg}>
                            <img className="service-photo" src={positivecovid} alt="register for positive"/>
                            <div className="service-content">
                                <h1>Register for (+) result</h1>
                                <p>Allow people who have tested positive for COVID-19 to notify Pandemica of their test result, and spread awareness to other people</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            
        }
        </>
        
    )
}

export default Dashboard