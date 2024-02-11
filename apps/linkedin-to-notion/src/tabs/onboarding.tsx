import { ButtonPrimary, Card, Heading1, Heading2 } from 'design-system';

import '~style.css'; // mandatory to inject tailwindcss styles

import { useEffect, useState } from 'react';
import arrow from 'url:./../../assets/arrow.svg';
import linkedin_logo from 'url:./../../assets/linkedin_logo.svg';
import notion_logo from 'url:./../../assets/notion_logo.svg';
import pin_icon from 'url:./../../assets/pin_icon.svg';

import { sendToBackground } from '@plasmohq/messaging';

import { signInWithOAuth } from '~core/supabase';
import { OnboardingStatus } from '~src/background/messages/users/services/user.service';
import { BasicLayout } from '~src/components/Layouts/BasicLayout';
import { Confetti } from '~src/components/Layouts/Confetti';
import { useGetUser } from '~src/components/Shared/getUser.hook';
import { routes } from '~src/routes';

export const OnboardingPage = () => {
  const [numberOfTasks, setNumberOfTasks] = useState<number>(3);
  const [user, setUser] = useGetUser('network-only');
  const [checkIsPinnedInterval, setCheckIsPinnedInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.onboarding_status === OnboardingStatus.CONNECTED_TO_NOTION) {
      setNumberOfTasks(2);
    }
    if (user.onboarding_status === OnboardingStatus.FIRST_PROFILE_SAVED) {
      setNumberOfTasks(1);
      const interval = setInterval(checkIsPinned, 1000);
      setCheckIsPinnedInterval(interval);
    }
    if (user.onboarding_status === OnboardingStatus.EXTENSION_PINNED) {
      setNumberOfTasks(0);
      checkIsPinnedInterval && clearInterval(checkIsPinnedInterval);
    }
  }, [user]);

  const headingContent: Record<number, string> = {
    3: '3 SIMPLE STEPS AWAY FROM NEVER COPY PASTING INFORMATION FROM LINKEDIN AGAIN.',
    2: '2 SIMPLE STEPS AWAY FROM NEVER COPY PASTING INFORMATION FROM LINKEDIN AGAIN.',
    1: '1 SIMPLE STEP AWAY FROM NEVER COPY PASTING INFORMATION FROM LINKEDIN AGAIN.',
    0: 'YOU ARE READY TO GO!',
  };

  const state: Record<'connectToNotion' | 'saveFirstProfile' | 'pinExtension', 'current' | 'done' | 'next'> = {
    connectToNotion: numberOfTasks === 3 ? 'current' : 'done',
    saveFirstProfile: numberOfTasks === 2 ? 'current' : numberOfTasks === 3 ? 'next' : 'done',
    pinExtension:
      numberOfTasks === 1 ? 'current' : numberOfTasks === 2 ? 'next' : numberOfTasks === 3 ? 'next' : 'done',
  };

  const cardStateToButtonState: Record<string, 'default' | 'disabled' | 'done'> = {
    current: 'default',
    next: 'disabled',
    done: 'done',
  };

  const checkIsPinned = async (): Promise<void> => {
    const userSettings = await chrome.action.getUserSettings();

    if (userSettings.isOnToolbar === true && user?.id) {
      const userData = await sendToBackground({
        name: 'users/resolvers/updateOnboardingStatus',
        body: { id: user.id, onboardingStatus: OnboardingStatus.EXTENSION_PINNED },
      });
      setUser(userData);
      return;
    }
  };

  return (
    <BasicLayout>
      {numberOfTasks === 0 && <Confetti />}
      <Heading1 color="plasmo-text-white" className="plasmo-text-center plasmo-px-16 plasmo-w-5/6">
        {headingContent[numberOfTasks]}
      </Heading1>
      <div className="plasmo-grid plasmo-grid-cols-1 md:plasmo-grid-cols-2 xl:plasmo-grid-cols-3 plasmo-gap-14 plasmo-items-center">
        <Card
          className="plasmo-bg-background-light"
          title={<Heading2>1 - Connect to Notion</Heading2>}
          icon={<img src={notion_logo} alt="Notion Logo" width={150} height={150} />}
          callToAction={
            <ButtonPrimary
              state={cardStateToButtonState[state.connectToNotion]}
              onClick={async () =>
                await signInWithOAuth('notion', {
                  redirectUrl: routes.tabs.onboarding,
                })
              }>
              {cardStateToButtonState[state.connectToNotion] === 'done' ? 'Done' : 'Connect to Notion'}
            </ButtonPrimary>
          }
          state={state.connectToNotion}
        />
        <Card
          className="plasmo-bg-background-light"
          title={<Heading2>2 - Save a first profile</Heading2>}
          icon={<img src={linkedin_logo} alt="LinkedIn Logo" width={150} height={150} />}
          callToAction={
            <ButtonPrimary
              state={cardStateToButtonState[state.saveFirstProfile]}
              onClick={() => {
                window.location.href = routes.linkedin.me;
              }}>
              {cardStateToButtonState[state.saveFirstProfile] === 'done' ? 'Done' : 'Go to LinkedIn'}
            </ButtonPrimary>
          }
          state={state.saveFirstProfile}
        />
        {state.pinExtension === 'current' && (
          <img
            className="plasmo-hidden xl:plasmo-block plasmo-absolute plasmo-top-6 plasmo-right-24 -plasmo-z-10"
            src={arrow}
            alt="Pin Icon"
          />
        )}
        <Card
          className="plasmo-bg-background-light"
          title={<Heading2>3 - Pin the extension</Heading2>}
          icon={<img src={pin_icon} alt="Pin Icon" width={150} height={150} />}
          state={state.pinExtension}
        />
      </div>
    </BasicLayout>
  );
};

export default OnboardingPage;
