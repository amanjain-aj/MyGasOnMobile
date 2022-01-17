import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

import MobileNumber from './MobileNumber';
import VerifyOTP from './VerifyOTP';
import ConfirmPassword from './ConfirmPassword';

const ForgotPassword = ({ navigation }) => {
  const [step, setStep] = useState(1);
  


  const onNavigate = (page) => navigation.navigate(page);
  const [data, setData] = useState({
    mobile: null,
    otp:null
  });
  return (
    <>
      {step === 1 && (
        <MobileNumber
          onSubmit={(result) => {

            setData(result)
            setStep(2)
          }}
          onNavigate={onNavigate}
        />
      )}
      {step === 2 && (
        <VerifyOTP otpData={data && data} onSubmit={(result) => {
          
          setData(result)
          setStep(3)
        }} />
      )}
      {step === 3 && <ConfirmPassword navigation={ navigation} otpData={data && data} onSubmit={setTimeout(() => setStep(3),2000)} />}
    </>
  );
};

export default ForgotPassword;
