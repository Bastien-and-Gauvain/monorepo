import type { Meta, StoryFn } from '@storybook/react';

import { BaseParagraph, LargeParagraph, SmallParagraph } from '.';

const meta = {
  title: 'Atoms/Paragraphs',
  component: BaseParagraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseParagraph>;

export default meta;

export const CommonParagraph: StoryFn = () => (
  <BaseParagraph alignment="center">
    This is a <em>base</em> paragraph. We can say a variety of stuff in there, it just has to look normal.
  </BaseParagraph>
);
export const DescriptionParagraph: StoryFn = () => (
  <SmallParagraph alignment="center">
    This is a <em>small</em> paragraph. We can say a variety of stuff in there, it just has to look small. It can be the
    description of an image for instance
  </SmallParagraph>
);
export const HeroParagraph: StoryFn = () => (
  <LargeParagraph alignment="center">
    This is a <em>large</em> paragraph. We can say a variety of stuff in there, but it's typically stuff that we don't
    want readers to miss.
  </LargeParagraph>
);
