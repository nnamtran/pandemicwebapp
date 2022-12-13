import Nav from "../components/Nav"
import { useState } from "react"
import AuthModal from "../components/AuthModal"

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignup, setIsSignup] = useState(true)
    const authToken = false

    const handleClick = () => {
        console.log('Click')
        setShowModal(true)
        setIsSignup(true)
    }

    return (
        <div className="overlay">
            <Nav 
                minimal={false} 
                authToken={authToken} 
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignup={setIsSignup}/>

            <div className="home">
                <h1 className="primary-title">Pandemica</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignup={isSignup}/>
                )}
            </div>
        </div>
    )
}
export default Home
