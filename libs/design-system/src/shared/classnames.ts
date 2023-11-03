import { ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  // always ensure to complete this list when you add a font size in tailwind.config.js
  classGroups: {
    'font-size': [
      { text: ['3', '3.5', '4', '5', '6', '8', '9', '10', '11', '12', '13', '14', '15', '16', '18', '20', 'lg'] },
    ],
  },
});

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
