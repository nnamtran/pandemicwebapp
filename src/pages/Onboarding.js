import { useState } from "react"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Nav from "../components/Nav"

const Onboarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        gender_identity: 'man',
        address: "",
        url: "",
        mobile: "",
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('https://pandemica-authentication.herokuapp.com/user', {formData})
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch(error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav 
            minimal={true} 
            setShowModal={() => {}}
            showModal={false}
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">Full Name</label>
                        <input 
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="Full Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input 
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />
                            <input 
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />
                            <input 
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>
                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input 
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value={"man"}
                                onChange={handleChange}
                                checked={formData.gender_identity === 'man'}
                            /><label htmlFor="man-gender-identity">Man</label>
                            <input 
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value={"woman"}
                                onChange={handleChange}
                                checked={formData.gender_identity === 'woman'}
                            /><label htmlFor="woman-gender-identity">Woman</label>
                            <input 
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value={"more"}
                                onChange={handleChange}
                                checked={formData.gender_identity === 'more'}
                            /><label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor="address">Address</label>
                        <input 
                            id="address"
                            type="text"
                            name="address"
                            required={true}
                            placeholder="e.g. 123 Sample Street, SUBURB NSW 2000"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <label htmlFor="mobile">Phone number</label>
                        <input 
                            id="mobile"
                            type="text"
                            name="mobile"
                            required={true}
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                        <input type="submit"/>
                    </section>
                    
                    <section>
                        <label htmlFor="about">Profile</label>
                        <input 
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic review"/>}
                        </div>
                    </section>
                </form>
            </div>
        </>
        
    )
}

export default Onboarding