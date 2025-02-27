import CatLogo from "@/components/CatLogo";

export default function Footer() {
  return (
    <footer className="px-8 py-4 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center text-muted-foreground text-sm mb-4 md:mb-0">
          <div className="hidden md:block mr-2">
            <CatLogo width={24} height={24} />
          </div>
          <div>
            © 2023-2025 Cat Driven by CatsDAO. All Rights Reserved
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-xs text-muted-foreground mr-4 font-semibold">
            BUILT WITH <span className="text-primary font-bold">♥</span> BY CATSDAO
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <i className="fab fa-discord"></i>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
