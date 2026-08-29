// app/page.tsx
import BackgroundGlow from '@/components/background';
import Header from '@/components/content/header'
import About from '@/components/content/about'
import Certificate from '@/components/content/certifica'
import Skills from '@/components/content/skills'
import Tools from '@/components/content/tools'
import Projects from '@/components/content/project'
import Footer from '@/components/content/footer';
import Contact from '@/components/content/contact'


export default function Home() {
  return (
    <BackgroundGlow
    // glowColor="rgba(147, 51, 234, 0.3)"
    //  size={400}
    //   blur={70}
    >
      <main >
        <div className="relative z-10" id="home">
          <Header />
        </div>

        <div className="relative z-10 mt-10 mb-25" id="sobre">
          <About />
        </div>

        <div className="relative z-10 mt-10" id="formacao">
          <Certificate />
        </div>

        <div className="relative z-10 mt-10" id='habilidades'>
          <Skills />
        </div>

        <div className="relative z-10 ">
          <Tools />
        </div>


        <div className="relative z-10 mt-10" id='projectos'>
          <Projects />
        </div>
        <div className="relative z-10 mt-10" id='contacto'>
          <Contact />
        </div>
        <div className="relative z-10 mt-10">
          <Footer />
        </div>
      </main>
    </BackgroundGlow>
  );
}