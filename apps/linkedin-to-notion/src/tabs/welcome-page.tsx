import logo from 'data-base64:~assets/icon.png';

import './../../style.css';

const WelcomePage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <img src={logo} />
    </div>
  );
};

export default WelcomePage;
