export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center border-t border-border p-4 text-muted-foreground">
        <div className="container mx-auto text-center">
          <p className="text-sm text-foreground">
            Built with ❤️ by{" "}
            <a
              href="https://github.com/thesushilsharma"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-primary font-semibold"
            >
              Sushil Sharma
            </a>
          </p>
          <p className="mt-2 text-sm text-foreground">
            View the source code on{" "}
            <a
              href="https://github.com/thesushilsharma/tailwind-palette"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-primary font-semibold"
            >
              GitHub
            </a>
          </p>
          <p className="text-sm text-foreground">
            &copy; {currentYear} Tailwind Palette. All rights reserved.
          </p>
        </div>
      </footer>
    );
}