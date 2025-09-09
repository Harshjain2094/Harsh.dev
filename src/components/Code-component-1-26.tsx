import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import resumeImage from 'figma:asset/64050ffa91b72c354435c6c4a55431c2fbb64b41.png';

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Crafting exceptional mobile experiences with clean code and innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <img 
                  src={resumeImage} 
                  alt="Harsh Jain Resume" 
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-4">Professional Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                Senior Android Developer with 7+ years of experience designing, building, and scaling 
                consumer and fintech apps used by millions. Proven expertise in Kotlin, Jetpack Compose, 
                Coroutines, Hilt, and scalable MVVM/MVP architecture.
              </p>
            </div>

            <div>
              <h4 className="mb-3">What I Do</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Build high-performance Android applications with modern architecture</li>
                <li>• Optimize app performance and user engagement metrics</li>
                <li>• Mentor junior developers and lead technical initiatives</li>
                <li>• Collaborate with cross-functional teams on product strategy</li>
                <li>• Implement clean code practices and modular UI components</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3">Current Focus</h4>
              <p className="text-muted-foreground leading-relaxed">
                Currently working at InMobi, focusing on boosting app stability and performance 
                while mentoring teams and architecting clean, modular solutions. Always exploring 
                new Android technologies and best practices.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-primary">
                📍 Based in Bengaluru, India
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}