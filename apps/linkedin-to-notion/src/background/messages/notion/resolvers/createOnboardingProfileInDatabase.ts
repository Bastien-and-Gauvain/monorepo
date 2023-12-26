import type {
  AppendBlockChildrenResponse,
  BlockObjectRequest,
  CreatePageResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { ErrorResponse, NotionProfileInformation } from '../notion.type';
import { NotionProvider } from '../providers/notion.provider';

enum OnboardingContent {
  CALLOUT_TEXT = 'Bastien, congratulations! These 1-click exports are going to save a lot of your time each week. We wanted to thank you, so here’s a quick vid to show you how to get the most out of the extension 👇',
  CALLOUT_ICON = '✨',
  VIDEO_URL = 'https://www.youtube.com/watch?v=ngwr44N6GGI',
}

export type OnboardingPageObjectResponse = AppendBlockChildrenResponse & {
  id: string;
  url: string;
};

const handler: PlasmoMessaging.MessageHandler<
  {
    notionToken: string;
    databaseId: string;
    linkedInProfileInformation: NotionProfileInformation;
  },
  OnboardingPageObjectResponse | ErrorResponse
> = async (req, res) => {
  const { notionToken, databaseId, linkedInProfileInformation } = req.body;
  const notionService = new NotionProvider(notionToken);
  const pageResponse = await notionService.createPageInDatabase(databaseId, linkedInProfileInformation);

  if ((pageResponse as ErrorResponse).error) {
    res.send(pageResponse as ErrorResponse);
    return;
  }

  // If we move along, it means that the pageResponse is a CreatePageResponse
  const blocks: BlockObjectRequest[] = [
    {
      type: 'callout',
      callout: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: OnboardingContent.CALLOUT_TEXT,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
        icon: {
          type: 'emoji',
          emoji: OnboardingContent.CALLOUT_ICON,
        },
        color: 'default',
      },
    },
    {
      type: 'video',
      video: {
        caption: [],
        type: 'external',
        external: {
          url: OnboardingContent.VIDEO_URL,
        },
      },
    },
  ];
  const response = await notionService.appendChildrenBlocksToPage((pageResponse as CreatePageResponse).id, blocks);
  if ((response as ErrorResponse).error) {
    res.send(response as ErrorResponse);
    return;
  }
  const result = {
    ...response,
    id: (pageResponse as PageObjectResponse).id,
    url: (pageResponse as PageObjectResponse).url,
  };
  res.send(result);

  // Open a new tab with the newly created page
  const cleanDatabaseId = databaseId.replaceAll('-', '');
  const cleanPageId = result.id.replaceAll('-', '');
  chrome.tabs.create({ url: `https://www.notion.so/${cleanDatabaseId}?p=${cleanPageId}&pm=s`, active: true });
  return;
};

export default handler;
