import Container from "../fe/src/components/Container";
import Header from "../fe/src/components/Header"
import Footer from "../fe/src/components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Container />
      </main>
      <Footer />
    </div>
  );
}
