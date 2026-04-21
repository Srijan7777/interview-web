export const TIMER_CONFIG = {
  dsa: {
    easy: 20 * 60,
    medium: 35 * 60,
    hard: 45 * 60,
  },
  hld: {
    default: 45 * 60,
  },
} as const;

export const HLD_PROMPTS = [
  {
    id: "url-shortener",
    title: "Design a URL Shortener",
    prompt: "Design a URL shortening service like bit.ly or TinyURL that can handle 10M daily active users.",
    requirements: [
      "Handle 100K requests per second",
      "Short URLs should be unique and non-guessable",
      "Redirects should happen in < 100ms",
      "Support custom short URLs",
      "Track analytics (click count, geolocation)",
    ],
    complexity: "intermediate" as const,
  },
  {
    id: "notification-system",
    title: "Design a Notification System",
    prompt: "Design a real-time notification system for a social media platform.",
    requirements: [
      "Send notifications to 100M users",
      "Real-time delivery (< 1 second latency)",
      "Support multiple notification types (likes, comments, messages)",
      "Users can subscribe to notification channels",
      "Guarantee at-least-once delivery",
    ],
    complexity: "advanced" as const,
  },
  {
    id: "cache-system",
    title: "Design a Distributed Cache",
    prompt: "Design a distributed caching system similar to Redis or Memcached.",
    requirements: [
      "Key-value store with expiration",
      "Distributed across multiple nodes",
      "Support LRU eviction",
      "Consistent hashing for scaling",
      "Handle node failures",
    ],
    complexity: "advanced" as const,
  },
  {
    id: "chat-system",
    title: "Design a Chat Application",
    prompt: "Design a real-time chat system supporting 10M concurrent users.",
    requirements: [
      "One-to-one and group messaging",
      "Real-time message delivery",
      "Message history and search",
      "User presence (online/offline status)",
      "Typing indicators",
    ],
    complexity: "advanced" as const,
  },
  {
    id: "search-engine",
    title: "Design a Search Engine",
    prompt: "Design a search engine that indexes and searches across billions of documents.",
    requirements: [
      "Index billions of web pages",
      "Return results in < 500ms",
      "Support full-text search with relevance ranking",
      "Handle misspellings and synonyms",
      "Distributed crawling and indexing",
    ],
    complexity: "advanced" as const,
  },
  {
    id: "video-platform",
    title: "Design a Video Streaming Platform",
    prompt: "Design a platform like YouTube that streams videos to millions of users.",
    requirements: [
      "Upload and transcode videos",
      "Stream to 10M concurrent users",
      "Support adaptive bitrate streaming",
      "CDN for global distribution",
      "Minimize startup time (< 2 seconds)",
    ],
    complexity: "advanced" as const,
  },
  {
    id: "payment-system",
    title: "Design a Payment System",
    prompt: "Design a payment processing system for an e-commerce platform.",
    requirements: [
      "Handle transactions with strong consistency",
      "Support multiple payment methods",
      "Fraud detection and prevention",
      "High throughput (10K transactions/sec)",
      "Audit trail and dispute resolution",
    ],
    complexity: "advanced" as const,
  },
  {
    id: "recommendations",
    title: "Design a Recommendation System",
    prompt: "Design a recommendation engine for Netflix or Amazon.",
    requirements: [
      "Real-time personalization",
      "Handle cold-start problem for new users",
      "Support collaborative filtering",
      "A/B testing infrastructure",
      "Model serving at scale",
    ],
    complexity: "advanced" as const,
  },
];
