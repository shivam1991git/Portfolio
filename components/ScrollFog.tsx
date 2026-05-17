// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";

// export default function ScrollFog() {
//   const { scrollYProgress } = useScroll();

//   const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.5]);
//   const blur = useTransform(scrollYProgress, [0, 1], [20, 60]);

//   return (
//     <motion.div
//       style={{ opacity, backdropFilter: blur.to(v => `blur(${v}px)`) }}
//       className="pointer-events-none fixed inset-0 z-0"
//     />
//   );
// }