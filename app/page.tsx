import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Learning from "../components/Learning";
import WhyHireMe from "../components/WhyHireMe";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Learning />
        <WhyHireMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
