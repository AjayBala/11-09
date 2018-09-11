
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import LoginOtpVerifyForm, {
    validate, LoginOtpVerify, normalizeZip, phoneChange, customPhoneField
} from './LoginOtpVerify';

describe.only('Test suits for <LoginOtpVerify />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    // const onSubmitCall = sinon.spy();
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
    beforeEach(() => {
        wrapperRedComp = shallow(<LoginOtpVerify
            handleSubmit={handleSubmit}

        />);
        component = mount(
            <Provider store={store}>
                <LoginOtpVerifyForm
                    submitCase={handleSubmit} />
            </Provider>,
        );
    });
    afterEach(() => {
        component.unmount();
    });

    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('Should be check 5 digits number', () => {
        const val = '67567';
        const zipError1 = normalizeZip(val, '67567');
        expect(zipError1).to.equal('67567');
    });
    it('Empty case for zip', () => {
        const val = '';
        const zipError1 = normalizeZip(val, '');
        expect(zipError1).to.equal('');
    });

    it('On Custom phoneChange with out values', () => {
        let event = { target: { name: 'comPhoneText1', value: '' } };
        let aptError = phoneChange(3, event);
        event = { target: { name: 'comPhoneText2', value: '' } };
        aptError = phoneChange(3, event);
        event = { target: { name: 'comPhoneText3', value: '' } };
        aptError = phoneChange(4, event);
        expect(aptError).to.equal('');
    });
    it('On Custom phoneChange with out values', () => {
        const event = { target: { name: 'comPhoneText3', value: '' } };
        const aptError = phoneChange(4, event);
        expect(aptError).to.equal('');
    });
    it('On Custom phoneChange with values', () => {
        let event = { target: { name: 'comPhoneText1', value: '123' } };
        let aptError = phoneChange(3, event);
        event = { target: { name: 'comPhoneText2', value: '123' } };
        aptError = phoneChange(3, event);
        event = { target: { name: 'comPhoneText3', value: '1234' } };
        aptError = phoneChange(4, event);
        expect(aptError).to.equal('');
    });
    it('customPhoneField ', () => {
        const input = { name: 'comPhoneText1' };
        const label = 'phonenumber*';
        const meta = { touched: true, error: 'Required' };
        const type = 'text';
        const placeholder = 'phonenumber';
        const element = customPhoneField({
            placeholder, label, type, input, meta,
        });
        shallow(element);
    });
    it('To invoke closeStatus function', () => {
        // const shallowWrapper = shallow(
        //     <LoginOtpVerifyForm />
        // );
        wrapperRedComp.instance().handleChange();
    });
    it('To invoke closeStatus function', () => {
        // const shallowWrapper = shallow(
        //     <LoginOtpVerifyForm />
        // );
        wrapperRedComp.instance().handleSubmitForm();
    });
    // it('Componentwillreceiveprops with openCaseOperationModal false scenario', () => {
    //     wrapperRedComp.setProps({
    //         otp: {
    //             otp: false,
    //         },
    //     });
    //     wrapperRedComp.instance().render();
    // });
  // it('On Custom phoneChange with out values', () => {
    //     // const input = { value: '21', name: 'comPhoneText1', contains: () => {} };
    //     // component.node = input;
    //     let event = { target: { name: 'comPhoneText1', value: '' } };
    //     let aptError = phoneChange(3, event);
    //     event = { target: { name: 'comPhoneText2', value: '' } };
    //     aptError = phoneChange(3, event);
    //     event = { target: { name: 'comPhoneText3', value: '' } };
    //     aptError = phoneChange(4, event);
    //     expect(aptError).to.equal('');
    // });

    // it('On Custom phoneChange with out values', () => {
    //     const event = { target: { name: 'comPhoneText2', value: '' } };
    //     const aptError = phoneChange(3, event);
    //     expect(aptError).to.equal('');
    //     // let event = { target: { name: 'comPhoneText2', value: '' } };
    //     // let aptError = phoneChange(4, event);
    //     // event = { target: { name: 'comPhoneText3', value: '' } };
    //     // aptError = phoneChange(4, event);
    //     // event = { target: { name: 'comPhoneText1', value: '' } };
    //     // aptError = phoneChange(2, event);
    //     // expect(aptError).to.equal('');
    // });

    // it('On Custom phoneChange with values', () => {
    //     let event = { target: { name: 'comPhoneText1', value: '123' } };
    //     let aptError = phoneChange(3, event);
    //     event = { target: { name: 'comPhoneText2', value: '123' } };
    //     aptError = phoneChange(3, event);
    //     event = { target: { name: 'comPhoneText3', value: '1234' } };
    //     aptError = phoneChange(4, event);
    //     expect(aptError).to.equal('');
    // });

    // it('inValid Email', () => {
    //     const aptError = phoneChange({ elemtName: 'comPhoneText1' });
    //          expect(aptError.elemtName).to.equal('comPhoneText2');
    // });

    // it('inValid Email', () => {
    //     const aptError = phoneChange({ email: 'Overstock@' });
    //     expect(aptError.email).to.equal('Please Enter a Valid Email');
    // });


    // it('inValid Password', () => {
    //     const aptError = phoneChange({ password: '' });
    //     expect(aptError.password).to.equal('Required');
    // });

    // it('inValid Password', () => {
    //     const aptError = phoneChange({ password: '1234567' });
    //     expect(aptError.password).to.equal('Password should be greater than 8');
    // });

    // it('inValid Password', () => {
    //     const aptError = phoneChange({ password: '1234567890789456' });
    //     expect(aptError.password).to.equal('Password should be lesser than 16');
    // });

    // it('Valid password', () => {
    //     const aptError = phoneChange({ password: 'Overstock18' });
    //     expect(aptError.password).to.equal(undefined);
    // });

    // it('Valid Email', () => {
    //     const aptError = phoneChange({ email: 'Overstock@gmail.com' });
    //     expect(aptError.email).to.equal(undefined);
    // });
    // it('renders an error message for the input', () => {
    //     const input = { name: 'email' };
    //     const label = 'Email';
    //     const meta = { touched: true, error: 'Required' };
    //     const type = 'email';
    //     const element = floatingLabelField({
    //         label, type, input, meta,
    //     });
    //     mount(element);
    // });

    // it('inValid Email', () => {
    //     const aptError = validate({ email: '' });
    //     expect(aptError.email).to.equal('Required');
    // });

    // it('inValid Password', () => {
    //     const aptError = validate({ password: '' });
    //     expect(aptError.password).to.equal('Required');
    // });

    // it('inValid Email', () => {
    //     const aptError = validate({ email: 'Overstock@' });
    //     expect(aptError.email).to.equal('Please Enter a Valid Email');
    // });

    // it('Valid Email', () => {
    //     const aptError = validate({ email: 'Overstock@gmail.com' });
    //     expect(aptError.email).to.equal(undefined);
    // });

    // it('inValid password', () => {
    //     const aptError = validate({ password: 'Over' });
    //     expect(aptError.password).to.equal('Password should be greater than 8');
    // });
    // it('inValid password', () => {
    //     const aptError = validate({ password: 'OverkafugjkfgakjfbkfW' });
    //     expect(aptError.password).to.equal('Password should be lesser than 16');
    // });

    // it('Valid password', () => {
    //     const aptError = validate({ password: 'Overstock18' });
    //     expect(aptError.password).to.equal(undefined);
    // });

    // it('should navigate to government domain', () => {
    //     const formWrapper = component.find('form').at('0');
    //     console.log(component.instance(), 'CHCHCEHCEDHDFDG');
    //     formWrapper.props().onSubmit();
    // });

    // it('Value must be cleared and placeholder should be changed on selected the checkbox', () => {
    //     const value = { target: { checked: true } };
    //     const instance = wrapperRedComp.instance();
    //     instance.render();
    //     instance.handleChecked(value);
    // });

    // it('Component is unmounted', () => {
    //     component.unmount();
    // });
});
