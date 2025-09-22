import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Github, ExternalLink, Smartphone, TrendingUp, DollarSign, Users } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "InMobi Mobile App Performance Optimization",
      description: "Led comprehensive performance optimization initiative that improved crash-free user rate from 98% to 99.6% and reduced landing page load time from 2 minutes to 800ms, directly impacting conversion funnels and user satisfaction.",
      icon: <Smartphone className="h-6 w-6" />,
      technologies: ["Kotlin", "Jetpack Compose", "Performance Profiling", "Analytics", "Memory Optimization"],
      achievements: [
        "99.6% crash-free user rate (up from 98%)",
        "75% reduction in landing page load time",
        "Improved conversion funnel metrics",
        "Enhanced user engagement"
      ],
      type: "Professional Project",
      company: "InMobi"
    },
    {
      title: "Paytm Money Trading Platform",
      description: "Built core trading and investment modules for one of India's largest investment platforms, handling millions of transactions daily with real-time stock tracking, order placement, and portfolio management features.",
      icon: <TrendingUp className="h-6 w-6" />,
      technologies: ["Java", "Kotlin", "RxJava", "Trading APIs", "Real-time Data", "MVP Architecture"],
      achievements: [
        "Millions of daily transactions",
        "Real-time stock tracking",
        "Seamless order placement",
        "High-volume API integrations"
      ],
      type: "Professional Project",
      company: "Paytm Money"
    },
    {
      title: "Modular Architecture Framework",
      description: "Designed and implemented reusable UI components and modular libraries that reduced feature development timelines by 30%. Created clean architecture patterns adopted across multiple teams.",
      icon: <Users className="h-6 w-6" />,
      technologies: ["Kotlin", "Hilt/Dagger", "Clean Architecture", "Modular Design", "Reusable Components"],
      achievements: [
        "30% reduction in development time",
        "Reusable across teams",
        "Improved code quality",
        "Standardized architecture"
      ],
      type: "Architecture Project",
      company: "InMobi"
    },
    {
      title: "DigiLocker KYC Integration",
      description: "Implemented seamless DigiLocker integration for KYC verification, enabling fully online onboarding flow adopted by millions of users with enhanced security and user experience.",
      icon: <DollarSign className="h-6 w-6" />,
      technologies: ["Android SDK", "DigiLocker APIs", "Security", "KYC", "Identity Verification"],
      achievements: [
        "Millions of users onboarded",
        "Fully online KYC process",
        "Enhanced security measures",
        "Seamless user experience"
      ],
      type: "Integration Project", 
      company: "Paytm Money"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key projects and achievements in mobile development and technical leadership
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <div className="text-primary mt-1">
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">{project.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          {project.type}
                        </Badge>
                        <Badge variant="secondary" className="bg-muted/50">
                          {project.company}
                        </Badge>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-3">Key Achievements</h4>
                      <ul className="space-y-1">
                        {project.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-muted-foreground text-sm">
                            • {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="mb-4">Open Source & Personal Projects</h3>
              <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
                I believe in contributing to the developer community through open source projects and sharing knowledge. 
                Check out my GitHub for various Android samples, utilities, and experimental projects.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <a 
                    href="https://github.com/harshjain-dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="#contact"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Discuss Projects
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
