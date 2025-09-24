import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">ProRaahi</span>
            </div>
            <p className="text-muted-foreground text-sm">
              AI-powered tourism platform for discovering the cultural richness and natural beauty of Jharkhand.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/booking" className="hover:text-foreground transition-colors">
                  Transportation
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-foreground transition-colors">
                  Local Guides
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-foreground transition-colors">
                  Cultural Events
                </Link>
              </li>
              <li>
                <Link href="/crafts" className="hover:text-foreground transition-colors">
                  Art & Crafts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/ranchi" className="hover:text-foreground transition-colors">
                  Ranchi
                </Link>
              </li>
              <li>
                <Link href="/jamshedpur" className="hover:text-foreground transition-colors">
                  Jamshedpur
                </Link>
              </li>
              <li>
                <Link href="/deoghar" className="hover:text-foreground transition-colors">
                  Deoghar
                </Link>
              </li>
              <li>
                <Link href="/hazaribagh" className="hover:text-foreground transition-colors">
                  Hazaribagh
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ProRaahi. All rights reserved. Celebrating Jharkhand's heritage through technology.</p>
        </div>
      </div>
    </footer>
  )
}
