// Medium Article Types
export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  contentSnippet?: string;
  guid: string;
  categories: string[];
  thumbnail?: string;
  author: string;
}

export interface MediumFeedResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: MediumArticle[];
}

// Service to fetch Medium articles
export class MediumService {
  private static readonly RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';
  
  static async fetchArticles(mediumUsername: string): Promise<MediumArticle[]> {
    try {
      const mediumRSSUrl = `https://medium.com/feed/@${mediumUsername}`;
      const apiUrl = `${this.RSS2JSON_API}?rss_url=${encodeURIComponent(mediumRSSUrl)}`;
      
      console.log('Fetching from URL:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MediumFeedResponse = await response.json();
      console.log('API Response:', data);
      
      if (data.status !== 'ok') {
        console.error('API returned non-ok status:', data);
        throw new Error(`API Error: ${data.status || 'Unknown error'}`);
      }
      
      if (!data.items || data.items.length === 0) {
        console.warn('No articles found in response');
        return [];
      }
      
      // Filter out comments and responses
      const articles = data.items.filter(item => {
        const title = item.title?.toLowerCase() || '';
        return !title.startsWith('re:') && 
               !title.includes('responded to') &&
               !title.includes('commented on');
      });
      
      console.log(`Found ${articles.length} articles after filtering`);
      
      return articles.map(this.transformArticle);
    } catch (error) {
      console.error('Error fetching Medium articles:', error);
      throw error;
    }
  }
  
  private static transformArticle(article: MediumArticle): MediumArticle {
    return {
      ...article,
      // Clean up the content snippet from description if content is not available
      contentSnippet: article.contentSnippet || MediumService.extractSnippet(article.description || article.content || ''),
      // Extract thumbnail from description if available
      thumbnail: article.thumbnail || MediumService.extractThumbnail(article.description || ''),
      // Use categories as they are from the API response
      categories: Array.isArray(article.categories) ? article.categories : []
    };
  }
  
  static extractSnippet(content: string): string {
    if (!content) return '';
    
    // Remove HTML tags and get first 200 characters
    const textContent = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').trim();
    return textContent.length > 200 
      ? textContent.substring(0, 200) + '...' 
      : textContent;
  }
  
  static extractThumbnail(content: string): string | undefined {
    if (!content) return undefined;
    
    // Try to extract first image from content
    const imgMatch = content.match(/<img[^>]*src="([^"]*)"[^>]*>/);
    return imgMatch ? imgMatch[1] : undefined;
  }
  
  static calculateReadingTime(content: string): string {
    if (!content) return '1 min read';
    
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    return `${minutes} min read`;
  }
  
  static extractCategories(content: string, title: string, existingCategories: string[]): string[] {
    // Use existing categories from Medium if available
    if (existingCategories && existingCategories.length > 0) {
      return existingCategories.map(cat => 
        cat.charAt(0).toUpperCase() + cat.slice(1)
      );
    }
    
    const techKeywords = [
      'android', 'kotlin', 'java', 'jetpack compose', 'architecture', 
      'mvvm', 'clean code', 'performance', 'testing', 'ui/ux', 
      'backend', 'api', 'database', 'security', 'mobile', 'ai', 
      'refactoring', 'clean-code'
    ];
    
    const contentLower = (content + ' ' + title).toLowerCase();
    const foundCategories: string[] = [];
    
    techKeywords.forEach(keyword => {
      if (contentLower.includes(keyword)) {
        // Capitalize first letter
        const category = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        if (!foundCategories.includes(category)) {
          foundCategories.push(category);
        }
      }
    });
    
    // Default category if none found
    if (foundCategories.length === 0) {
      foundCategories.push('Technology');
    }
    
    return foundCategories;
  }
}