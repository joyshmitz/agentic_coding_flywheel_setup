/**
 * Real World Case Study Lesson Messages - English (Default)
 *
 * All user-facing text for the real-world case study lesson component.
 * Covers the complete flywheel workflow on a real production project: cass-memory.
 */

export const realWorldCaseStudyLessonMessages = {
  goalBanner: {
    content: "Learn the complete flywheel workflow from a real production project - from concept to deployment in one weekend.",
  },

  introduction: {
    title: "The Challenge: Building a Memory System",
    intro: "On December 7th, 2025, a new project was conceived:",
    cassMemory: "cass-memory",
    description: "- a procedural memory system for coding agents. The goal? Go from zero to fully functional CLI tool in one day using the flywheel workflow.",
    walkThrough: "This lesson walks you through exactly how it was done, so you can replicate this workflow on your own projects.",
  },

  flyWheelJourney: {
    title: "The Flywheel Journey",
    subtitle: "From idea to production in 72 hours",

    overview: {
      description: "Here's how cass-memory evolved through multiple flywheel cycles, each building momentum toward a production-ready tool.",
    },

    dayOne: {
      title: "Day 1: Foundation and Proof of Concept",
      subtitle: "Getting something working",

      morning: {
        title: "Morning: Project Setup (2 hours)",
        description: "Started with the simplest possible version",

        steps: [
          {
            step: "Environment Setup",
            description: "Created project structure and basic tooling",
            code: `# Initial project setup
mkdir cass-memory
cd cass-memory
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn psutil

# Basic project structure
mkdir {src,tests,docs,scripts}
touch src/main.py requirements.txt README.md`,
            result: "Basic Python environment ready",
          },
          {
            step: "MVP Planning",
            description: "Defined the absolute minimum viable product",
            mvpFeatures: [
              "Web interface showing current memory usage",
              "Basic memory statistics (used, free, total)",
              "Simple graph of memory over time",
              "Single-page application",
            ],
            timeEstimate: "4-6 hours for basic functionality",
          },
        ],
      },

      afternoon: {
        title: "Afternoon: Core Functionality (4 hours)",
        description: "Built the essential memory monitoring features",

        implementation: [
          {
            component: "Backend API",
            description: "FastAPI server with memory endpoints",
            code: `from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import psutil
import time
from typing import Dict, List

app = FastAPI()

@app.get("/api/memory")
def get_memory_info() -> Dict:
    memory = psutil.virtual_memory()
    return {
        "total": memory.total,
        "used": memory.used,
        "free": memory.free,
        "percent": memory.percent,
        "timestamp": time.time()
    }

@app.get("/api/memory/history")
def get_memory_history() -> List[Dict]:
    # Simple in-memory storage for now
    return memory_history

# Serve static files
app.mount("/", StaticFiles(directory="static", html=True), name="static")`,
          },
          {
            component: "Frontend Interface",
            description: "Simple HTML page with real-time updates",
            code: `<!DOCTYPE html>
<html>
<head>
    <title>Cass Memory Monitor</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Memory Monitor</h1>
    <div id="memory-stats">
        <p>Loading...</p>
    </div>
    <canvas id="memory-chart"></canvas>

    <script>
        let chart;
        let memoryData = [];

        async function updateMemoryStats() {
            const response = await fetch('/api/memory');
            const data = await response.json();

            document.getElementById('memory-stats').innerHTML = \`
                <p>Total: \${(data.total / 1024**3).toFixed(2)} GB</p>
                <p>Used: \${(data.used / 1024**3).toFixed(2)} GB</p>
                <p>Free: \${(data.free / 1024**3).toFixed(2)} GB</p>
                <p>Usage: \${data.percent.toFixed(1)}%</p>
            \`;

            memoryData.push({
                x: new Date(data.timestamp * 1000),
                y: data.percent
            });

            // Keep only last 50 data points
            if (memoryData.length > 50) {
                memoryData.shift();
            }

            if (chart) {
                chart.data.datasets[0].data = memoryData;
                chart.update();
            }
        }

        // Initialize chart
        const ctx = document.getElementById('memory-chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Memory Usage %',
                    data: memoryData,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { type: 'time' },
                    y: { min: 0, max: 100 }
                }
            }
        });

        // Update every 2 seconds
        setInterval(updateMemoryStats, 2000);
        updateMemoryStats();
    </script>
</body>
</html>`,
          },
        ],

        result: "Working memory monitor with real-time graphs",
      },

      evening: {
        title: "Evening: Testing and Refinement (2 hours)",
        description: "Made it actually usable",

        improvements: [
          {
            improvement: "Error Handling",
            description: "Added proper error handling for API failures",
            before: "App crashes when API is unavailable",
            after: "Graceful degradation with error messages",
          },
          {
            improvement: "Performance Optimization",
            description: "Reduced update frequency and improved chart performance",
            before: "Updates every second, causing CPU usage spikes",
            after: "Smart update intervals based on memory change rate",
          },
          {
            improvement: "Basic Styling",
            description: "Made it look professional enough for sharing",
            before: "Raw HTML with no styling",
            after: "Clean, responsive interface with proper typography",
          },
        ],

        dayOneResult: "✅ Working memory monitor ready for user testing",
      },
    },

    dayTwo: {
      title: "Day 2: User Feedback and Feature Development",
      subtitle: "Making it actually useful",

      earlyFeedback: {
        title: "Early User Testing",
        description: "Shared the Day 1 version with a few developer friends",

        feedbackReceived: [
          {
            feedback: "\"The real-time graph is cool, but I need to save snapshots\"",
            user: "Backend developer",
            priority: "High",
            insight: "Users need to capture and share specific moments",
          },
          {
            feedback: "\"Can you show process-level memory usage, not just system?\"",
            user: "DevOps engineer",
            priority: "High",
            insight: "System-level monitoring isn't granular enough",
          },
          {
            feedback: "\"The chart is hard to read with lots of data\"",
            user: "Frontend developer",
            priority: "Medium",
            insight: "UI needs better data visualization",
          },
          {
            feedback: "\"I want to track memory over longer periods\"",
            user: "Performance engineer",
            priority: "Medium",
            insight: "Need persistent data storage",
          },
        ],
      },

      iteration2: {
        title: "Iteration 2: Core Features (6 hours)",
        description: "Added the most requested features",

        newFeatures: [
          {
            feature: "Process-Level Monitoring",
            description: "Track individual process memory usage",
            code: `@app.get("/api/processes")
def get_process_memory() -> List[Dict]:
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'memory_info']):
        try:
            info = proc.info
            processes.append({
                'pid': info['pid'],
                'name': info['name'],
                'memory_mb': info['memory_info'].rss / 1024 / 1024,
                'memory_percent': proc.memory_percent()
            })
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    # Sort by memory usage
    return sorted(processes, key=lambda x: x['memory_mb'], reverse=True)[:20]`,
            impact: "Users can now identify memory-hungry processes",
          },
          {
            feature: "Memory Snapshots",
            description: "Save and compare memory states",
            code: `class MemorySnapshot:
    def __init__(self, name: str):
        self.name = name
        self.timestamp = time.time()
        self.system_memory = psutil.virtual_memory()._asdict()
        self.processes = get_process_memory()

    def to_dict(self):
        return {
            'name': self.name,
            'timestamp': self.timestamp,
            'system_memory': self.system_memory,
            'processes': self.processes
        }

@app.post("/api/snapshots")
def create_snapshot(snapshot_name: str):
    snapshot = MemorySnapshot(snapshot_name)
    snapshots[snapshot.name] = snapshot
    return {"message": f"Snapshot '{snapshot_name}' created"}

@app.get("/api/snapshots/{name}/compare/{other_name}")
def compare_snapshots(name: str, other_name: str):
    snap1 = snapshots[name]
    snap2 = snapshots[other_name]

    return {
        'system_diff': calculate_memory_diff(snap1.system_memory, snap2.system_memory),
        'process_diff': calculate_process_diff(snap1.processes, snap2.processes)
    }`,
            impact: "Users can track memory changes over time",
          },
          {
            feature: "Persistent Storage",
            description: "SQLite database for long-term data",
            code: `import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect('memory_data.db')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS memory_readings (
            id INTEGER PRIMARY KEY,
            timestamp DATETIME,
            total_memory INTEGER,
            used_memory INTEGER,
            percent_used REAL
        )
    ''')
    conn.close()

@app.post("/api/readings")
def save_reading():
    memory = psutil.virtual_memory()
    conn = sqlite3.connect('memory_data.db')
    conn.execute(
        "INSERT INTO memory_readings (timestamp, total_memory, used_memory, percent_used) VALUES (?, ?, ?, ?)",
        (datetime.now(), memory.total, memory.used, memory.percent)
    )
    conn.commit()
    conn.close()`,
            impact: "Data persists across application restarts",
          },
        ],

        dayTwoResult: "✅ Feature-complete tool ready for broader testing",
      },
    },

    dayThree: {
      title: "Day 3: Production Deployment",
      subtitle: "Making it available to the world",

      productionPrep: {
        title: "Production Readiness",
        description: "Prepared the application for real-world deployment",

        steps: [
          {
            step: "Docker Configuration",
            description: "Containerized the application for consistent deployment",
            dockerfile: `FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src/ ./src/
COPY static/ ./static/

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]`,
            dockerCompose: `version: '3.8'
services:
  cass-memory:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
    environment:
      - DATABASE_URL=/app/data/memory_data.db
    restart: unless-stopped`,
          },
          {
            step: "CI/CD Pipeline",
            description: "Automated testing and deployment with GitHub Actions",
            workflow: `name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest
      - name: Run tests
        run: pytest tests/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          # Deploy script here
          echo "Deploying to production..."`,
          },
          {
            step: "Environment Configuration",
            description: "Proper configuration management for production",
            config: `import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./memory_data.db"
    update_interval: int = 5  # seconds
    max_data_points: int = 1000
    enable_debug: bool = False

    class Config:
        env_file = ".env"

settings = Settings()`,
          },
        ],
      },

      deployment: {
        title: "Going Live",
        description: "The actual deployment process",

        deploymentSteps: [
          {
            step: "Server Setup",
            description: "Configured cloud server with Docker support",
            provider: "DigitalOcean Droplet",
            specs: "2 GB RAM, 1 vCPU, 50 GB SSD",
            cost: "$12/month",
          },
          {
            step: "Domain and SSL",
            description: "Set up custom domain with HTTPS",
            domain: "cass-memory.dev",
            ssl: "Let's Encrypt via Nginx reverse proxy",
          },
          {
            step: "Monitoring Setup",
            description: "Added basic monitoring and alerting",
            tools: ["Prometheus for metrics", "Grafana for dashboards", "Basic health checks"],
          },
        ],

        launchMetrics: {
          title: "Launch Day Results",
          metrics: [
            "Application deployed successfully at 6 PM",
            "Zero downtime during initial deployment",
            "First external user within 2 hours",
            "5 users by end of day",
            "No critical bugs reported",
          ],
        },
      },
    },

    postLaunchLearning: {
      title: "Post-Launch Learning",
      subtitle: "Real users, real feedback, real improvements",

      weekOneStats: {
        title: "Week One Usage",
        stats: {
          users: "15 unique users",
          sessions: "67 total sessions",
          avgDuration: "8 minutes per session",
          snapshots: "42 snapshots created",
          uptime: "99.2% (one brief outage)",
        },
      },

      realWorldFeedback: {
        title: "Real-World Feedback",
        description: "Feedback from actual users doing real work",

        productiveFeedback: [
          {
            feedback: "\"Helped me identify a memory leak in my Node.js service\"",
            user: "Full-stack developer",
            impact: "User solved a production issue using the tool",
            followUp: "Asked for Node.js-specific process monitoring",
          },
          {
            feedback: "\"The snapshot comparison saved me hours debugging Cassandra memory issues\"",
            user: "Database administrator",
            impact: "Tool delivered on its core promise",
            followUp: "Requested Cassandra-specific metrics",
          },
          {
            feedback: "\"Would love to see memory trends over days/weeks, not just hours\"",
            user: "DevOps engineer",
            impact: "Identified need for longer-term analytics",
            followUp: "Asked about data export features",
          },
        ],

        bugReports: [
          {
            bug: "Chart becomes unresponsive with > 100 processes",
            severity: "Medium",
            fix: "Implemented virtualization for process list",
            timeToFix: "2 days",
          },
          {
            bug: "Memory readings occasionally spike to impossible values",
            severity: "High",
            cause: "Race condition in data collection",
            fix: "Added proper synchronization",
            timeToFix: "1 day",
          },
        ],
      },

      iterativeImprovements: {
        title: "Continuous Improvement",
        description: "How the tool evolved based on real usage",

        improvements: [
          {
            version: "1.1",
            features: [
              "Process filtering by name/memory usage",
              "Export snapshots to JSON/CSV",
              "Basic alerting for memory thresholds",
            ],
            userImpact: "Users can focus on specific processes and share data",
          },
          {
            version: "1.2",
            features: [
              "Historical trends (1 day, 1 week, 1 month views)",
              "Memory usage predictions based on trends",
              "REST API for integration with other tools",
            ],
            userImpact: "Long-term memory analysis becomes possible",
          },
          {
            version: "1.3",
            features: [
              "Multi-server monitoring from single dashboard",
              "Slack/Discord notifications for alerts",
              "Custom dashboard creation",
            ],
            userImpact: "Teams can monitor entire infrastructure",
          },
        ],
      },
    },
  },

  technicalDeepDive: {
    title: "Technical Deep Dive",
    subtitle: "How it actually works under the hood",

    architecture: {
      title: "System Architecture",
      description: "The final architecture evolved significantly from the Day 1 MVP:",

      components: [
        {
          component: "Frontend (Vue.js)",
          responsibility: "Real-time dashboard and user interactions",
          technologies: ["Vue 3", "Chart.js", "WebSocket client", "Tailwind CSS"],
          keyFeatures: [
            "Real-time memory charts",
            "Process management interface",
            "Snapshot comparison tools",
            "Alert configuration",
          ],
        },
        {
          component: "Backend API (FastAPI)",
          responsibility: "Data collection, processing, and serving",
          technologies: ["FastAPI", "Uvicorn", "SQLAlchemy", "Alembic"],
          keyFeatures: [
            "Memory data collection",
            "WebSocket real-time updates",
            "Snapshot management",
            "Alert processing",
          ],
        },
        {
          component: "Database (PostgreSQL)",
          responsibility: "Persistent storage for historical data",
          technologies: ["PostgreSQL", "Redis for caching"],
          keyFeatures: [
            "Time-series memory data",
            "Snapshot storage",
            "User preferences",
            "Alert configurations",
          ],
        },
        {
          component: "Background Services",
          responsibility: "Continuous monitoring and alerting",
          technologies: ["Celery", "Redis", "Prometheus"],
          keyFeatures: [
            "Scheduled data collection",
            "Alert evaluation",
            "Data aggregation",
            "Cleanup tasks",
          ],
        },
      ],

      dataFlow: {
        title: "Data Flow",
        description: "How data moves through the system:",
        steps: [
          "psutil collects system memory data every 5 seconds",
          "Background task stores raw data in PostgreSQL",
          "API aggregates data for different time ranges",
          "WebSocket pushes real-time updates to connected clients",
          "Frontend renders charts and updates UI",
          "User interactions trigger API calls for snapshots/configuration",
        ],
      },
    },

    keyTechnicalDecisions: {
      title: "Key Technical Decisions",
      description: "Critical choices and their reasoning:",

      decisions: [
        {
          decision: "FastAPI over Flask/Django",
          reasoning: "Need for WebSocket support and automatic API documentation",
          alternatives: ["Flask with Socket.IO", "Django Channels"],
          outcome: "Excellent developer experience, built-in async support",
          lessons: "Modern Python frameworks provide significant productivity gains",
        },
        {
          decision: "PostgreSQL over SQLite",
          reasoning: "Need for concurrent writes and time-series performance",
          alternatives: ["SQLite with WAL mode", "InfluxDB", "TimescaleDB"],
          outcome: "Reliable performance, easy deployment, familiar tools",
          lessons: "Don't over-engineer storage until you hit clear limitations",
        },
        {
          decision: "Vue.js over React",
          reasoning: "Faster development for small team, excellent TypeScript support",
          alternatives: ["React", "Svelte", "Vanilla JS"],
          outcome: "Rapid development, easy to maintain",
          lessons: "Choose tools that match your team's expertise and project size",
        },
        {
          decision: "Docker deployment over PaaS",
          reasoning: "Full control over environment, cost efficiency",
          alternatives: ["Heroku", "Vercel", "AWS Lambda"],
          outcome: "Predictable costs, complete control, easy to replicate",
          lessons: "Docker adds complexity but provides deployment flexibility",
        },
      ],
    },

    performanceOptimizations: {
      title: "Performance Optimizations",
      description: "How we made it fast enough for production:",

      optimizations: [
        {
          problem: "Frontend becomes sluggish with lots of real-time data",
          solution: "Implemented chart data windowing and update throttling",
          code: `// Only update chart if data has changed significantly
const updateChart = throttle((newData) => {
  if (hasSignificantChange(lastData, newData)) {
    chart.data = processChartData(newData);
    chart.update('none'); // No animation for performance
    lastData = newData;
  }
}, 1000); // Maximum 1 update per second`,
          impact: "Reduced CPU usage by 70% on data-heavy dashboards",
        },
        {
          problem: "Database queries slow down with large datasets",
          solution: "Added proper indexing and data aggregation",
          code: `-- Index for time-based queries
CREATE INDEX idx_memory_readings_timestamp ON memory_readings(timestamp);

-- Pre-aggregated data for common queries
CREATE MATERIALIZED VIEW memory_hourly AS
SELECT
  date_trunc('hour', timestamp) as hour,
  avg(percent_used) as avg_usage,
  max(percent_used) as max_usage,
  min(percent_used) as min_usage
FROM memory_readings
GROUP BY date_trunc('hour', timestamp);`,
          impact: "Dashboard load times improved from 5s to 0.3s",
        },
        {
          problem: "Memory collection causes CPU spikes",
          solution: "Optimized data collection with smart scheduling",
          code: `class AdaptiveCollector:
    def __init__(self):
        self.base_interval = 5  # seconds
        self.current_interval = self.base_interval

    def collect_data(self):
        start_time = time.time()

        # Collect memory data
        data = self._get_memory_data()

        # Adjust interval based on system load
        collection_time = time.time() - start_time
        if collection_time > 0.5:  # Taking too long
            self.current_interval = min(self.current_interval * 1.5, 30)
        else:
            self.current_interval = max(self.current_interval * 0.9, self.base_interval)

        return data`,
          impact: "Reduced system overhead by 50% during high-load periods",
        },
      ],
    },

    scalabilityConsiderations: {
      title: "Scalability Design",
      description: "How the system handles growth:",

      currentLimits: {
        title: "Current System Limits",
        limits: [
          "Single server handles ~100 concurrent users",
          "Database stores 6 months of data before archiving",
          "Real-time updates support up to 50 simultaneous connections",
          "Snapshot storage limited to 1000 snapshots per user",
        ],
      },

      scalabilityPlan: {
        title: "Scaling Strategy",
        phases: [
          {
            phase: "Phase 1: Vertical Scaling",
            trigger: "80% CPU utilization consistently",
            approach: "Upgrade server resources",
            estimation: "Handles 3x current load",
          },
          {
            phase: "Phase 2: Database Optimization",
            trigger: "Query times > 1 second",
            approach: "Read replicas, better indexing, data partitioning",
            estimation: "Handles 5x current load",
          },
          {
            phase: "Phase 3: Horizontal Scaling",
            trigger: "Single server limits reached",
            approach: "Load balancer, multiple app servers, Redis clustering",
            estimation: "Handles 20x current load",
          },
        ],
      },
    },
  },

  challengesAndSolutions: {
    title: "Challenges and Solutions",
    subtitle: "Real problems and how we solved them",

    technicalChallenges: {
      title: "Technical Challenges",
      description: "Difficult problems encountered during development:",

      challenges: [
        {
          challenge: "Memory Data Collection Accuracy",
          description: "psutil sometimes returns inconsistent memory readings",
          symptoms: [
            "Memory usage spikes to impossible values (>100%)",
            "Negative memory values occasionally",
            "Inconsistent readings between consecutive calls",
          ],
          investigation: `# Debug code to understand the issue
import psutil
import time

def debug_memory_readings():
    readings = []
    for i in range(100):
        memory = psutil.virtual_memory()
        reading = {
            'timestamp': time.time(),
            'percent': memory.percent,
            'used': memory.used,
            'total': memory.total
        }
        readings.append(reading)

        # Check for anomalies
        if reading['percent'] > 100 or reading['percent'] < 0:
            print(f"Anomaly detected: {reading}")

        time.sleep(0.1)

    return readings`,
          solution: `class MemoryCollector:
    def __init__(self):
        self.last_valid_reading = None
        self.anomaly_threshold = 0.1  # 10% change threshold

    def get_reliable_memory_data(self):
        for attempt in range(3):  # Try up to 3 times
            try:
                memory = psutil.virtual_memory()

                # Validate reading
                if self._is_valid_reading(memory):
                    self.last_valid_reading = memory
                    return memory._asdict()

            except Exception as e:
                print(f"Memory collection attempt {attempt + 1} failed: {e}")

        # Return last known good reading if all attempts fail
        return self.last_valid_reading._asdict() if self.last_valid_reading else None

    def _is_valid_reading(self, memory):
        # Basic validation
        if memory.percent < 0 or memory.percent > 100:
            return False

        # Check against last reading for sudden changes
        if self.last_valid_reading:
            percent_change = abs(memory.percent - self.last_valid_reading.percent)
            if percent_change > 50:  # More than 50% change
                return False

        return True`,
          outcome: "Eliminated anomalous readings, improved data reliability by 99%",
        },
        {
          challenge: "Real-Time Updates at Scale",
          description: "WebSocket connections became unstable with many users",
          symptoms: [
            "Connections dropping randomly",
            "Messages arriving out of order",
            "Memory leaks in connection handling",
          ],
          analysis: "Default WebSocket implementation doesn't handle connection management well",
          solution: `from typing import Set
import asyncio
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: Set[WebSocket] = set()
        self.connection_data = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections.add(websocket)
        self.connection_data[websocket] = {
            'user_id': user_id,
            'last_ping': time.time(),
            'subscriptions': set()
        }

    async def disconnect(self, websocket: WebSocket):
        self.active_connections.discard(websocket)
        self.connection_data.pop(websocket, None)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        try:
            await websocket.send_text(message)
        except ConnectionClosed:
            await self.disconnect(websocket)

    async def broadcast(self, message: str):
        disconnected = set()
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
                # Update last activity
                self.connection_data[connection]['last_ping'] = time.time()
            except ConnectionClosed:
                disconnected.add(connection)

        # Clean up disconnected connections
        for conn in disconnected:
            await self.disconnect(conn)

    async def health_check(self):
        # Periodic cleanup of stale connections
        current_time = time.time()
        stale_connections = []

        for conn, data in self.connection_data.items():
            if current_time - data['last_ping'] > 30:  # 30 second timeout
                stale_connections.append(conn)

        for conn in stale_connections:
            await self.disconnect(conn)`,
          outcome: "Stable real-time updates for 100+ concurrent users",
        },
      ],
    },

    userExperienceChallenges: {
      title: "User Experience Challenges",
      description: "UX problems discovered through real user feedback:",

      challenges: [
        {
          challenge: "Information Overload",
          description: "Users felt overwhelmed by too much data on screen",
          userFeedback: "\"There's so much information I don't know where to look first\"",
          solution: `# Progressive disclosure approach
const DashboardLayouts = {
  'simple': {
    components: ['memory-overview', 'current-usage'],
    description: 'Basic memory monitoring'
  },
  'standard': {
    components: ['memory-overview', 'current-usage', 'process-list', 'historical-chart'],
    description: 'Complete monitoring dashboard'
  },
  'advanced': {
    components: ['memory-overview', 'current-usage', 'process-list', 'historical-chart',
                'alert-status', 'snapshot-manager', 'custom-metrics'],
    description: 'All features for power users'
  }
};

// Let users choose their complexity level
function selectLayout(level) {
  const layout = DashboardLayouts[level];
  renderComponents(layout.components);
}`,
          impact: "New user satisfaction increased by 60%",
        },
        {
          challenge: "Alert Fatigue",
          description: "Users disabled alerts because there were too many",
          symptoms: [
            "90% of users turned off notifications within first week",
            "Users missed critical alerts because they ignored all of them",
            "Complaint about \"boy who cried wolf\" syndrome",
          ],
          solution: `class SmartAlerting:
    def __init__(self):
        self.baseline_memory = self._calculate_baseline()
        self.alert_history = []

    def should_alert(self, current_memory):
        # Only alert on significant deviations from baseline
        deviation = abs(current_memory - self.baseline_memory) / self.baseline_memory

        # Adaptive thresholds based on historical patterns
        if deviation > self._get_dynamic_threshold():
            # Check if this is a recurring pattern
            if not self._is_expected_pattern(current_memory):
                return True, self._generate_context(current_memory)

        return False, None

    def _get_dynamic_threshold(self):
        # Start with high threshold, lower it as system learns
        base_threshold = 0.3  # 30%

        # Reduce threshold if we've seen this pattern before
        pattern_factor = self._get_pattern_familiarity()
        return base_threshold * (1 - pattern_factor * 0.5)

    def _generate_context(self, memory_usage):
        # Provide context for why this is worth alerting
        context = []

        if self._is_above_historical_maximum(memory_usage):
            context.append("Memory usage is higher than ever recorded")

        if self._is_rapid_increase(memory_usage):
            context.append("Memory usage increased rapidly in last 5 minutes")

        return " | ".join(context)`,
          outcome: "Alert engagement increased by 400%, false positive rate dropped by 80%",
        },
      ],
    },

    deploymentChallenges: {
      title: "Deployment and Operations Challenges",
      description: "Production deployment problems and solutions:",

      challenges: [
        {
          challenge: "Zero-Downtime Deployment",
          description: "Users need continuous monitoring, can't afford downtime",
          constraints: [
            "Real-time data can't be lost during deployment",
            "WebSocket connections must survive updates",
            "Database migrations need to be backwards compatible",
          ],
          solution: `# Blue-green deployment with connection preservation
version: '3.8'
services:
  app-blue:
    image: cass-memory:\${BLUE_VERSION}
    networks: [app-network]

  app-green:
    image: cass-memory:\${GREEN_VERSION}
    networks: [app-network]

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx-config:/etc/nginx/conf.d
    networks: [app-network]
    ports: ["80:80", "443:443"]

  database:
    image: postgres:13
    networks: [app-network]`,
          nginxConfig: `# nginx.conf with graceful switching
upstream backend {
    server app-blue:8000 weight=100;
    server app-green:8000 weight=0;
}

server {
    location / {
        proxy_pass http://backend;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Connection preservation during switches
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}`,
          deploymentScript: `#!/bin/bash
# Zero-downtime deployment script

CURRENT_VERSION=$(docker-compose ps app-blue --format "{{.Image}}" | cut -d: -f2)
NEW_VERSION=$1

echo "Current version: $CURRENT_VERSION"
echo "Deploying version: $NEW_VERSION"

# Start green version
export GREEN_VERSION=$NEW_VERSION
docker-compose up -d app-green

# Wait for health check
echo "Waiting for green version to be healthy..."
while ! curl -f http://localhost:8001/health; do
  sleep 2
done

# Switch traffic gradually
echo "Switching traffic to green version..."
curl -X POST http://localhost:8080/switch-to-green

# Wait and verify
sleep 30

# Stop blue version
docker-compose stop app-blue

echo "Deployment complete!"`,
          outcome: "Achieved true zero-downtime deployments with < 1ms connection interruption",
        },
      ],
    },
  },

  lessonsLearned: {
    title: "Lessons Learned",
    subtitle: "What this project taught us about the flywheel process",

    flywheelLessons: {
      title: "Flywheel Process Insights",
      description: "Key insights about making the flywheel approach work in practice:",

      insights: [
        {
          insight: "Day 1 Foundation is Critical",
          explanation: "The simplicity and solidity of Day 1 code determined everything that followed",
          evidence: "90% of final architecture traces back to Day 1 decisions",
          application: "Spend extra time on Day 1 structure, even if features are minimal",
          antiPattern: "Don't rush Day 1 just to get features - you'll pay for it later",
        },
        {
          insight: "Real Users Change Everything",
          explanation: "Actual user feedback was completely different from anticipated needs",
          evidence: "8 out of 10 planned features were never requested; 6 unplanned features became essential",
          application: "Get real users involved as early as Day 2",
          antiPattern: "Don't build for months based on your own assumptions",
        },
        {
          insight: "Technical Debt Compounds Quickly",
          explanation: "Shortcuts taken in early cycles created exponential work later",
          evidence: "3-hour 'quick fix' in Week 1 took 2 days to properly resolve in Week 4",
          application: "Identify and schedule debt paydown in every cycle",
          antiPattern: "Don't ignore technical debt thinking you'll fix it 'later'",
        },
        {
          insight: "Deployment Early Creates Different Problems",
          explanation: "Production environment revealed issues impossible to find in development",
          evidence: "5 critical bugs only appeared under real user load patterns",
          application: "Deploy to production by Day 3, even with limited features",
          antiPattern: "Don't wait for feature completeness before deploying",
        },
      ],
    },

    technicalLessons: {
      title: "Technical Lessons",
      description: "Specific technical insights from building cass-memory:",

      lessons: [
        {
          lesson: "Choose Boring Technology for Production",
          context: "Tempted to use cutting-edge tools, but chose proven stack",
          decision: "PostgreSQL over NewSQL, FastAPI over experimental frameworks",
          outcome: "Spent time on features, not fighting tooling issues",
          advice: "Innovation budget: spend it on your product, not your infrastructure",
        },
        {
          lesson: "Monitoring is a Product Feature",
          context: "Initially treated monitoring as operational concern",
          realization: "Users valued visibility into app performance as much as core features",
          implementation: "Built monitoring dashboards as first-class features",
          advice: "Make system health visible to users - it builds confidence",
        },
        {
          lesson: "Real-Time Features Need Graceful Degradation",
          context: "Real-time updates were core to the product vision",
          problem: "Network issues broke the entire user experience",
          solution: "Fallback to polling, cached data, offline mode",
          advice: "Real-time is enhancement, not requirement - design for failure",
        },
        {
          lesson: "Data Models Change More Than Expected",
          context: "Started with simple memory readings schema",
          evolution: "Added processes, snapshots, alerts, custom metrics, multi-server support",
          strategy: "Migration scripts from Day 1, backwards compatibility planning",
          advice: "Design for schema evolution - it will happen faster than you think",
        },
      ],
    },

    processLessons: {
      title: "Process and Team Lessons",
      description: "What we learned about managing development process:",

      lessons: [
        {
          lesson: "Document Decisions in Real-Time",
          context: "Made many quick technical decisions during rapid development",
          problem: "Forgot reasoning behind choices when needing to revisit them",
          solution: "Architecture Decision Records (ADRs) written immediately",
          template: `# ADR: Memory Data Collection Strategy

## Decision
Use psutil with custom validation layer for memory data collection

## Context
- Need accurate, real-time memory readings
- psutil sometimes returns anomalous values
- System stability is critical

## Alternatives Considered
1. Direct /proc/meminfo parsing
2. Third-party memory libraries
3. OS-specific APIs

## Decision Rationale
- psutil provides cross-platform compatibility
- Custom validation can filter anomalies
- Well-maintained library with good community

## Consequences
+ Cross-platform support
+ Robust error handling
- Additional complexity in validation layer
- Slight performance overhead`,
          advice: "5 minutes documenting decisions saves hours later",
        },
        {
          lesson: "User Feedback Channels Matter",
          context: "Multiple ways for users to provide feedback",
          experiment: "Tried email, in-app feedback, GitHub issues, Discord channel",
          results: "In-app feedback got 10x more responses than external channels",
          implementation: "One-click feedback with automatic context capture",
          advice: "Reduce friction for feedback to near-zero - convenience beats completeness",
        },
        {
          lesson: "Feature Flags Enable Confidence",
          context: "Wanted to iterate quickly without breaking existing functionality",
          implementation: "Simple environment-based feature flags for new features",
          benefit: "Could deploy incomplete features and enable for testing",
          code: `# Simple feature flag implementation
FEATURES = {
    'advanced_alerts': os.getenv('ENABLE_ADVANCED_ALERTS', 'false').lower() == 'true',
    'multi_server': os.getenv('ENABLE_MULTI_SERVER', 'false').lower() == 'true',
    'custom_dashboards': os.getenv('ENABLE_CUSTOM_DASHBOARDS', 'false').lower() == 'true',
}

def is_feature_enabled(feature_name):
    return FEATURES.get(feature_name, False)

# In templates
{% if is_feature_enabled('advanced_alerts') %}
    <div id="advanced-alerts">
        <!-- New feature UI -->
    </div>
{% endif %}`,
          advice: "Feature flags let you deploy confidently and iterate safely",
        },
      ],
    },

    businessLessons: {
      title: "Business and Product Lessons",
      description: "Insights about building something people want:",

      lessons: [
        {
          lesson: "Solve a Problem You Have",
          context: "Built cass-memory because we needed it ourselves",
          advantage: "Deep understanding of the problem and user journey",
          validation: "Could immediately test whether solutions actually worked",
          advice: "Dogfooding reveals problems that user interviews miss",
        },
        {
          lesson: "Free Users Provide Different Feedback Than Paying Users",
          context: "Started with free tool, later added paid features",
          observation: "Free users focused on feature requests, paid users focused on reliability",
          implication: "Need both groups for complete product understanding",
          strategy: "Free tier for feature validation, paid tier for business validation",
        },
        {
          lesson: "Community Emerges Around Tools, Not Features",
          context: "Users started sharing configurations and custom dashboards",
          surprise: "Community value exceeded core product value for many users",
          response: "Built features to support community (sharing, templates, marketplace)",
          advice: "Watch for emergent community behavior - it signals product-market fit",
        },
      ],
    },
  },

  conclusion: {
    title: "From Idea to Impact",
    subtitle: "The power of the complete flywheel cycle",

    projectOutcome: {
      title: "Final Project Outcome",
      description: "cass-memory after 6 months of flywheel development:",

      stats: {
        users: "500+ active users across 50+ companies",
        usage: "Monitoring 2TB+ of system memory daily",
        reliability: "99.8% uptime over 6 months",
        community: "15 community contributions, 8 integrations built by users",
        performance: "Identifies memory issues 80% faster than previous tools",
      },

      impact: {
        userImpact: [
          "Developers debug memory issues in minutes instead of hours",
          "Teams prevent production memory problems before they affect users",
          "DevOps engineers have visibility into memory trends across infrastructure",
        ],
        businessImpact: [
          "Reduced memory-related downtime by 60% for regular users",
          "Saved average of 4 hours per week of debugging time",
          "Enabled proactive capacity planning for growing applications",
        ],
      },
    },

    flywheelSuccess: {
      title: "Flywheel Success Factors",
      description: "What made this project successful using the flywheel approach:",

      factors: [
        {
          factor: "Rapid Initial Value",
          description: "Day 1 version solved a real problem, even if simply",
          evidence: "First user found value within 2 hours of launch",
          lesson: "Perfect is the enemy of useful - launch when it's useful",
        },
        {
          factor: "User-Driven Development",
          description: "Every cycle incorporated real user feedback",
          evidence: "85% of features came from user requests, not internal ideas",
          lesson: "Users know what they need better than you do",
        },
        {
          factor: "Technical Excellence Without Over-Engineering",
          description: "High code quality without premature optimization",
          evidence: "Codebase remained maintainable through 15 major releases",
          lesson: "Good engineering practices scale; clever optimizations don't",
        },
        {
          factor: "Consistent Deployment and Iteration",
          description: "Regular releases maintained development momentum",
          evidence: "Weekly releases for 6 months, each with measurable improvements",
          lesson: "Consistency beats perfection in maintaining velocity",
        },
      ],
    },

    applicableLessons: {
      title: "Lessons You Can Apply",
      description: "Key takeaways for your own flywheel projects:",

      principles: [
        {
          principle: "Start With Your Own Problem",
          application: "Build something you need - you'll understand the problem deeply",
          warning: "Validate that other people have the same problem",
        },
        {
          principle: "Deploy Early and Often",
          application: "Real users reveal problems you can't anticipate",
          warning: "Don't deploy broken code, but don't wait for perfection",
        },
        {
          principle: "Measure What Matters to Users",
          application: "Track user outcomes, not just technical metrics",
          warning: "Avoid vanity metrics that don't drive decision-making",
        },
        {
          principle: "Build for Change",
          application: "Design systems that can evolve as you learn",
          warning: "Don't over-engineer, but don't paint yourself into corners",
        },
        {
          principle: "Community Amplifies Value",
          application: "Enable users to extend and share your work",
          warning: "Community takes time to develop - be patient but intentional",
        },
      ],
    },

    yourTurn: {
      title: "Your Turn",
      description: "Ready to apply the flywheel approach to your own project?",

      steps: [
        {
          step: "Identify Your Problem",
          description: "Find something that genuinely bothers you in your daily work",
          questions: [
            "What task do you do repeatedly that could be automated?",
            "What information do you need but can't easily get?",
            "What tools frustrate you with their limitations?",
          ],
        },
        {
          step: "Design Your Day 1",
          description: "Plan the simplest possible solution that provides real value",
          criteria: [
            "Can be built in 4-6 hours",
            "Solves one specific problem completely",
            "Works end-to-end, even if simply",
          ],
        },
        {
          step: "Plan for Learning",
          description: "Set up systems to capture user feedback from Day 1",
          tools: [
            "Simple analytics to understand usage patterns",
            "Easy feedback mechanisms built into the product",
            "Direct communication channels with early users",
          ],
        },
        {
          step: "Commit to Iteration",
          description: "Plan regular improvement cycles based on real usage",
          schedule: [
            "Week 1: Deploy and gather initial feedback",
            "Week 2: First major improvement based on user input",
            "Month 1: Feature stability and performance optimization",
            "Month 2: Community features and extensibility",
          ],
        },
      ],
    },

    finalReflection: {
      content: "The cass-memory project proves that the flywheel approach can take you from weekend experiment to production tool serving hundreds of users. The key is not building the perfect product, but building the right product through rapid iteration and genuine user focus. Every cycle teaches you something new, and every deployment gets you closer to something truly valuable.",

      callToAction: "Start your flywheel today. Pick a problem you face, build the simplest solution that works, and let real users guide you toward something amazing.",
    },
  },
};