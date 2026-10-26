import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skill from './components/Skill.jsx'
import Gallery from './components/Gallery.jsx'
import Footer from './components/Footer.jsx'

function App() {

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-6xl">
        <Hero />
        <About />
        <Skill />
        <Gallery />
      </section>
      
      <Footer />
    </>
  )
}

export default App
