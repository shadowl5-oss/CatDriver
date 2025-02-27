export default function Footer() {
  return (
    <footer className="px-8 py-4 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-muted-foreground text-sm mb-4 md:mb-0">
          © 2023-2025 Cat Driven Value, Inc. All Rights Reserved
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-muted-foreground hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-muted-foreground hover:text-white">
            <i className="fab fa-discord"></i>
          </a>
          <a href="#" className="text-muted-foreground hover:text-white">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="#" className="text-muted-foreground hover:text-white">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
