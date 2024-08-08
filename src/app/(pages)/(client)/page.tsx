import { Button } from "@/components/ui/button";
import Header from "./_components/header";
import Hero from "./_components/hero";
import SpecialProducts from "./_components/spceialProducts";
import About from "./_components/about";
import NewsLettter from "./_components/newsletter";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SpecialProducts />
      <About />
      <NewsLettter />
      <Footer />
    </>
  );
}
