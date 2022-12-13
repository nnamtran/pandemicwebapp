import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

import Footer from "../components/Footer";
import Nav from "../components/Nav";
import axios from "axios";

import readingInstruction from "../images/reading-instruction.png"
const PositiveResult = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [successM, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        day: "",
        month: "",
        year: "",
        full_name: "",
        medicare: "",
        isoAddress: "",
        mobile: "",
        email: "",
    })
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const url = cookies.Profile
    

    const handleChange = (e) => {
        console.log('e', e);
        const value = e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        console.log('eee')
        e.preventDefault();
        console.log(formData)

        try {
            const response = await axios.post('https://pandemica-register.herokuapp.com/positive', {formData})

            console.log(response)
            const success = response.status === 200
            if (success) {
                setSuccess('Submitted!')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='testResult-container'>
            <Nav isLogin={isLogin} picture={url}/>
            <div className="testResult">
                <div className="register-form">
                    <h2>Register a positive rapid antigen test result</h2>
                    <form onSubmit={handleSubmit}>
                        <section className="register-date">
                            <h3>What date did you test postive for COVID-19?</h3>
                            <label htmlFor="date">Day</label>
                            <input
                                id="day"
                                type="number"
                                name="day"
                                placeholder="DD"
                                required={true}
                                value={formData.date}
                                onChange={handleChange}
                            />
                            <label htmlFor="month">Month</label>
                            <input 
                                id="month"
                                type="number"
                                name="month"
                                placeholder="MM"
                                required={true}
                                value={formData.month}
                                onChange={handleChange}
                            />
                            <label htmlFor="year">Year</label>
                            <input 
                                id='year'
                                type='number'
                                name='year'
                                required={true}
                                placeholder='YYYY'
                                value={formData.year}
                                onChange={handleChange}
                            />
                        </section>
                        <section className="personal-details">
                            <h3>Details of the person who has tested positive</h3>
                            <label htmlFor="full_name">Full Name</label>
                            <input 
                                id="full_name"
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                                required={true}
                                value={formData.full_name}
                                onChange={handleChange}
                            />
                            <label htmlFor="medicare">Medicate Card Number (optional)</label>
                            <input 
                                id="medicare"
                                type="number"
                                name="medicare"
                                placeholder="1234 56789 1"
                                required={false}
                                value={formData.medicare}
                                onChange={handleChange}
                            />
                            <label htmlFor="isolation-address">Address (where you will be isolating)</label>
                            <input 
                                id="isolation-address"
                                type="text"
                                name="isoAddress"
                                placeholder="Unit 1, 16 Smith Street, Wollongong 2500"
                                required={true}
                                value={formData.isoAddress}
                                onChange={handleChange}
                            />
                            </section>
                        <section className="contact-details">
                            <h3>Contact Details</h3>
                            <p>These details must be the details of the person filling in the form or the details of the person who has tested positive and may be used as the contact details for this positive result.</p>
                            <label htmlFor="mobile">Phone number (mobile preferred)</label>
                            <p>Enter a 10-digit Australian mobile number or landline with area code</p>
                            <input 
                                id="mobile"
                                type="number"
                                name="mobile"
                                placeholder="0449 789 045"
                                required={true}
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Email</label>
                            <p>Enter your email to access NSW Health support information</p>
                            <input 
                                id="email"
                                type="text"
                                name="email"
                                placeholder="contact@nsw.gov.au"
                                required={true}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </section>
                        <section className="confirm-checkbox">
                            <input 
                                id='confirm'
                                type='checkbox'
                                name='confirm'
                                required={true}
                                value={"confirmed"}
                            /><label htmlFor="confirm">I have read the Privacy Collection Notice and understand that Service NSW may lawfully retain, use and disclose personal and health information about me to NSW Health, and NSW Health may contact me or share this with third parties, to provide me with appropriate health information for my circumstances, and to plan and provide appropriate health services informed by numbers and locations of positive COVID-19 cases.</label>
                        </section>
                        <input type="submit"/>
                        <p>{successM}</p>
                    </form>
                </div>
                <div className="instruction">
                    <img className="reading-instruction" src={readingInstruction} alt="Reading Instruction"/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default PositiveResult