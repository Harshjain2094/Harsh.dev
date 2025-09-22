import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Edit3, ExternalLink, Calendar, MessageCircle, Heart, GitBranch, Loader2, AlertCircle } from "lucide-react";
import { SocialActivityService, type SocialActivity } from "../services/social-activity";

export function SocialMedia() {
  const [activities, setActivities] = useState<SocialActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Your actual usernames
  const usernames = {
    github: "Harshjain2094",
    medium: "harsh.chetan20",
    twitter: "Chetan20Harsh"
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedActivities = await SocialActivityService.fetchAllActivity(usernames);
        setActivities(fetchedActivities);
      } catch (err) {
        console.error('Failed to fetch social activities:', err);
        setError('Unable to load recent activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const socialLinks = [
    {
      platform: "GitHub",
      icon: <Github className="h-6 w-6" />,
      username: "@Harshjain2094",
      description: "Open source projects & Android utilities",
      link: "https://github.com/harshjain-dev",
      color: "hover:text-gray-300"
    },
    {
      platform: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      username: "Harsh Jain",
      description: "Professional updates & career insights",
      link: "https://www.linkedin.com/in/harsh-jain-032a2796/",
      color: "hover:text-blue-400"
    },
    {
      platform: "Twitter",
      icon: <Twitter className="h-6 w-6" />,
      username: "@Chetan20Harsh",
      description: "Tech thoughts & Android development tips",
      link: "https://x.com/Chetan20Harsh",
      color: "hover:text-blue-300"
    },
    {
      platform: "Medium",
      icon: <Edit3 className="h-6 w-6" />,
      username: "@harsh.chetan20",
      description: "Technical articles & tutorials",
      link: "https://medium.com/@harsh.chetan20",
      color: "hover:text-green-400"
    },
    {
      platform: "Instagram",
      icon: <Instagram className="h-6 w-6" />,
      username: "@harsh.jain20",
      description: "Life updates & behind the scenes",
      link: "https://www.instagram.com/harsh.jain20",
      color: "hover:text-pink-400"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'medium':
        return <Edit3 className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const getPlatformName = (type: string) => {
    switch (type) {
      case 'github':
        return 'GitHub';
      case 'medium':
        return 'Medium';
      case 'twitter':
        return 'Twitter';
      default:
        return 'Social';
    }
  };

  return (
    <section id="social" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Social Media & Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with me across platforms and stay updated with my latest work and insights
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`text-muted-foreground ${social.color} transition-colors duration-200 mb-4 flex justify-center`}>
                    {social.icon}
                  </div>
                  <h4 className="mb-2">{social.platform}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{social.username}</p>
                  <p className="text-xs text-muted-foreground mb-4">{social.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="w-full group-hover:border-primary group-hover:text-primary transition-colors duration-200"
                  >
                    <a href={social.link} target="_blank" rel="noopener noreferrer">
                      Follow
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center mb-8">Recent Activity</h3>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading recent activity...</span>
              </div>
            </div>
          ) : error ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="mb-2">Unable to Load Activities</h4>
                <p className="text-muted-foreground mb-6">{error}</p>
                <div className="flex justify-center gap-4">
                  <Button asChild>
                    <a href="https://github.com/Harshjain2094" target="_blank" rel="noopener noreferrer">
                      View GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://medium.com/@harsh.chetan20" target="_blank" rel="noopener noreferrer">
                      View Medium
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : activities.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <ExternalLink className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="mb-2">No Recent Activity</h4>
                <p className="text-muted-foreground mb-6">Check back soon for updates!</p>
                <div className="flex justify-center gap-4">
                  <Button asChild>
                    <a href="https://github.com/Harshjain2094" target="_blank" rel="noopener noreferrer">
                      View GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://medium.com/@harsh.chetan20" target="_blank" rel="noopener noreferrer">
                      View Medium
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={`${activity.type}-${index}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card border-border hover:border-primary/50 transition-colors duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="text-primary">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="border-primary/30 text-primary">
                              {getPlatformName(activity.type)}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {activity.timestamp}
                            </div>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="mb-3">{activity.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {activity.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {activity.type === "github" && (
                            <>
                              <span className="flex items-center gap-1">
                                <GitBranch className="h-3 w-3" />
                                {activity.metrics.stars} stars
                              </span>
                              <span>{activity.metrics.forks} forks</span>
                            </>
                          )}
                          {activity.type === "medium" && (
                            <span className="flex items-center gap-1">
                              <Edit3 className="h-3 w-3" />
                              Published on Medium
                            </span>
                          )}
                          {activity.type === "twitter" && (
                            <span className="flex items-center gap-1">
                              <Twitter className="h-3 w-3" />
                              Shared on Twitter
                            </span>
                          )}
                        </div>
                        
                        <Button variant="ghost" size="sm" asChild>
                          <a 
                            href={activity.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
