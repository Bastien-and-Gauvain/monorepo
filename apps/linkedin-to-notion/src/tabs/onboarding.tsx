import { ButtonPrimary, Card, Heading1, Heading2 } from 'design-system';

import '~style.css'; // mandatory to inject tailwindcss styles

import { useEffect, useState } from 'react';
import linkedin_logo from 'url:./../../assets/linkedin_logo.svg';
import notion_logo from 'url:./../../assets/notion_logo.svg';
import pin_icon from 'url:./../../assets/pin_icon.svg';

import { useStorage } from '@plasmohq/storage/hook';

import { OnboardingStatus } from '~src/background/messages/users/services/user.service';
import type { Tables } from '~src/background/types/supabase';
import { BasicLayout } from '~src/components/Layouts/BasicLayout';
import { Confetti } from '~src/components/Layouts/Confetti';
import { handleOAuthLogin } from '~src/contents/handleOAuthLogin';

export const OnboardingPage = () => {
  const [numberOfTasks, setNumberOfTasks] = useState<number>(3);
  const [user] = useStorage<Tables<'users'>>('user');

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

  const headingContent = {
    3: '3 SIMPLE STEPS AWAY FROM NEVER COPY PASTING INFORMATION FROM LINKEDIN AGAIN.',
    2: '2 SIMPLE STEPS AWAY FROM NEVER COPY PASTING INFORMATION FROM LINKEDIN AGAIN.',
    1: '1 SIMPLE STEP AWAY FROM NEVER COPY PASTING INFORMATION FROM LINKEDIN AGAIN.',
    0: 'YOU ARE READY TO GO!',
  };

  const loginInNewTab = async () => {
    const data = await handleOAuthLogin('notion', {
      skipBrowserRedirect: true,
    });
    window.open(data.url, '_blank');
  };

  return (
    <BasicLayout>
      {numberOfTasks === 0 && <Confetti />}
      <Heading1 color="plasmo-text-white" className="plasmo-text-center plasmo-px-16">
        {headingContent[numberOfTasks]}
      </Heading1>
      <div className="plasmo-grid plasmo-grid-cols-1 md:plasmo-grid-cols-2 xl:plasmo-grid-cols-3 plasmo-gap-12 plasmo-items-center">
        <Card
          className="plasmo-bg-background-light"
          title={<Heading2>1 - Connect to Notion</Heading2>}
          icon={<img src={notion_logo} alt="Notion Logo" width={150} height={150} />}
          callToAction={<ButtonPrimary onClick={loginInNewTab}>Connect to Notion</ButtonPrimary>}
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
    </BasicLayout>
  );
};

export default OnboardingPage;
