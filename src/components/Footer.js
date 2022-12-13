import social from '../images/social.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="address-container">
                    <div className="address">
                        <h1>VISIT US @</h1>
                        <p>UOW Library,<br/> Northfields Ave,<br/> Keiraville NSW 2522</p>
                    </div>
                    <div className="email">
                        <h1>SAY HELLO</h1>
                        <p>hello@pandemica.tech</p>
                        <p>(02) 456 1235</p>
                    </div>
                </div>
                <div className="contact-container">
                    <div className="contact">
                        <h1>Do you still have questions for us?</h1>
                        <p>Drop us your enquiry and we'll find a way to help you and your team</p>
                    </div>
                    <div className="dropbox">
                        <input className="inputbox" placeholder="Place your enquiry here..."/>
                    </div>
                </div>
            </div>
            <div className="social">
                <div className="social-icon"><img className='social-image' src={social}/></div>
                <div className="copyright">© 2022 All rights reserved.</div>
            </div>
        </div>
    )
}

export default Footer