import { Github, Linkedin, Twitter, Instagram, Mail, Heart } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/harshjain-dev",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/harsh-jain-032a2796/",
      label: "LinkedIn"
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://x.com/Chetan20Harsh",
      label: "Twitter"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/harsh.jain20",
      label: "Instagram"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:harsh.chetan20@gmail.com",
      label: "Email"
    }
  ];

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <footer className="bg-card/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <span className="text-primary text-xl">{"[ harsh.dev ]"}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Senior Android Developer passionate about building exceptional mobile experiences 
              and mentoring the next generation of developers.
            </p>
            <p className="text-muted-foreground text-sm">
              📍 Bengaluru, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Always open to interesting conversations and collaboration opportunities.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Harsh Jain. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
