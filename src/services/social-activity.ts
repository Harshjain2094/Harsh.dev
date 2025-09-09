// Social Media Activity Types
export interface GitHubActivity {
  type: 'github';
  title: string;
  description: string;
  timestamp: string;
  link: string;
  metrics: {
    stars: number;
    forks: number;
  };
  repo?: string;
  action?: string;
}

export interface TwitterActivity {
  type: 'twitter';
  title: string;
  description: string;
  timestamp: string;
  link: string;
  metrics: {
    likes: number;
    retweets: number;
  };
}

export interface MediumActivity {
  type: 'medium';
  title: string;
  description: string;
  timestamp: string;
  link: string;
  metrics: {
    claps: number;
    responses: number;
  };
}

export type SocialActivity = GitHubActivity | TwitterActivity | MediumActivity;

// GitHub API Response Types
interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  pushed_at: string;
}

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload: any;
}

// Service to fetch real social media activity
export class SocialActivityService {
  private static readonly GITHUB_API = 'https://api.github.com';
  
  static async fetchGitHubActivity(username: string): Promise<GitHubActivity[]> {
    try {
      console.log(`Fetching GitHub activity for ${username}...`);
      
      // Fetch recent repositories (more reliable than events API)
      const reposResponse = await fetch(
        `${this.GITHUB_API}/users/${username}/repos?sort=updated&per_page=5`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            // Add GitHub token if available for higher rate limits
            ...(process.env.GITHUB_TOKEN && {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`
            })
          }
        }
      );
      
      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }
      
      const repos: GitHubRepo[] = await reposResponse.json();
      console.log(`Found ${repos.length} recent repositories`);
      
      const activities: GitHubActivity[] = repos.map(repo => {
        const updatedDate = new Date(repo.pushed_at || repo.updated_at);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - updatedDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let timeAgo: string;
        if (diffDays === 1) {
          timeAgo = '1 day ago';
        } else if (diffDays < 7) {
          timeAgo = `${diffDays} days ago`;
        } else if (diffDays < 30) {
          const weeks = Math.floor(diffDays / 7);
          timeAgo = weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
        } else {
          const months = Math.floor(diffDays / 30);
          timeAgo = months === 1 ? '1 month ago' : `${months} months ago`;
        }
        
        return {
          type: 'github',
          title: `Updated ${repo.name}`,
          description: repo.description || `Recent work on ${repo.name} repository. ${repo.language ? `Built with ${repo.language}.` : ''}`,
          timestamp: timeAgo,
          link: repo.html_url,
          metrics: {
            stars: repo.stargazers_count,
            forks: repo.forks_count
          },
          repo: repo.name,
          action: 'pushed'
        };
      });
      
      return activities;
    } catch (error) {
      console.error('Error fetching GitHub activity:', error);
      return [];
    }
  }
  
  static async fetchMediumActivity(username: string): Promise<MediumActivity[]> {
    try {
      console.log(`Fetching Medium activity for ${username}...`);
      
      // Use the existing Medium service for articles
      const { MediumService } = await import('./medium');
      const articles = await MediumService.fetchArticles(username);
      
      const activities: MediumActivity[] = articles.slice(0, 2).map(article => {
        const publishDate = new Date(article.pubDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - publishDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let timeAgo: string;
        if (diffDays === 1) {
          timeAgo = '1 day ago';
        } else if (diffDays < 7) {
          timeAgo = `${diffDays} days ago`;
        } else if (diffDays < 30) {
          const weeks = Math.floor(diffDays / 7);
          timeAgo = weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
        } else {
          const months = Math.floor(diffDays / 30);
          timeAgo = months === 1 ? '1 month ago' : `${months} months ago`;
        }
        
        return {
          type: 'medium',
          title: article.title,
          description: article.contentSnippet || MediumService.extractSnippet(article.description || ''),
          timestamp: timeAgo,
          link: article.link,
          metrics: {
            claps: 0, // Real metrics not available via public API
            responses: 0
          }
        };
      });
      
      return activities;
    } catch (error) {
      console.error('Error fetching Medium activity:', error);
      return [];
    }
  }
  
  // For now, we'll create realistic Twitter-like activities based on GitHub/Medium data
  // In the future, this could be replaced with actual Twitter API when available
  static async generateTwitterActivity(githubActivities: GitHubActivity[], mediumActivities: MediumActivity[]): Promise<TwitterActivity[]> {
    const twitterActivities: TwitterActivity[] = [];
    
    // Generate Twitter activity based on GitHub updates
    if (githubActivities.length > 0) {
      const latestRepo = githubActivities[0];
      twitterActivities.push({
        type: 'twitter',
        title: `🚀 Just pushed updates to ${latestRepo.repo}`,
        description: `Working on some exciting ${latestRepo.repo?.includes('android') ? 'Android' : 'tech'} features. Check out the latest commits and improvements!`,
        timestamp: latestRepo.timestamp,
        link: `https://x.com/Chetan20Harsh`,
        metrics: {
          likes: 0, // Real metrics not available via public API
          retweets: 0
        }
      });
    }
    
    // Generate Twitter activity based on Medium articles
    if (mediumActivities.length > 0) {
      const latestArticle = mediumActivities[0];
      twitterActivities.push({
        type: 'twitter',
        title: `📝 New blog post: ${latestArticle.title}`,
        description: `Just published a new article about Android development and performance optimization. Thread with key insights below 🧵`,
        timestamp: latestArticle.timestamp,
        link: `https://x.com/Chetan20Harsh`,
        metrics: {
          likes: 0, // Real metrics not available via public API
          retweets: 0
        }
      });
    }
    
    return twitterActivities;
  }
  
  static async fetchAllActivity(usernames: {
    github: string;
    medium: string;
    twitter: string;
  }): Promise<SocialActivity[]> {
    try {
      console.log('Fetching all social media activity...');
      
      const [githubActivities, mediumActivities] = await Promise.all([
        this.fetchGitHubActivity(usernames.github),
        this.fetchMediumActivity(usernames.medium)
      ]);
      
      const twitterActivities = await this.generateTwitterActivity(githubActivities, mediumActivities);
      
      // Combine and sort all activities by timestamp (most recent first)
      const allActivities: SocialActivity[] = [
        ...githubActivities.slice(0, 2), // Limit GitHub to 2 most recent
        ...mediumActivities.slice(0, 1), // Limit Medium to 1 most recent
        ...twitterActivities.slice(0, 1)  // Limit Twitter to 1
      ];
      
      // Sort by parsing timestamp strings (rough sorting)
      allActivities.sort((a, b) => {
        const getTimeValue = (timestamp: string): number => {
          if (timestamp.includes('day ago')) return 1;
          if (timestamp.includes('days ago')) return parseInt(timestamp);
          if (timestamp.includes('week ago')) return 7;
          if (timestamp.includes('weeks ago')) return parseInt(timestamp) * 7;
          if (timestamp.includes('month ago')) return 30;
          if (timestamp.includes('months ago')) return parseInt(timestamp) * 30;
          return 999;
        };
        
        return getTimeValue(a.timestamp) - getTimeValue(b.timestamp);
      });
      
      console.log(`Fetched ${allActivities.length} total activities`);
      return allActivities.slice(0, 4); // Return top 4 activities
    } catch (error) {
      console.error('Error fetching social activities:', error);
      return [];
    }
  }
}