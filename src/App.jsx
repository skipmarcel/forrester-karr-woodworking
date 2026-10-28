import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import SelectedWorks from './components/SelectedWorks.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWorks />
        <About />
      </main>
      <Contact />
    </>
  );
}
