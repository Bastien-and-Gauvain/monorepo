import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useState } from 'react';

export const Confetti = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });

      setInit(true);
    };

    init();
  }, []);

  if (!init) {
    return <></>;
  }

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          zIndex: 100,
        },
        particles: {
          color: {
            value: ['#0E0F16', '#FFFFFF', '#9BA9FF', '#738AFF', '#4F5CFF', '#2B3AFF', '#232536', '#2E5A38', '#EE82EE'],
          },
          move: {
            direction: 'bottom',
            enable: true,
            outModes: {
              default: 'out',
            },
            size: true,
            speed: {
              min: 5,
              max: 20,
            },
          },
          number: {
            value: 500,
            density: {
              enable: true,
            },
          },
          opacity: {
            value: 1,
            animation: {
              enable: false,
              startValue: 'max',
              destroy: 'min',
              speed: 0.3,
              sync: true,
            },
          },
          rotate: {
            value: {
              min: 0,
              max: 360,
            },
            direction: 'random',
            move: true,
            animation: {
              enable: true,
              speed: 60,
            },
          },
          tilt: {
            direction: 'random',
            enable: true,
            move: true,
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 200,
            },
          },
          shape: {
            type: ['circle', 'square'],
            options: {},
          },
          size: {
            value: {
              min: 2,
              max: 4,
            },
          },
          roll: {
            darken: {
              enable: true,
              value: 30,
            },
            enlighten: {
              enable: true,
              value: 30,
            },
            enable: true,
            speed: {
              min: 15,
              max: 200,
            },
          },
          wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
              min: -15,
              max: 200,
            },
          },
        },
      }}
    />
  );
};
