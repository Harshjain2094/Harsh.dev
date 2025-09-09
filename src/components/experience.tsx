import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Senior Android Developer",
      company: "InMobi",
      location: "Bengaluru",
      period: "10/2021 - Current",
      achievements: [
        "Boosted app stability and performance: Improved crash-free users rate from 98% → 99.6% by monitoring analytics and implementing fixes",
        "Optimized app responsiveness: Reduced landing page load time from ~2 minutes → ~800ms, significantly improving conversion funnels",
        "Led reusable architecture: Designed modular libraries and reusable UI components, cutting feature development timelines by ~30%",
        "Mentorship & leadership: Guided 5+ junior developers on best practices (architecture, performance, testing), increasing team velocity",
        "Cross-functional impact: Partnered with design and product to launch multiple features with UI/UX consistency and measurable user satisfaction improvements"
      ],
      technologies: ["Kotlin", "Jetpack Compose", "Coroutines", "Hilt/Dagger", "MVVM", "Performance Profiling"]
    },
    {
      title: "Android Developer",
      company: "Paytm Money",
      location: "Bengaluru", 
      period: "10/2019 - 09/2021",
      achievements: [
        "Owned trading & investment flows: Contributed to core Stocks, Mutual Funds, and IPO modules for one of India's largest investment apps",
        "Delivered high-volume features: Built real-time stock tracking & order placement modules, handling millions of transactions daily",
        "Collaboration: Worked closely with backend engineers to refactor API integrations, ensuring stability under peak trading volumes",
        "API integrations at scale: Delivered seamless DigiLocker integration for KYC, adopted by millions of users in fully online onboarding flow"
      ],
      technologies: ["Java", "Kotlin", "RxJava", "Retrofit", "Room", "MVP Architecture", "Trading APIs"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Work Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building scalable mobile solutions and leading technical initiatives
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="mb-2">{exp.title}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ExternalLink className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-muted-foreground leading-relaxed">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-4 border-t border-border">
                      <h4 className="mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
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
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="mb-4">Education</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground">
                <span>B.Tech, Electronics And Communications Engineering</span>
                <span className="hidden sm:block">•</span>
                <span>Arya College of Engg. And I.T. - Jaipur</span>
                <span className="hidden sm:block">•</span>
                <span>08/2017</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}