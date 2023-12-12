import { ButtonPrimary, Card, Heading1, Heading2 } from 'design-system';

import '~style.css'; // mandatory to inject tailwindcss styles

import { useEffect, useState } from 'react';
import arrow from 'url:./../../assets/arrow.svg';
import linkedin_logo from 'url:./../../assets/linkedin_logo.svg';
import notion_logo from 'url:./../../assets/notion_logo.svg';
import pin_icon from 'url:./../../assets/pin_icon.svg';

import { sendToBackground } from '@plasmohq/messaging';
import { useStorage } from '@plasmohq/storage/hook';

import { supabase } from '~core/supabase';
import { OnboardingStatus } from '~src/background/messages/users/services/user.service';
import { BasicLayout } from '~src/components/Layouts/BasicLayout';
import { Confetti } from '~src/components/Layouts/Confetti';
import { handleOAuthLogin } from '~src/contents/handleOAuthLogin';

export const OnboardingPage = () => {
  const [numberOfTasks, setNumberOfTasks] = useState<number>(3);
  const [authenticatedUserId] = useStorage('authenticatedUserId');
  const [user, setUser] = useStorage('user');
  const [notionToken, setNotionToken] = useStorage<{
    refreshToken: string;
    accessToken: string;
  }>('notionToken');
  notionToken; // to remove ts error

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();

      setNotionToken({
        accessToken: data.session.provider_token,
        refreshToken: data.session.refresh_token,
      });

      const userData = await sendToBackground({
        name: 'users/resolvers/getOrCreateUserWithAuthenticatedUserId',
        body: { authenticatedUserId: data.session.user.id },
      });
      setUser(userData);
    };

    initSession();
  }, [authenticatedUserId]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.onboarding_status === OnboardingStatus.CONNECTED_TO_NOTION) {
      setNumberOfTasks(2);
    }
    if (user.onboarding_status === OnboardingStatus.FIRST_PROFILE_SAVED) {
      setNumberOfTasks(1);
    }
    if (user.onboarding_status === OnboardingStatus.EXTENSION_PINNED) {
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
    const { url } = await handleOAuthLogin('notion', {
      skipBrowserRedirect: true,
    });
    window.open(url, '_blank');
  };

  const state: Record<string, 'current' | 'done' | 'next'> = {
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

  const checkIsPinned = async () => {
    const userSettings = await chrome.action.getUserSettings();

    if (userSettings.isOnToolbar === true) {
      const userData = await sendToBackground({
        name: 'users/resolvers/updateOnboardingStatus',
        body: { id: user.id, onboardingStatus: OnboardingStatus.EXTENSION_PINNED },
      });
      setUser(userData);
      return;
    }

    alert('Recruitivity does not seem to be pinned. Please pin it and try again.');
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
            <ButtonPrimary state={cardStateToButtonState[state.connectToNotion]} onClick={loginInNewTab}>
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
                chrome.tabs.create({ url: 'https://www.linkedin.com/in/me' });
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
          callToAction={
            <ButtonPrimary state={cardStateToButtonState[state.pinExtension]} onClick={checkIsPinned}>
              {cardStateToButtonState[state.pinExtension] === 'done' ? 'Done' : 'Validate'}
            </ButtonPrimary>
          }
        />
      </div>
    </BasicLayout>
  );
};

export default OnboardingPage;
