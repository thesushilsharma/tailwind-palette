import Footer from "@/components/footer";
import { ThemeToggleMode } from "@/components/theme-mode-toggle";
import ThemeSchemaGenerator from "@/components/theme-schema-generator";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist-sans bg-background text-foreground" >
      <ThemeToggleMode />
      <main className="grid grid-cols-1 gap-8 row-start-2 items-start p-6 bg-card shadow-lg rounded-lg w-full">
        <div className="border-r border-border pr-6">
          <ThemeSchemaGenerator />
        </div>
      </main>
      <Footer />
    </div >
  );
}
