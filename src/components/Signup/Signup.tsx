
import './Signup.css'


function Signup() {
    return (
        <>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <form className="signup">
                            <div className="signup__field">
                                <i className="signup__icon fas fa-user"></i>
                                <input type="text" className="signup__input" placeholder="User name / Email" />
                            </div>
                            <div className="signup__field">
                                <i className="signup__icon fas fa-lock"></i>
                                <input type="password" className="signup__input" placeholder="Password" />
                            </div>
                            <div className="signup__field">
                                <i className="signup__icon fas fa-lock"></i>
                                <input type="password" className="signup__input" placeholder="Repeat your Password" />
                            </div>
                            <button className="button signup__submit">
                                <span className="button__text">Sign Up</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </form>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div >
        </>

    );
}

export default Signup;
