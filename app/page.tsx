import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import WhyHireMe from "../components/WhyHireMe";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="space-y-32">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <WhyHireMe />
      <Contact />
      <Footer />
    </main>
  );
}