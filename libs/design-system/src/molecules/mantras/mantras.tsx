import { useEffect, useState } from 'react';

import { BaseParagraph } from '../..';
import { cn } from '../../shared/classnames';

type MantraProps = {
  /**
   * We want to update the mantra at a fixed interval. Default is 5 seconds.
   */
  interval?: number;

  /**
   * Some additional class names
   */
  className?: string;
};

// The typed array of all the pre-defined mantras
const mantras = [
  "Recruitment is marketing, except that you don't sell a product, but the company.",
  'Recruitment velocity increases success rates.',
  'Personalized outreach increases response rates. Pay attention to details.',
  'Constructive feedback turns unfit candidates into ambassadors.',
];

const chooseRandomMantra = () => {
  const index = Math.floor(Math.random() * mantras.length);
  return mantras[index];
};

export const Mantra = ({ interval = 5, className }: MantraProps) => {
  // Choose a first random mantra and put it in the state
  const [mantra, setMantra] = useState(chooseRandomMantra());
  const [opacity, setOpacity] = useState('plasmo-opacity-100');

  useEffect(() => {
    // Choose a new mantra every `interval` seconds
    const intervalId = setInterval(async () => {
      setOpacity('plasmo-opacity-0');
      // Same duration as the transition duration
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMantra(chooseRandomMantra());
      setOpacity('plasmo-opacity-100');
    }, interval * 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <BaseParagraph
      className={cn('plasmo-text-grey-light plasmo-transition-opacity plasmo-duration-500', opacity, className)}
      alignment="center">
      {mantra}
    </BaseParagraph>
  );
};
