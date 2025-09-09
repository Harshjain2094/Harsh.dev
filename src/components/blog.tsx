import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Calendar, ExternalLink, BookOpen, Clock, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { MediumService, type MediumArticle } from "../services/medium";

interface ProcessedArticle {
  title: string;
  description: string;
  publishedDate: string;
  readingTime: string;
  tags: string[];
  mediumUrl: string;
  category: string;
  featured: boolean;
  thumbnail?: string;
}

export function Blog() {
  const [articles, setArticles] = useState<ProcessedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Replace with your actual Medium username
  const MEDIUM_USERNAME = "harsh.chetan20";

  // Helper function to extract clean text snippet with dynamic length
  const extractSnippet = (content: string, articleCount: number = 3): string => {
    if (!content) return 'Click to read more...';
    const textContent = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').trim();
    
    // Slightly longer descriptions for fewer articles, but more reasonable
    const maxLength = articleCount === 1 ? 250 : articleCount === 2 ? 220 : 200;
    
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  useEffect(() => {
    const fetchMediumArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const mediumArticles = await MediumService.fetchArticles(MEDIUM_USERNAME);
        
        const processedArticles: ProcessedArticle[] = mediumArticles.map((article, index) => {
          const categories = MediumService.extractCategories(
            article.description || article.content || '', 
            article.title,
            article.categories || []
          );
          const primaryCategory = categories[0] || 'Technology';
          
          return {
            title: article.title,
            description: article.contentSnippet || extractSnippet(article.description || '', mediumArticles.length),
            publishedDate: article.pubDate,
            readingTime: MediumService.calculateReadingTime(article.description || article.content || ''),
            tags: categories.slice(0, 4), // Limit to 4 tags
            mediumUrl: article.link,
            category: primaryCategory,
            featured: index < 2, // Mark first 2 articles as featured
            thumbnail: article.thumbnail
          };
        });

        setArticles(processedArticles);
      } catch (err) {
        console.error('Failed to fetch Medium articles:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load articles: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumArticles();
  }, []);

  // Get unique categories from articles
  const categories = ["All", ...Array.from(new Set(articles.map(article => article.category)))];

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // Dynamic grid classes based on article count
  const getGridClasses = (articleCount: number) => {
    if (articleCount === 1) {
      return "grid grid-cols-1 max-w-2xl mx-auto"; // Single article centered, more reasonable width
    } else if (articleCount === 2) {
      return "grid lg:grid-cols-2 md:grid-cols-1 gap-8 max-w-4xl mx-auto"; // Two articles centered
    } else if (articleCount <= 4) {
      return "grid lg:grid-cols-2 md:grid-cols-2 gap-8"; // Up to 4 articles in 2 columns
    } else {
      return "grid lg:grid-cols-3 md:grid-cols-2 gap-8"; // 5+ articles in 3 columns
    }
  };

  // Get card size classes based on article count for enhanced presentation
  const getCardClasses = (articleCount: number, baseClasses: string) => {
    if (articleCount === 1) {
      return `${baseClasses}`; // Normal height for single card too
    } else if (articleCount === 2) {
      return `${baseClasses}`; // Normal height for two cards
    } else {
      return baseClasses; // Normal height for 3+ cards
    }
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Tech Blog</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Loading articles from Medium...
            </p>
          </motion.div>
          
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Fetching latest articles...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Tech Blog</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sharing insights on Android development, architecture patterns, and mobile engineering best practices
            </p>
          </motion.div>
          
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">Unable to Load Articles</h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button asChild>
                <a 
                  href={`https://medium.com/@${MEDIUM_USERNAME}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Visit Medium Profile
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Tech Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing insights on Android development, architecture patterns, and mobile engineering best practices
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === selectedCategory ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </motion.div>
        )}

        {filteredArticles.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No Articles Found</h3>
              <p className="text-muted-foreground mb-6">
                No articles found for the selected category. Check back soon for new content!
              </p>
              <Button asChild>
                <a 
                  href={`https://medium.com/@${MEDIUM_USERNAME}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Visit Medium Profile
                </a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={getGridClasses(filteredArticles.length)}>
            {filteredArticles.map((post, index) => (
              <motion.div
                key={post.mediumUrl}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={getCardClasses(
                  filteredArticles.length,
                  `h-full bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group ${
                    post.featured ? 'ring-2 ring-primary/20' : ''
                  }`
                )}>
                  {post.thumbnail && (
                    <div className={`relative w-full overflow-hidden rounded-t-xl ${
                      filteredArticles.length === 1 ? 'h-52' : filteredArticles.length === 2 ? 'h-48' : 'h-48'
                    }`}>
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge variant="default" className="bg-primary/20 text-primary border-primary/40">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                      {post.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime}
                        </div>
                      </div>
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <a 
                          href={post.mediumUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <BookOpen className="h-4 w-4" />
                          Read on Medium
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="mb-4">Follow My Writing Journey</h3>
              <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
                I regularly share insights about Android development, software architecture, and mobile engineering. 
                Follow me on Medium to stay updated with the latest articles and technical discussions.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <a 
                    href={`https://medium.com/@${MEDIUM_USERNAME}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Follow on Medium
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="#contact"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Suggest Topics
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