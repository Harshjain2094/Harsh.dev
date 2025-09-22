import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <span className="text-primary text-lg mb-4 block">Hello, I'm</span>
            <h1 className="mb-4">Harsh Jain</h1>
            <h2 className="text-muted-foreground mb-6">Senior Android Developer</h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Passionate Android developer with 7+ years of experience building scalable mobile applications. 
            Specialized in Kotlin, Jetpack Compose, and performance optimization for apps used by millions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 mb-16">
            <a
              href="https://github.com/harshjain-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/harsh-jain-032a2796/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:harsh.chetan20@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-center"
        >
          <a
            href="#about"
            className="text-muted-foreground hover:text-primary transition-colors duration-200 animate-bounce"
          >
            <ChevronDown className="h-6 w-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
