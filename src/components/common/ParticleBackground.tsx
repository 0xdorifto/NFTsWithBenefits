import { FC, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

const ParticleBackground: FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          opacity: 0
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          opacity: {
            value: 0.2
          },
          size: {
            value: 3
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.1,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            random: true
          }
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            }
          }
        }
      }}
      className="absolute inset-0"
    />
  );
};

export default ParticleBackground;
