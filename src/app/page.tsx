import Hero from '../components/sections/Hero';
import InvestmentOpportunity from '../components/sections/InvestmentOpportunity';
import About from '../components/sections/About';
import Mission from '../components/sections/Mission';
import Programs from '../components/sections/Programs';
import Startups from '../components/sections/Startups';
import Impact from '../components/sections/Impact';
import News from '../components/sections/News';
import Donate from '../components/sections/Donate';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <InvestmentOpportunity />
      <About />
      <Mission />
      <Programs />
      <Startups />
      <Impact />
      <News />
      <Donate />
      <Contact />
    </main>
  );
}
