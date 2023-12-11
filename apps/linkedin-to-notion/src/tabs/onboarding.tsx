import { ButtonPrimary, Card, Heading1, Heading2 } from 'design-system';

import '~style.css'; // mandatory to inject tailwindcss styles

import type { Provider } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import recruitivity_icon from 'url:./../../assets/icon.png';
import linkedin_logo from 'url:./../../assets/linkedin_logo.svg';
import notion_logo from 'url:./../../assets/notion_logo.svg';
import pin_icon from 'url:./../../assets/pin_icon.svg';

import { useStorage } from '@plasmohq/storage/hook';

import { supabase } from '~core/supabase';
import { OnboardingStatus } from '~src/background/messages/users/services/user.service';
import type { Tables } from '~src/background/types/supabase';

export const OnboardingPage = () => {
  const [numberOfTasks, setNumberOfTasks] = useState<number>(3);
  const [user] = useStorage<Tables<'users'>>('user');
  console.log('🔥 ・ OnboardingPage ・ user:', user);

  useEffect(() => {
    if (!user) {
      return;
    }

    const onboardingStatus = user.onboarding_status;
    if (onboardingStatus === OnboardingStatus.CONNECTED_TO_NOTION) {
      setNumberOfTasks(2);
    }
    if (onboardingStatus === OnboardingStatus.FIRST_PROFILE_SAVED) {
      setNumberOfTasks(1);
    }
    if (onboardingStatus === OnboardingStatus.EXTENSION_PINNED) {
      setNumberOfTasks(0);
    }
  }, [user]);

  const handleOAuthLogin = async (provider: Provider, scopes?: string) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'chrome-extension://nepaaeacmgpjpeighkbfmgacoinooale/tabs/onboarding.html',
        scopes,
      },
    });
  };

  return (
    <div className="plasmo-bg-background-light plasmo-h-screen plasmo-w-screen">
      <img
        src={recruitivity_icon}
        alt="Recruitivity Logo"
        className="plasmo-absolute plasmo-top-0 plasmo-left-0 plasmo-m-9 plasmo-w-12 plasmo-h-12 plasmo-z-20"
      />
      <div className="plasmo-bg-background-dark plasmo-rounded-b-[236px] plasmo-h-[350px] plasmo-w-full plasmo-absolute" />
      <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-absolute plasmo-z-10 xl:plasmo-pt-28 md:plasmo-pt-20 plasmo-p-12 plasmo-gap-12 plasmo-w-full">
        <Heading1 color="plasmo-text-white" className="plasmo-text-center plasmo-px-16">
          {numberOfTasks} SIMPLE STEP{numberOfTasks > 1 ? 'S' : ''} AWAY FROM NEVER COPY PASTING INFORMATION FROM
          LINKEDIN AGAIN.
        </Heading1>
        <div className="plasmo-grid plasmo-grid-cols-1 md:plasmo-grid-cols-2 xl:plasmo-grid-cols-3 plasmo-gap-12 plasmo-items-center">
          <Card
            className="plasmo-bg-background-light"
            title={<Heading2>1 - Connect to Notion</Heading2>}
            icon={<img src={notion_logo} alt="Notion Logo" width={150} height={150} />}
            callToAction={<ButtonPrimary onClick={() => handleOAuthLogin('notion')}>Connect to Notion</ButtonPrimary>}
            state="current"
          />
          <Card
            className="plasmo-bg-background-light"
            title={<Heading2>2 - Save a first profile</Heading2>}
            icon={<img src={linkedin_logo} alt="LinkedIn Logo" width={150} height={150} />}
            callToAction={<ButtonPrimary state="disabled">Go to LinkedIn</ButtonPrimary>}
            state="next"
          />
          <Card
            className="plasmo-bg-background-light"
            title={<Heading2>3 - Pin the extension</Heading2>}
            icon={<img src={pin_icon} alt="Pin Icon" width={150} height={150} />}
            state="next"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
