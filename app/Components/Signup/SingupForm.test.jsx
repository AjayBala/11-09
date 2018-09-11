
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import SignupFormConnected, {
    validate, floatingLabelField, SignupForm,
} from './SignupForm';

describe('Test suits for <signupform />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    const onSubmitCall = sinon.spy();
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
    beforeEach(() => {
        wrapperRedComp = shallow(<SignupForm
            handleSubmit={handleSubmit}
            submitCase={onSubmitCall}
        />);
        component = mount(
            <Provider store={store}>
                <SignupFormConnected
                    submitCase={onSubmitCall} />
            </Provider>,
        );
    });

    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });

    it('renders an error message for the input', () => {
        const input = { name: 'email' };
        const label = 'Email';
        const meta = { touched: true, error: 'Required' };
        const type = 'email';
        const element = floatingLabelField({
            label, type, input, meta,
        });
        mount(element);
    });

    it('inValid Email', () => {
        const aptError = validate({ email: '' });
        expect(aptError.email).to.equal('Required');
    });

    it('inValid Password', () => {
        const aptError = validate({ password: '' });
        expect(aptError.password).to.equal('Required');
    });

    it('inValid Email', () => {
        const aptError = validate({ email: 'Overstock@' });
        expect(aptError.email).to.equal('Please Enter a Valid Email');
    });

    it('Valid Email', () => {
        const aptError = validate({ email: 'Overstock@gmail.com' });
        expect(aptError.email).to.equal(undefined);
    });

    it('inValid password', () => {
        const aptError = validate({ password: 'Over' });
        expect(aptError.password).to.equal('Password should be greater than 8');
    });
    it('inValid password', () => {
        const aptError = validate({ password: 'OverkafugjkfgakjfbkfW' });
        expect(aptError.password).to.equal('Password should be lesser than 16');
    });

    it('Valid password', () => {
        const aptError = validate({ password: 'Overstock18' });
        expect(aptError.password).to.equal(undefined);
    });

    it('should navigate to government domain', () => {
        const formWrapper = component.find('form').at('0');
        console.log(component.instance(), 'CHCHCEHCEDHDFDG');
        formWrapper.props().onSubmit();
    });

    it('Value must be cleared and placeholder should be changed on selected the checkbox', () => {
        const value = { target: { checked: true } };
        const instance = wrapperRedComp.instance();
        instance.render();
        instance.handleChecked(value);
    });

    it('Component is unmounted', () => {
        component.unmount();
    });
});
