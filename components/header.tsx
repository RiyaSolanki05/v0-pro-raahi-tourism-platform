import { Button } from "@/components/ui/button";
import { MapPin, Menu } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-bold text-foreground">ProRaahi</span>
            <div className="text-xs text-muted-foreground">
              Jharkhand Tourism
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#destinations"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Destinations
          </Link>
          <Link
            href="#experiences"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Experiences
          </Link>
          <Link
            href="#culture"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Culture
          </Link>
          <Link
            href="#contact"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Contact
          </Link>
          <a
            href="https://jharkhand-arvr-journey.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Feel It
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="hidden sm:flex" asChild>
            <Link href="https://proraahibot.onrender.com/">Ask AI Guide</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 shadow-lg" asChild>
            <Link href="/plan">Start Adventure</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
