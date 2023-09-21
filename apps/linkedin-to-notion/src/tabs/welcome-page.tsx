import { BaseParagraph, ButtonPrimary, Heading1 } from 'design-system';

import './../../style.css';

import logo from 'data-base64:~assets/icon.png';

const WelcomePage = () => {
  return (
    <div className="w-2/4 h-96 flex flex-col items-center justify-around m-auto">
      <img src={logo} className="w-20" />
      <Heading1 className="text-center">Welcome to LinkedIn to Notion</Heading1>
      <BaseParagraph>This is a tool to help you import LinkedIn profiles into Notion.</BaseParagraph>
      <ButtonPrimary>START</ButtonPrimary>
    </div>
  );
};

export default WelcomePage;
