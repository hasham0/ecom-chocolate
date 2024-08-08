import Header from "./_components/header";
import Hero from "./_components/hero";
import SpecialProducts from "./_components/spceialProducts";
import About from "./_components/about";
import NewsLettter from "./_components/newsLetter";
import Footer from "./_components/footer";
import Products from "./_components/product";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecialProducts />
      <About />
      {/* dynamic products */}
      <Products />
      <NewsLettter />
      <Footer />
    </>
  );
}
