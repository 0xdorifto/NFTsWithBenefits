import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticlesContainer() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          number: { value: 15, density: { enable: true, value_area: 800 } },
          color: { value: "#0066FF" },
          opacity: { value: 0.1 },
          size: { value: 3 },
          links: {
            enable: true,
            distance: 150,
            color: "#0066FF",
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
          },
        },
      }}
    />
  );
}
