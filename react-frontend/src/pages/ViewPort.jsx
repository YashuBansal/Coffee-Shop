import { useEffect } from "react";

const Viewport = () => {
  useEffect(() => {
    // Set the real viewport height to a CSS variable
    const setRealVh = () => {
      document.documentElement.style.setProperty(
        "--real-vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    // Initial call to set the variable
    setRealVh();

    // Update the variable on resize
    window.addEventListener("resize", setRealVh);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", setRealVh);
    };
  }, []);
};
export default Viewport;
