import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "harsh.chetan20@gmail.com",
      link: "mailto:harsh.chetan20@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+919950192591",
      link: "tel:+919950192591"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Bengaluru, KA 560087",
      link: null
    }
  ];

  const quickLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      link: "https://github.com/harshjain-dev"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/harsh-jain-032a2796/"
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      link: "https://x.com/Chetan20Harsh"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's discuss opportunities, collaborate on projects, or just have a tech conversation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4">Quick Connect</h4>
              <div className="flex flex-wrap gap-4">
                {quickLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex items-center gap-2 hover:border-primary hover:text-primary"
                  >
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Opportunities Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-border h-full">
              <CardContent className="p-6">
                <h3 className="mb-4">Open to Opportunities</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  I'm always interested in exciting Android development opportunities, 
                  technical leadership roles, and collaborative projects. Feel free to reach out!
                </p>
                <div className="space-y-3 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <p>Android Development & Architecture</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <p>Technical Leadership & Mentoring</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <p>Open Source Collaborations</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <p>Speaking & Workshop Opportunities</p>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <a href="mailto:harsh.chetan20@gmail.com" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Let's Connect
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
