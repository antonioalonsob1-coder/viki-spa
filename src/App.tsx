import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomeSection from './components/HomeSection'
import InstitutionalSection from './components/InstitutionalSection'
import FabricSwatches from './components/FabricSwatches'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import QuoteForm from './components/QuoteForm'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <HomeSection />
        <InstitutionalSection />
        <FabricSwatches />
        <Gallery />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
