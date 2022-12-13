import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import QRCode from 'qrcode';
import axios from "axios";


const Qrcode = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [qr, setQr] = useState('');
    const [successM, setSuccess] = useState('')

    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        name: "",
        email: "",
        mobile: "",
        time: new Date().toString(),
        location: "Northfields Ave, Keiraville NSW 2522"
    })

    const url = cookies.Profile;


    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault();
        try {
            const response = await axios.post('https://pandemica-qrcheckin.herokuapp.com/location', {formData})

            console.log(response)
            const success = response.status === 200
            if (success) {
                setSuccess('You are checked in!')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleGenerate = () => {
        QRCode.toDataURL(url, {
			width: 800,
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, url) => {
			if (err) return console.error(err)

			setQr(url)
		})
    }

    return (
        <div className='qrcode-container'>
            <Nav isLogin={isLogin} picture={url}/>
            <div className="main">
                <div className="qrcode">
                    <div className="qrcode-form">
                        <h2>LOCATION CHECK-IN</h2>
                        <form onSubmit={handleSubmit}>
                            <section>
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    required={true}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Email</label>
                                <input 
                                    id="email"
                                    type="text"
                                    name="email"
                                    required={true}
                                    placeholder="mail@mail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="mobile">Phone number</label>
                                <input 
                                    id="mobile"
                                    type="number"
                                    name="mobile"
                                    required={true}
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                                <input type="submit"/>
                                <p>{successM}</p>
                            </section>
                        </form>
                    </div>
                    <div className="qrcode-generator">
                        {qr && <>
                            <img className='qrcode-image' src={qr} alt='QR CODE'/>
                        </>}
                        {/* <div className="qrcode-generator-form"> */}
                        <label htmlFor="location">Location</label>
                        <input 
                            id="location"
                            type="text"
                            name="location"
                            required={true}
                            defaultValue="Northfields Ave, Keiraville NSW 2522"
                            onChange={(e) => {
                                const value = e.target.value;
                                setQr(value);
                            }}
                        />
                        <button onClick={handleGenerate}>Generate</button>
                        {/* </div> */}
                    </div>
                    
                </div>
                <div className="google-map">
                    <iframe
                        title='google-map'
                        className="map-container"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAcqyHnMnZEVn7ew0Da-uBEM0yCoOVMvrk&q=Wollongong"
                        >
                    </iframe>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}



export default Qrcode