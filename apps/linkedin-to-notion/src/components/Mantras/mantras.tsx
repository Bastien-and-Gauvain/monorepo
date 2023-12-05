import { BaseParagraph } from 'design-system';
import { useEffect, useState } from 'react';

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

export const Mantra = ({ interval = 5 }: MantraProps) => {
  // Choose a first random mantra and put it in the state
  const [mantra, setMantra] = useState(chooseRandomMantra());
  const [opacity, setOpacity] = useState('1');

  useEffect(() => {
    // Choose a new mantra every `interval` seconds
    const intervalId = setInterval(async () => {
      setOpacity('0');
      // Same duration as the transition duration
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMantra(chooseRandomMantra());
      setOpacity('1');
    }, interval * 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <div style={{ transition: 'opacity 500ms', opacity }}>
      <BaseParagraph className="plasmo-text-grey-light" alignment="center">
        {mantra}
      </BaseParagraph>
    </div>
  );
};
