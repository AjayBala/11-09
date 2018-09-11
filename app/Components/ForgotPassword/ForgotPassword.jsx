import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './password.scss';
import {
    Button,
} from 'react-bootstrap';
import history from '../../history';
import floatingLabelField from '../FloatingLabel/FloatingLabel';

export const validate = values => {
    const error = {};
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);

    const capital = document.getElementById('capital');
    const special = document.getElementById('special');
    const length = document.getElementById('length');
    const upperCaseLetters = /[A-Z]/g;
    const SpecialSmallLetters = /[!@#$%^&*)(+=._-]/g;

    if (!values.password) {
        error.password = 'Required';
    }

    if (!values.confirmPassword) {
        error.confirmPassword = 'Required';
    }

    if (values.password !== values.confirmPassword) {
        error.confirmPassword = 'Please provide matching password';
    }
    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 8) {
        error.password = 'Password should be greater than 8';
    } else if (values.password.length > 15) {
        error.password = 'Password should be lesser than 16';
    }
    if (!values.confirmPassword) {
        error.confirmPassword = 'Required';
    } else if (values.confirmPassword.length < 8) {
        error.confirmPassword = 'Password should be greater than 8';
    } else if (values.confirmPassword.length > 15) {
        error.confirmPassword = 'Password should be lesser than 16';
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


class ForgotPassword extends React.Component {
    componentDidMount() {
        // document.addEventListener('keydown', this.escFunction, false);
    }

    handlePasswrdChange = event => {
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

    escFunction(event) {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const handleSubmitForm = values => {
            console.info('FormValues', values);
            history.push('./');
        };

        const domMessagePwd = document.getElementById('messagePwd');

return (
    <div className="containInnerWrap">
        <div className="loginBoxWrap">
            <div className="loginBox">
                <h1 className="title_h1 forgotTitle"> Create a new password </h1>

                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Field
                        name="password"
                        type="password"
                        component={floatingLabelField}
                        label="Create New Password"
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
                    <Field name="confirmPassword" type="password" component={floatingLabelField} label="Confirm Password"/>
                    <div className="form-group formRowWrap">
                        <Button
                            type="submit"
                            onClick={this.handlePasswrdChange}
                            className="btnBlueStyle createAccBtn">
                        Set New Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
        );
    }
}

export default reduxForm({
    form: 'forgotPassword',
    validate,
})(ForgotPassword);
