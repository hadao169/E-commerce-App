import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

export default async function HomeLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
