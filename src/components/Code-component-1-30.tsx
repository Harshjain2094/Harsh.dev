import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { Smartphone, Code, Database, Wrench, Users, Zap } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Core Android",
      skills: ["Kotlin", "Java", "Jetpack Compose", "Coroutines", "Hilt/Dagger", "MVVM/MVP", "Android Profiler", "Memory Optimization"]
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Architecture & Performance",
      skills: ["Clean Architecture", "Modularization", "Performance Profiling", "UI/UX Optimization", "Crash Analytics", "Memory Management"]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backend & APIs",
      skills: ["Stocks APIs", "Mutual Funds APIs", "IPO Integration", "DigiLocker APIs", "KYC APIs", "Trading APIs"]
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "CI/CD & Tools",
      skills: ["Jenkins", "Gradle", "Git", "Play Store Release", "Automation", "GitHub Actions"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration & Productivity",
      skills: ["Android Studio", "IntelliJ IDEA", "Cross-functional Teams", "Product Strategy", "Agile Development"]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Leadership & Mentorship",
      skills: ["Team Mentoring", "Junior Developer Guidance", "Technical Leadership", "Best Practices", "Code Reviews"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technical skills and tools I use to build exceptional mobile experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="text-primary">
                      {category.icon}
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="mb-4">Coding Standards</h3>
              <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
                I follow industry best practices including clean code principles, SOLID design patterns, 
                comprehensive testing, proper documentation, and consistent code formatting. I believe in 
                writing maintainable, scalable code that can grow with the product and team.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline" className="border-primary text-primary">Clean Code</Badge>
                <Badge variant="outline" className="border-primary text-primary">SOLID Principles</Badge>
                <Badge variant="outline" className="border-primary text-primary">Unit Testing</Badge>
                <Badge variant="outline" className="border-primary text-primary">Code Reviews</Badge>
                <Badge variant="outline" className="border-primary text-primary">Documentation</Badge>
                <Badge variant="outline" className="border-primary text-primary">Performance First</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}