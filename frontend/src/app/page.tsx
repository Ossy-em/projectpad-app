import Navbar from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FaBrain, FaBook, FaUsers } from "react-icons/fa";


export default function LandingPage() {
  return (
    <div>
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center bg-muted text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Supercharge Your Research Workflow
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            From literature reviews to references, organize everything in one place.
          </p>
          <Button size="lg">Login to Get Started</Button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Built for Researchers & Final-Year Students
          </h2>
          <FeatureCard
            icon={FaBrain}
            title="Smart Summarization"
            description="Upload research papers and get clean, concise summaries powered by AI."
          />

          <FeatureCard
            icon={FaBook}
            title="Organized References"
            description="Store and manage all your references in one easy-to-use platform." />
          <FeatureCard
            icon={FaUsers}
            title="Collaborative Workspaces"
            description="Work together with your team on projects, share notes, and track progress."
          />


        </div>
      </section>

    </main>
    <Footer />
    </div>
  );
}
