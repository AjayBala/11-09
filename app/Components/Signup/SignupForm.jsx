import React, { Component } from 'react';
import {
    ControlLabel, FormGroup, Button, Checkbox,
} from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import './Signup.scss';
import Recaptcha from 'react-recaptcha';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../history';
import floatingLabelField from '../FloatingLabel/FloatingLabel';


export const validate = (values) => {
    const error = {};
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    const validEmail = emailPattern.test(values.email);
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);
    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }

    const capital = document.getElementById('capital');
    const special = document.getElementById('special');
    const length = document.getElementById('length');
    const upperCaseLetters = /[A-Z]/g;
    const SpecialSmallLetters = /[!@#$%^&*)(+=._-]/g;

    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 8) {
        error.password = 'Password should be greater than 8';
    } else if (values.password.length > 15) {
        error.password = 'Password should be lesser than 16';
    } else if (!values.password.length >= 8) {
        error.password = 'Password should be greater than 8';
        length.classList.add('errorClass');
        capital.classList.remove('errorClass');
        special.classList.remove('errorClass');
    } else if (!values.password.match(upperCaseLetters)) {
        error.password = 'Need upper case';
        length.classList.remove('errorClass');
        capital.classList.add('errorClass');
        special.classList.remove('errorClass');
    } else if (!values.password.match(SpecialSmallLetters)) {
        error.password = 'Need Atleast one special Character';
        length.classList.remove('errorClass');
        capital.classList.remove('errorClass');
        special.classList.add('errorClass');
    } else if (values.password.match(SpecialSmallLetters)) {
        special.classList.remove('errorClass');
    }
    return error;
};

class SignupForm extends Component {
    constructor() {
        super();
        this.state = {
            recaptchaVerified: false,
            hasGovEmail: false,
        };
        this.qualifiedGovId = ['.gov', '.mil', '.state', '.edu'];
    }

    verifyCallback = () => {
        this.setState({
            recaptchaVerified: true,
        });
    }

    checkDomain = (values) => {
        const { email } = values;
        let getDomain = null;
        if (email) {
            getDomain = email.substring(email.lastIndexOf('.'));
            return getDomain.toLowerCase();
        }
        return getDomain.toLowerCase();
    }

    handleChecked = (value) => {
        const { change, emailId } = this.props;
        if (value.target.checked) {
            const getDomain = this.checkDomain({ email: emailId });
            if (getDomain && !this.qualifiedGovId.includes(getDomain)) {
                change('email', '');
                this.setState({
                    hasGovEmail: true,
                });
            }
        }
    };

    handlePasswrdChange = (event) => {
        console.log(event.target.value);
        const inputPass = document.getElementsByName('password')[0].value;

        const capital = document.getElementById('capital');
        const special = document.getElementById('special');
        const length = document.getElementById('length');


        // Atleast one special Character
        const upperCaseLetters = /[A-Z]/g;
        if (inputPass.match(upperCaseLetters)) {
            capital.classList.remove('invalid');
            capital.classList.add('valid');
        } else {
            capital.classList.remove('valid');
            capital.classList.add('invalid');
        }


        // Length of 8 Characters minimum
        if (inputPass.length >= 8) {
            length.classList.remove('invalid');
            length.classList.add('valid');
        } else {
            length.classList.remove('valid');
            length.classList.add('invalid');
        }


        // Atleast one special Character
        const SpecialSmallLetters = /[!@#$%^&*)(+=._-]/g;
        if (inputPass.match(SpecialSmallLetters)) {
            special.classList.remove('invalid');
            special.classList.add('valid');
        } else {
            special.classList.remove('valid');
            special.classList.add('invalid');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { recaptchaVerified, hasGovEmail } = this.state;
        const domMessagePwd = document.getElementById('messagePwd');

        const handlePagesOnSubmit = (values) => {
            const getDomain = this.checkDomain(values);
            if (this.qualifiedGovId.includes(getDomain)) {
                history.push('/gov');
            } else {
                history.push('/com');
            }
        };

        return (

            <div className="formWrap">

                <form onSubmit={handleSubmit(handlePagesOnSubmit)}>

                    <Field
                        name="email"
                        type="text"
                        component={floatingLabelField}
                        label="Email"
                        id="email"
                        placeholder={hasGovEmail
                            ? 'Enter government email ID' : 'Email'}/>
                    <Field
                        name="password"
                        type="password"
                        component={floatingLabelField}
                        label="Create Password"
                        id="pswd"
                        onChange={this.handlePasswrdChange}
                        onFocus={() => {
                            domMessagePwd.style.display = 'block';
                        }}
                        onBlur={() => {
                            domMessagePwd.style.display = 'none';
                            domMessagePwd.style.display = 'block';
                        }}/>
                    <div id="messagePwd">
                        <p id="length" className="invalid">
                            ✔ 8 Character minimum
                        </p>
                        <p id="capital" className="invalid">
                            ✔ At least one capital letter
                        </p>
                        <p id="special" className="invalid">
                            ✔ At least one special characters (!,*,$,@)
                        </p>
                    </div>
                    <FormGroup className="formRowWrap">
                        <ControlLabel className="label-styles">
                            Select only if applicable to your business
                        </ControlLabel>
                        <Checkbox
                            className="checkbox-overrides"
                            onChange={this.handleChecked}>
                            I work for a government entity and I
                            have a government email
                        </Checkbox>
                    </FormGroup>
                    <FormGroup className="formRowWrap">
                        <Recaptcha
                            className="rca-styles"
                            sitekey="6LfKaWoUAAAAAJDt-nKlTsZ92TkprXJ2xqgZ-YND"
                            render="explicit"
                            verifyCallback={this.verifyCallback}
                        />
                    </FormGroup>

                    <div className="form-group formRowWrap">
                        <Button
                            type="submit"
                            onClick={this.handlePasswrdChange}
                            className="btnBlueStyle createAccBtn"
                            disabled={!recaptchaVerified}>
                        Sign Up
                        </Button>
                    </div>
                </form>
                {/* <p className="signInTxt">
                    Already a member of Overstock Professional?
                    <a onClick={() => history.push('/login')}>Sign In </a>
                </p> */}
            </div>
        );
    }
}

SignupForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
   
};


const selector = formValueSelector('SignupForm');
const mapStateToProps = state => ({
    emailId: selector(state, 'email'),
});

const SignUp = reduxForm({
    form: 'SignupForm',
    validate,
})(SignupForm);

export default connect(mapStateToProps)(SignUp);
