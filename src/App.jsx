import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import SelectedWorks from './components/SelectedWorks.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import { useSiteContent } from './sanity.js';

export default function App() {
  const { content, error } = useSiteContent();

  if (error) {
    return (
      <>
        <Nav />
        <main className="load-error">Sorry, the site couldn't load. Please try again in a moment.</main>
      </>
    );
  }

  return (
    <>
      <Nav />
      {content && (
        <>
          <main>
            <Hero title={content.heroTitle} subtitle={content.heroSubtitle} image={content.heroImage} />
            {/* filter(Boolean) drops references to deleted or unpublished projects */}
            <SelectedWorks projects={(content.projects || []).filter(Boolean)} />
            <About text={content.aboutText} image={content.aboutImage} />
          </main>
          <Contact
            title={content.contactTitle}
            intro={content.contactIntro}
            projectTypes={content.projectTypes || []}
            email={content.email}
            phone={content.phone}
            instagram={content.instagram}
          />
        </>
      )}
    </>
  );
}
