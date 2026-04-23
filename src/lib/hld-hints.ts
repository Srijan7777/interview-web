import { HLDScenario } from "@/types";

export function getDesignHints(scenario: HLDScenario): string[] {
  const hints: Record<string, string[]> = {
    "url-shortener": [
      "Use consistent hashing to distribute short URL generation across servers",
      "Store redirects in a highly available, low-latency cache (Redis)",
      "Consider URL collision handling and uniqueness constraints",
      "Track analytics in a separate async pipeline to avoid impacting redirect latency",
      "Use DNS + CDN for geographic distribution of redirect traffic",
    ],
    "notification-system": [
      "Use a message queue (Kafka/RabbitMQ) to decouple notification producers from consumers",
      "Implement exponential backoff retry logic for failed deliveries",
      "Batch notifications to reduce database writes and API calls",
      "Use WebSocket or Server-Sent Events (SSE) for real-time delivery to connected clients",
      "Consider fan-out strategies: fan-out-on-read vs. fan-out-on-write for follower feeds",
    ],
    "cache-system": [
      "Implement LRU eviction policy using doubly-linked lists + hash tables",
      "Use consistent hashing for distributed cache across multiple nodes",
      "Add replication for fault tolerance (e.g., primary + replica nodes)",
      "Implement TTL (time-to-live) with background cleanup or lazy deletion",
      "Monitor cache hit/miss ratios to tune cache size and eviction policy",
    ],
    "chat-system": [
      "Use WebSocket for bidirectional real-time communication",
      "Store messages in a distributed database partitioned by conversation ID",
      "Use Redis for presence tracking (online/offline status) with TTL",
      "Implement message ordering with timestamps and sequence numbers",
      "Consider eventual consistency for message delivery across regions",
    ],
    "search-engine": [
      "Use a distributed inverted index (Elasticsearch, Solr) for full-text search",
      "Implement MapReduce-style crawling for horizontal scaling",
      "Cache frequently searched queries and top results for instant responses",
      "Use TF-IDF or learning-to-rank for relevance scoring",
      "Separate read (query) and write (indexing) paths for independent scaling",
    ],
    "video-platform": [
      "Use transcoding farms (distributed) to convert videos to multiple bitrates",
      "Store video segments in object storage (S3-like) and serve via CDN",
      "Implement adaptive bitrate streaming (HLS/DASH) for variable network conditions",
      "Use a message queue for async transcoding jobs to avoid blocking uploads",
      "Cache metadata (video info, subtitles) in a fast database (Redis, Memcached)",
    ],
    "payment-system": [
      "Prioritize strong consistency (ACID) over availability (use primary-replica replication)",
      "Implement idempotency keys to prevent duplicate charges if requests retry",
      "Use a separate fraud detection service with machine learning models",
      "Store sensitive data (credit cards) in a PCI-compliant vault, never in main database",
      "Implement comprehensive audit logging for compliance and dispute resolution",
    ],
    "recommendations": [
      "Separate offline model training from online serving for flexibility",
      "Use collaborative filtering (user-user or item-item) as baseline approach",
      "Cache pre-computed recommendations in Redis for fast retrieval",
      "Implement A/B testing to measure recommendation quality and user engagement",
      "Handle cold-start problem with content-based recommendations for new users/items",
    ],
  };

  return hints[scenario.id] || [
    "Consider scalability and fault tolerance at each layer",
    "Use caching to reduce database load and improve latency",
    "Separate read and write paths for independent optimization",
    "Plan for monitoring, alerting, and debugging at scale",
  ];
}

export function getExampleArchitectures(scenario: HLDScenario): {
  title: string;
  description: string;
  components: string[];
}[] {
  const examples: Record<string, typeof examples[string]> = {
    "url-shortener": [
      {
        title: "Simple Architecture",
        description: "Single database + cache for basic URL shortening",
        components: ["Client", "API Server", "Cache (Redis)", "Database (MySQL)"],
      },
      {
        title: "Scaled Architecture",
        description: "Multi-region with sharding and CDN for high throughput",
        components: [
          "Client",
          "CDN",
          "Load Balancer",
          "API Servers",
          "Cache (Redis Cluster)",
          "Sharded DB",
          "Analytics Pipeline",
        ],
      },
    ],
    "notification-system": [
      {
        title: "Basic Approach",
        description: "Direct database writes + polling from clients",
        components: ["Client", "API Server", "Database", "Notification Table"],
      },
      {
        title: "Real-time Approach",
        description: "Message queue + WebSocket servers for instant delivery",
        components: [
          "Client (WebSocket)",
          "WebSocket Server",
          "Message Queue (Kafka)",
          "Notification Service",
          "Database",
        ],
      },
    ],
    "chat-system": [
      {
        title: "Simple Chat",
        description: "HTTP polling + relational database",
        components: ["Client", "API Server", "Database"],
      },
      {
        title: "Real-time Chat",
        description: "WebSocket servers + distributed session management",
        components: [
          "Client (WebSocket)",
          "WebSocket Gateway",
          "Service Layer",
          "Message Store (Distributed)",
          "Presence Service (Redis)",
        ],
      },
    ],
    "video-platform": [
      {
        title: "Basic Video Upload",
        description: "Single server transcoding + direct download",
        components: ["Client", "Upload Server", "Storage", "Transcode Worker"],
      },
      {
        title: "Scaled Video Platform",
        description: "Distributed transcoding + CDN + adaptive streaming",
        components: [
          "Client",
          "Upload Server",
          "Object Storage",
          "Transcode Farm",
          "Metadata DB",
          "CDN",
        ],
      },
    ],
  };

  return (
    examples[scenario.id] || [
      {
        title: "Minimal Design",
        description: "Basic single-server architecture",
        components: ["Client", "API Server", "Database"],
      },
      {
        title: "Distributed Design",
        description: "Scaled multi-component architecture",
        components: [
          "Load Balancer",
          "API Servers",
          "Cache",
          "Database",
          "Message Queue",
        ],
      },
    ]
  );
}
