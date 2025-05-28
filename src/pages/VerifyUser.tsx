import OTPInput from "../auth/OTPInput";

function VerifyUser() {
  const handleSubmit = (pin: string) => {
    console.log(pin);

    //LOGIC GOES HERE FOR THE APP
  };
  return (
    <div>
      <OTPInput length={4} onComplete={handleSubmit} />
    </div>
  );
}

export default VerifyUser;
