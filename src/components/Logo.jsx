import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function Logo() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const anim = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/fk.json',
    });
    anim.addEventListener('DOMLoaded', () => {
      if (reduce) {
        anim.goToAndStop(anim.totalFrames - 1, true);
        return;
      }
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, easing: 'ease-out' });
      anim.setSpeed(1.5);
      anim.play();
    });
    return () => anim.destroy();
  }, []);

  return <div ref={ref} className="nav__logo" aria-hidden="true" />;
}
