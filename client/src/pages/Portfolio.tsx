import { useEffect, useMemo, useState, useRef, createContext, useContext } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import {
  Download,
  Mail,
  MapPin,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  GraduationCap,
  FolderGit2,
  User,
  Phone,
  Calendar,
  Building2,
  ArrowUpRight,
  Database,
  Sun,
  Moon,
} from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";

// Navigation items
const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Work experience
const experiences = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Fivetran",
    location: "Bengaluru, India",
    period: "Mar 2023 - Aug 2024",
    description: "Redesigned data writers for BigQuery destination and optimized warehouse data pipelines. Led implementation of JSON data type support and cost optimization features.",
    achievements: [
      "Redesigned BigQuery writer to mirror SQL flow, slashing maintenance by 90% while easing feature rollout across destinations.",
      "Introduced multithreaded warehouse writer with concurrent split-file handling, lifting ingest throughput by roughly 30%.",
      "Delivered native JSON data type support in BigQuery to simplify migrations and improve downstream correctness.",
      "Applied partitioning and clustering strategies that cut customers’ BigQuery storage/scan bills by about 90%.",
    ],
    technologies: ["BigQuery", "SQL", "Java", "Multi-threading", "Data Pipelines", "Cloud SQL"],
  },
  {
    id: 2,
    title: "Software Engineer 2",
    company: "Fivetran",
    location: "Bengaluru, India",
    period: "Sep 2021 - Mar 2023",
    duration: "1 year 7 months",
    description: "Designed high-performance database connectors for DynamoDB and MongoDB. Developed new connector support for Azure CosmosDB.",
    achievements: [
      "Built a high-performance DynamoDB source connector achieving ~15× faster incremental reads versus the prior implementation.",
      "Designed a MongoDB Change Streams CDC pipeline that delivers ~5× faster incremental syncs with lower latency.",
      "Implemented an end-to-end Azure Cosmos DB (Mongo API) connector with auth, schema handling, and reliability guards.",
      "Launched Data Preview via IES to streamline onboarding and make connector extensions repeatable across the catalog.",
    ],
    technologies: ["DynamoDB", "MongoDB", "Azure CosmosDB", "CDC", "GraphQL", "Java"],
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Fivetran",
    location: "Bengaluru, India",
    period: "Jun 2020 - Aug 2021",
    duration: "1 year 3 months",
    description: "Authored Isolated Endpoint Sync framework adopted across 500+ connectors. Built public Shopify app and implemented scalable Strip connector enhancements.",
    achievements: [
      "Authored the Isolated Endpoint Sync framework now used in 500+ connectors and 10+ teams’ workflows.",
      "Shipped a public Shopify app with merchant auth, GraphQL data extraction, and resilient retry/backoff.",
      "Added multithreading plus connected-account support to scale the Stripe connector under heavy merchant loads.",
      "Built an ADP REST ETL connector with documented ERD, fault handling, and production-readiness.",
    ],
    technologies: ["REST API", "GraphQL", "Shopify", "Multi-threading", "ETL", "Java"],
  },
  {
    id: 4,
    title: "Software Engineer Intern",
    company: "Fivetran",
    location: "Bengaluru, India",
    period: "Jan 2020 - May 2020",
    duration: "5 months",
    description: "Worked on API-based data pipeline connectors and implemented performance benchmarking for ETL pipelines.",
    achievements: [
      "Built and hardened multiple API data-pipeline connectors across finance and commerce sources.",
      "Added Recharge webhooks for incremental syncs, boosting extract speed by roughly 10×.",
      "Benchmarked the end-to-end Snowflake ETL pipeline to quantify latency and throughput bottlenecks.",
      "Extended webhook handling and retries to stabilize Recharge and improve customer reliability.",
    ],
    technologies: ["Python", "Webhooks", "Snowflake", "ETL", "API", "Java"],
  },
];

// Projects portfolio
const projects = [
  {
    id: 1,
    title: "High-Performance DynamoDB Connector",
    description: "Designed and developed a high-performance DynamoDB source connector achieving 15x faster incremental data retrieval compared to previous versions.",
    technologies: ["DynamoDB", "Java", "AWS", "Data Pipelines"],
    link: "https://github.com/SunilKuruba",
    image: "/images/1_dynamoDB.png",
    flagship: true,
  },
  {
    id: 2,
    title: "MongoDB CDC Incremental Sync",
    description: "Developed MongoDB Change Streams-based CDC incremental syncing, delivering 5x performance improvement for real-time data extraction.",
    technologies: ["MongoDB", "Change Streams", "CDC", "Java"],
    link: "https://github.com/SunilKuruba",
    image: "/images/2_MongoDB.png",
  },
  {
    id: 3,
    title: "Mini Database Management System Internals Implementation",
    description: "Built the core internals of a relational database management system from scratch, including a page-based Storage Manager, in-memory Buffer Manager with FIFO and LRU replacement strategies, Record Manager with slotted-page storage, and B+ Tree Index Manager for efficient key-based lookup.",
    technologies: ["C", "Database Systems", "Storage Management", "Indexing", "B+ Trees"],
    link: "https://github.com/SunilKuruba/Mini-Database-Management-System-Internals-Implementation",
    image: "/images/1_db_internals.png",
  },
  {
    id: 4,
    title: "BigQuery Data Writer Redesign",
    description: "Redesigned and developed a new data writer for the BigQuery destination, aligning with SQL-based data writers, eliminating maintenance overhead by 90%, and streamlining the implementation of new features. Optimized using data partitioning and clustering, reducing customer BigQuery bills by 90%.",
    technologies: ["BigQuery", "SQL", "Java", "Data Warehouse", "Cloud Optimization"],
    link: "https://github.com/SunilKuruba",
    image: "/images/bigquery.png",
  },
  {
    id: 5,
    title: "Snowflake Multi-Threaded Data Writer Pipeline",
    description: "Enhanced the efficiency of the Warehouse Data Writer pipeline by 30% through the implementation of multi-threading with multiple workers, enabling concurrent file append and processing of split files. Improved data ingestion performance and reduced pipeline latency.",
    technologies: ["Snowflake", "Java", "Multi-threading", "Data Pipelines", "ETL"],
    link: "https://github.com/SunilKuruba",
    image: "/images/snowflake.png",
  },
  {
    id: 6,
    title: "Multi-Source API Connectors for Data Integration",
    description: "Implemented API connectors for 20+ data sources including finance and e-commerce platforms. Built robust data ingestion and processing pipelines with comprehensive error handling, rate limiting, and maintenance protocols. Enabled seamless data integration across diverse business domains.",
    technologies: ["REST APIs", "GraphQL", "Data Integration", "ETL", "Java", "Error Handling"],
    link: "https://github.com/SunilKuruba",
    image: "/images/api_connector.png",
  },
  {
    id: 7,
    title: "Isolated Endpoint Sync Framework",
    description: "Authored reliability framework adopted across 10+ engineering teams and 500+ connectors, improving consistency and fault tolerance across the data pipeline platform.",
    technologies: ["Java", "Multi-threading", "ETL", "Distributed Systems"],
    link: "https://github.com/SunilKuruba",
    image: "/images/3_isolated.png",
  },
  {
    id: 8,
    title: "AWS vs GCP Data Pipeline: Comparative Analysis",
    description: "Designed and benchmarked parallel real-time data streaming pipelines on AWS and GCP to evaluate performance, cost efficiency, and environmental sustainability. Built mirror-image architectures using Kinesis/Lambda/DynamoDB and managed Kafka/Beam/Bigtable respectively.",
    technologies: ["AWS", "GCP", "Kinesis", "Apache Beam", "Terraform", "DynamoDB", "Bigtable"],
    link: "https://github.com/SunilKuruba/AWS-VS-GCP-Data-Pipeline-Comparative-Analysis-of-Real-Time-Data-Streaming",
    image: "/images/2_data_pipeline_benchmark.png",
  },
  {
    id: 9,
    title: "Visual Analytics for LinkedIn Job Postings",
    description: "Built an end-to-end visual analytics system to explore large-scale job market data. Features include interactive Altair and Vega-Lite dashboards, embedding-based job similarity exploration using PCA and t-SNE for cluster discovery and trend analysis.",
    technologies: ["Data Visualization", "Altair", "Vega-Lite", "Python", "Analytics", "Interactive Dashboards"],
    link: "https://github.com/SunilKuruba/Visual-Analytics-and-Interactive-Dashboards-for-LinkedIn-Postings",
    image: "/images/7_visual_analytics.png",
  },
  {
    id: 10,
    title: "Distributed LLM Text Processing with Hadoop and AWS EMR",
    description: "Leveraged Apache Hadoop and AWS EMR to build a distributed system for preprocessing large-scale text data and generating token embeddings for LLM applications using custom tokenizers and MapReduce.",
    technologies: ["Hadoop", "AWS EMR", "MapReduce", "Scala", "Text Processing", "NLP"],
    link: "https://github.com/SunilKuruba/Apache-Hadoop-and-AWS-EMR-Distributed-LLM-Text-Processing-and-Embeddings",
    image: "/images/3_hadoop.png",
  },
  {
    id: 11,
    title: "Distributed Neural Network Training with Spark and AWS EMR",
    description: "Used Apache Spark on AWS EMR to train and evaluate neural networks for natural language generation. Implemented multi-layer feedforward neural networks for distributed text processing and sentence generation.",
    technologies: ["Apache Spark", "AWS EMR", "DL4J", "MLlib", "Neural Networks", "NLP"],
    link: "https://github.com/SunilKuruba/Apache-Spark-and-AWS-EMR-Distributed-Neural-Network-Training-and-Sentence-Generation",
    image: "/images/4_spark.png",
  },
  {
    id: 12,
    title: "LLM Conversation API with AWS Bedrock and Ollama",
    description: "Implemented a hybrid conversational API integrating AWS Bedrock and Ollama for both cloud-based and local LLM inference. Built with Scala, Akka HTTP, gRPC, and deployed via Docker on AWS EC2 for production-grade LLM orchestration.",
    technologies: ["AWS Bedrock", "Ollama", "Scala", "Akka HTTP", "gRPC", "Docker", "AWS Lambda"],
    link: "https://github.com/SunilKuruba/AWS-Bedrock-Based-LLM-Conversation-API-with-Ollama-Integration-with-Dockerized-Deployment",
    image: "/images/8_aws_llm.png",
  },
  {
    id: 13,
    title: "Help Session Activity Management System",
    description: "Developed a full-stack application to streamline the scheduling and management of help sessions for students and instructors. Features include session creation, attendance tracking, feedback logging, and role-based access with analytics dashboards.",
    technologies: ["Database Design", "API Development", "Full-Stack", "User Experience", "Analytics"],
    link: "https://github.com/SunilKuruba/Data-Modeling-Help-Session-Activity-Management-System",
    image: "/images/5_data_modeling.png",
  },
  {
    id: 14,
    title: "Social-Aware Movie Revenue Prediction using Sentiment",
    description: "Predicted box office revenue by combining traditional movie metadata with real-time social sentiment and emotion signals from Reddit and YouTube using RoBERTa and DistilRoBERTa. Achieved 10-15% accuracy improvement with XGBoost, CatBoost, and LightGBM.",
    technologies: ["Machine Learning", "NLP", "RoBERTa", "XGBoost", "Feature Engineering", "Data Science"],
    link: "https://github.com/SunilKuruba/Data-Science-Project-Social-Aware-Movie-Revenue-Prediction-Using-Metadata-and-Sentiment-Signals",
    image: "/images/6_data_science.png",
  },
  {
    id: 15,
    title: "Fairness-Aware Job Recommendation System",
    description: "Implemented a fairness-aware job recommendation system combining semantic embeddings of resumes and job descriptions with collaborative filtering. Focused on exposure fairness using metrics like Selection Rate and Proportional Fairness Error.",
    technologies: ["Recommendation Systems", "Embeddings", "Fairness in ML", "Collaborative Filtering", "NLP"],
    link: "https://github.com/Vishnu1721/Fair-and-Explainable-Job-Recommendation-System",
    image: "/images/9_fainess_job.jpeg",
  },
];

// Education history
const education = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    school: "University of Illinois Chicago",
    period: "Aug 2024 - Dec 2025",
    focus: "Specialization in Data Engineering, Cloud Computing, Distributed Systems, and Big Data Technologies",
  },
  {
    id: 2,
    degree: "Bachelor of Engineering in Computer Science",
    school: "R. V. College of Engineering, Bangalore",
    period: "Aug 2016 - Aug 2020",
    focus: "Computer Science and Engineering",
  },
];

// Professional certifications
const certifications = [
  {
    name: "AWS Certified Data Engineer – Associate",
    date: "Jul 2025",
    description: "Verified on Credly. Demonstrating hands-on expertise in designing, building, and operating scalable, secure, and cost-efficient data pipelines on AWS. This certification validates a deep understanding of how data volume, variety, and velocity influence ingestion architectures, storage strategies, and analytical workloads across modern data platforms.\n\nI am proficient in implementing end-to-end data solutions using a broad range of AWS services, including Amazon S3, Kinesis Data Streams, Kinesis Firehose, AWS Glue, Amazon EMR, Amazon Athena, Amazon Redshift, AWS Lambda, Amazon ECS, AWS Step Functions, Amazon EventBridge, Amazon RDS, DynamoDB, Amazon EC2, and Amazon EBS. The certification also reflects strong experience with security and governance using IAM, KMS, VPC, and CloudTrail, as well as monitoring, troubleshooting, and cost optimization through CloudWatch, AWS Config, and billing best practices, enabling reliable, production-grade data systems at scale.",
    link: "https://www.credly.com/badges/775a6e7e-2f28-4cb8-ac1c-02949a7a0587/linked_in?t=szfxty",
    image: "/images/AWS_certificate.png"
  }
];

// Key statistics
const stats = [
  { number: "5", label: "years of experience", color: "text-blue-600" },
  { number: "50+", label: "projects completed", color: "text-blue-600" },
  { number: "AWS", label: "Certified Data Engineer", color: "text-blue-600" },
];

const StatsAnimationContext = createContext<{ animateReady: boolean }>({ animateReady: false });

function StatCard({ stat }: { stat: { number: string; label: string; color: string } }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(stat.number);
  const { animateReady } = useContext(StatsAnimationContext);

  useEffect(() => {
    if (!animateReady) return;

    const numericMatch = stat.number.match(/^[0-9]+/);
    if (!numericMatch) return;

    const target = parseInt(numericMatch[0], 10);
    const start = 0;
    const duration = 1200;

    const handle = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;

      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const next = Math.floor(start + progress * (target - start));
        setValue(next.toString() + (stat.number.endsWith("+") ? "+" : ""));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(handle, { threshold: 0.35 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.number, animateReady]);

  return (
    <Card ref={ref} className="p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary/5 cursor-pointer">
      <div className={`text-4xl sm:text-5xl font-bold ${stat.color} mb-2`}>
        {value}
      </div>
      <p className="text-muted-foreground text-lg">{stat.label}</p>
    </Card>
  );
}

// Technical skills by category
const skills = [
  { category: "Programming Languages", items: ["Java", "SQL", "Python", "Scala", "C++", "Go", "Bash/Shell scripting"] },
  { category: "Cloud & Technologies", items: ["AWS", "GCP", "Azure", "Git", "GitHub", "CI/CD", "Docker", "Kubernetes", "Terraform", "Tableau", "dbt"] },
  { category: "Data Engineering", items: ["Data ETL/ELT pipelines", "Data modeling", "Data integration", "Data ingestion", "Data Lakes", "Data Warehouse", "Big Data Processing", "Data Governance", "Data Catalog", "Real-time Analytics", "Data validation", "Database Migrations"] },
  { category: "Distributed Systems & Tools", items: ["Apache Spark", "Apache Hadoop", "Apache Flink", "Apache Kafka", "Apache Hive", "Redis", "ElasticSearch", "Apache Airflow", "gRPC", "Apache MapReduce"] },
];

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [statsAnimateReady, setStatsAnimateReady] = useState(false);
  const [weather, setWeather] = useState<
    Record<
      string,
      {
        tempF: number;
        description: string;
        icon: string;
      }
    >
  >({});

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const startDark = stored ? stored === "dark" : false; // default to light
    setIsDark(startDark);
    document.documentElement.classList.toggle("dark", startDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => setStatsAnimateReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let raf = 0;
    const handler = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty("--mouse-x", `${clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${clientY}px`);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setCursorPos({ x: clientX, y: clientY }));
    };
    window.addEventListener("pointermove", handler);
    return () => {
      window.removeEventListener("pointermove", handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 6);
  const hasMoreProjects = projects.length > 6;

  const weatherLocations = useMemo(
    () => [
      { id: "san_francisco", name: "San Francisco", lat: 37.7749, lon: -122.4194 },
      { id: "chicago", name: "Chicago", lat: 41.8781, lon: -87.6298 },
      { id: "new_york", name: "New York", lat: 40.7128, lon: -74.006 },
    ],
    []
  );

  const weatherCodeToDesc = (code: number) => {
    const map: Record<number, { desc: string; icon: string }> = {
      0: { desc: "Clear", icon: "☀️" },
      1: { desc: "Mainly clear", icon: "🌤️" },
      2: { desc: "Partly cloudy", icon: "🌤️" },
      3: { desc: "Overcast", icon: "☁️" },
      45: { desc: "Foggy", icon: "🌫️" },
      48: { desc: "Rime fog", icon: "🌫️" },
      51: { desc: "Light drizzle", icon: "🌦️" },
      53: { desc: "Drizzle", icon: "🌦️" },
      55: { desc: "Heavy drizzle", icon: "🌧️" },
      61: { desc: "Light rain", icon: "🌦️" },
      63: { desc: "Rain", icon: "🌧️" },
      65: { desc: "Heavy rain", icon: "🌧️" },
      71: { desc: "Light snow", icon: "🌨️" },
      73: { desc: "Snow", icon: "🌨️" },
      75: { desc: "Heavy snow", icon: "🌨️" },
      95: { desc: "Thunderstorm", icon: "⛈️" },
    };
    return map[code] ?? { desc: "Weather", icon: "🌤️" };
  };

  const fetchWeather = async (key: string, lat: number, lon: number) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      const code = data?.current?.weather_code ?? 0;
      const tempC = data?.current?.temperature_2m ?? 0;
      const tempF = tempC * 9 / 5 + 32;
      const { desc, icon } = weatherCodeToDesc(code);
      setWeather((prev) => ({
        ...prev,
        [key]: { tempF: Math.round(tempF), description: desc, icon },
      }));
    } catch (e) {
      // fail silently
    }
  };

  useEffect(() => {
    weatherLocations.forEach((loc) => fetchWeather(loc.id, loc.lat, loc.lon));
  }, [weatherLocations]);

  return (
    <div className="min-h-screen bg-background pb-12 luminous-bg relative z-0">
      {/* Cursor Glow */}
      <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[36px]"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.1) 45%, rgba(59,130,246,0) 70%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sm border-b"
       >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a
              href="#"
              className="flex items-center gap-2 font-semibold text-lg"
             >
              <span>Sunil Kuruba Portfolio</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.href)}
                 
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                aria-label="Toggle theme"
                onClick={() => setIsDark((prev) => !prev)}
               
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                className="ml-4"
                onClick={() => window.open("https://drive.google.com/file/d/1PRGbhxBypX2w2Xn4TL6vVyABmkS7fudx/view?usp=drive_link", "_blank")}
               
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="w-full justify-start"
                 >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                aria-label="Toggle theme"
                onClick={() => setIsDark((prev) => !prev)}
               
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>
              <Button
                size="sm"
                className="w-full mt-2"
                onClick={() => window.open("https://drive.google.com/file/d/1PRGbhxBypX2w2Xn4TL6vVyABmkS7fudx/view?usp=drive_link", "_blank")}
               
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            {/* Photo and Quick Info */}
            <div className="flex flex-col items-center lg:items-start pt-10">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl scale-110" />
                <Avatar className="w-48 h-48 border-4 border-background shadow-xl relative">
                  <AvatarImage src="/images/profile3.jpg" alt="Profile" />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                    SK
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, California</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/sunil-kuruba"
                    target="_blank"
                    rel="noopener noreferrer"
                   >
                    <SiLinkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <a
                    href="https://github.com/SunilKuruba"
                    target="_blank"
                    rel="noopener noreferrer"
                   >
                    <SiGithub className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Intro Text */}
            <div className="flex-1 text-center lg:text-left mt-20">
              <Badge variant="secondary" className="mb-4">
                Open to Work
              </Badge>
              <style>{`
                @keyframes typewriter {
                  from {
                    width: 0;
                  }
                  to {
                    width: 100%;
                  }
                }
                .typewriter {
                  overflow: hidden;
                  white-space: nowrap;
                  animation: typewriter 3s steps(40, end) 1;
                }
              `}</style>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent typewriter">
                Hi, I'm{" "}
                <span className="text-primary">Sunil Kuruba</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl">
                Senior Backend & Data Infrastructure Engineer with deep experience building high-throughput data pipelines and large-scale distributed systems. Specialized in cloud-native analytics platforms, real-time streaming, and reliability-focused backend services.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-8">
                <Button
                  size="lg"
                  onClick={() => window.open("https://drive.google.com/file/d/1PRGbhxBypX2w2Xn4TL6vVyABmkS7fudx/view?usp=drive_link", "_blank")}
                 
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("#contact")}
                 
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsAnimationContext.Provider value={{ animateReady: statsAnimateReady }}>
        <section className="py-12 px-4 sm:px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>
          </div>
        </section>
      </StatsAnimationContext.Provider>

      {/* Geo-IP City + Weather */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-3 gap-3">
                {weatherLocations.map((loc) => {
                  const data = weather[loc.id];
                  const fallback = {
                    tempF: 72,
                    description:
                      loc.id === "san_francisco"
                        ? "Sunny"
                        : loc.id === "new_york"
                        ? "Mostly clear"
                        : "Partly cloudy",
                    icon: "🌤️",
                  };
                  const display = data ?? fallback;
                  return (
                    <Card
                      key={loc.id}
                      className="px-3 py-2 h-12 shadow-sm border bg-muted/20 flex items-center gap-2 text-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-muted/30"
                    >
                      <span className="text-lg leading-none">{display.icon}</span>
                      <span className="font-semibold whitespace-nowrap">{loc.name}</span>
                      <span className="text-muted-foreground truncate">
                        • {display.tempF}°F, {display.description}
                      </span>
                    </Card>
                  );
                })}
              </div>
              <p className="text-base sm:text-lg text-muted-foreground">
                I enjoy building systems that are just as predictable as today’s weather.
              </p>
            </div>
          </Card>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => scrollToSection("#about")}
              className="animate-bounce text-muted-foreground hover:text-foreground transition-colors"
             >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 bg-muted/30"
       >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-md">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">About Me</h2>
          </div>

          <div>
            <Card className="p-6 sm:p-8">
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <p className="text-lg leading-relaxed mb-4">
                  <span className="font-semibold text-primary">Background:</span>{" "}
                  I bring ~5 years of industry experience in data engineering and backend systems, designing and operating scalable, cloud-native, and high-performance data platforms used in production by enterprise customers. I recently completed an MS in Computer Science at the University of Illinois Chicago, where I specialised in data engineering, cloud computing, distributed systems, and big data technologies, building directly on my industry background.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  <span className="font-semibold text-primary">AWS Certification:</span>{" "}
                  I am an AWS Certified Data Engineer – Associate with strong hands-on experience building secure, cost-efficient, and high-throughput data pipelines using services such as Amazon S3, Glue, EMR, Kinesis, Redshift, Athena, and DynamoDB. My expertise spans ETL/ELT pipelines, data lake and lakehouse architectures, data governance, and real-time analytics at scale.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  <span className="font-semibold text-primary">Professional Experience:</span>{" "}
                  Previously, I worked as a Senior Software Engineer at Fivetran, collaborating in a startup environment across multiple teams within the data pipeline platform and contributing to both source connectors and destination writers. My work spanned API-based connectors as well as database connectors such as DynamoDB and MongoDB, focusing on scalability, correctness, and performance. I led the design of a high-performance DynamoDB incremental sync engine, achieving 15× faster syncs, and implemented MongoDB Change Streams–based CDC incremental syncing, delivering a 5× performance improvement. On the destination side, I worked on data warehouse writers, including BigQuery and Snowflake. Beyond individual connectors, I authored and designed a reliability framework adopted across 10+ engineering teams, won multiple internal hackathons, mentored and onboarded interns through a structured training program, and regularly participated in technical interviews for engineering roles.
                </p>
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold text-primary">Open to Work:</span>{" "}
                  I enjoy working on high-impact data infrastructure problems, building systems that are scalable, reliable, and cost-efficient from day one. I am currently open to full-time roles in data engineering, backend systems, and cloud infrastructure, particularly in fast-moving, product-focused teams.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className="py-20 px-4 sm:px-6"
       >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-md">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>

          <div className="grid lg:grid-cols-1 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {cert.image && (
                    <div className="lg:w-48 lg:shrink-0">
                      <img 
                        src={cert.image} 
                        alt={cert.name}
                        className="w-full h-auto rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <a 
                      href={cert.link} 
                      target="_blank" rel="noopener noreferrer"
                      className="font-semibold text-xl sm:text-2xl text-primary hover:underline"
                    >
                      {cert.name}
                    </a>
                    <div className="flex items-center gap-3 mt-2 mb-4 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{cert.date}</span>
                    </div>
                    <div className="text-muted-foreground whitespace-pre-line">
                      {cert.description.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-4" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 px-4 sm:px-6"
       >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-md">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={exp.id}
                className="p-6 sm:p-8 relative overflow-visible"
               >
                {index !== experiences.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-6 bg-border hidden sm:block" />
                )}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="shrink-0 flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Key Achievements:</h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 sm:px-6 bg-muted/30"
       >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-md">
              <FolderGit2 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-visible hover-elevate flex flex-col"
               >
                <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <Database className="w-12 h-12 text-primary/40" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 -mt-1 -mr-2"
                      asChild
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                       >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.flagship && (
                      <Badge variant="outline" className="text-[11px] gap-1 border-amber-400 text-amber-600 bg-amber-50">
                        ⭐ Flagship project
                      </Badge>
                    )}
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
      {hasMoreProjects && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowAllProjects((prev) => !prev)}
               
              >
                {showAllProjects ? "Show fewer projects" : "View more projects"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showAllProjects ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-20 px-4 sm:px-6"
       >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-md">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Education</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {education.map((edu) => (
              <Card
                key={edu.id}
                className="p-6"
               >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-md shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.school}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {edu.period}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-3">
                      {edu.focus}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 sm:px-6 bg-muted/30"
       >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-md">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Technical Skills</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-lg mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Impact Section */}
      <section id="leadership" className="py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-primary/10 rounded-md">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Leadership & Engineering Impact</h2>
          </div>

          <div className="grid gap-8">
            {/* Onboarding Interns */}
            <Card className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Onboarding Software Engineering Interns</h3>
                  <p className="text-sm text-muted-foreground">Fivetran · Jan 2023 · 1 mo</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Led the training and development of 12 interns from various colleges, designing and implementing a comprehensive month-long onboarding program. This program included detailed sessions on essential tools such as version control systems and IDEs, in-depth overviews of company processes and best practices, and hands-on workshops focused on understanding the architecture of complex systems. Additionally, I provided personalized guidance on navigating the company's codebase, ensuring that each intern was well-equipped to contribute effectively to ongoing projects. My efforts resulted in a smooth transition for the interns, enabling them to become productive members of the team more quickly.
              </p>
            </Card>

            {/* Technical Interviewer */}
            <Card className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Technical Interviewer</h3>
                  <p className="text-sm text-muted-foreground">Fivetran · Sep 2021 - Aug 2024 · 3 yrs</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Conducted technical interviews for Software Interns, Software Engineers (SE1 and SE2), and Test Engineers, assessing candidates' expertise in coding, data engineering, and software development. Collaborated closely with the hiring team to identify top talent, ensuring alignment with both technical standards and company culture, while contributing to the continuous improvement of the interview process. Regularly participated in intern university drives, representing the engineering team, calibrating rubrics with campus panels, and mentoring shortlisted candidates through their onsite loops.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-primary/10 rounded-md">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Recommendations</h2>
          </div>

          <div className="grid gap-8">
            {/* Viswanath C */}
            <Card className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarFallback className="bg-primary text-white font-bold">VC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Viswanath C</h3>
                  <p className="text-sm text-muted-foreground">VP, Software Engineering</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I've had the opportunity to work with Sunil, and I appreciate his proactive approach to software development. He often takes the initiative to identify potential issues early and suggests improvements that help enhance the product for our customers. Sunil pays close attention to user needs and works thoughtfully to make the product more user-friendly and efficient.
              </p>
            </Card>

            {/* Ravi Sharda */}
            <Card className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarFallback className="bg-primary text-white font-bold">RS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Ravi Sharda</h3>
                  <p className="text-sm text-muted-foreground">Principal Software Engineer</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I had the pleasure of working with Sunil at Fivetran, and I highly recommend him. He's incredibly innovative, always bringing fresh ideas and creative solutions to the team. Beyond that, he's a joy to work with—hardworking, meticulous, and a great collaborator. If you're looking for someone who combines creativity with reliability, Sunil is the person to have on your team!
              </p>
            </Card>

            {/* Amit Aggarwal */}
            <Card className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarFallback className="bg-primary text-white font-bold">AA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Amit Aggarwal</h3>
                  <p className="text-sm text-muted-foreground">Director of Engineering</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Sunil's exceptional technical expertise and problem-solving abilities are remarkable. From his time as an intern to his current role, Sunil has consistently been my go-to person for product-related queries and urgent tasks. His ability to deliver high-quality solutions under tight deadlines, coupled with his deep understanding of our systems, has made him an invaluable asset to our team.
              </p>
            </Card>

            {/* Ashwini Sharma */}
            <Card className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarFallback className="bg-primary text-white font-bold">AS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Ashwini Sharma</h3>
                  <p className="text-sm text-muted-foreground">Engineering Leader</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I had the privilege of managing Sunil Kuruba at Fivetran, where he consistently demonstrated outstanding technical expertise and leadership. From day one, Sunil impressed with his deep product knowledge, quick coding ability, and willingness to mentor others. He rapidly became the go-to person for complex projects, playing a pivotal role in our team's success.
              </p>
            </Card>

            <div className="flex justify-center">
              <Button
                variant="link"
                className="text-primary"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/sunil-kuruba/details/recommendations/?detailScreenTabIndex=0",
                    "_blank"
                  )
                }
               
              >
                View all 11 recommendations on LinkedIn
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 bg-muted/30"
       >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-md">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Get in Touch</h2>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            <Card className="p-6 sm:p-8 w-full">
              <p className="text-muted-foreground mb-6">
                I'm always interested in hearing about new opportunities,
                interesting projects, or just connecting with fellow data
                professionals. Feel free to reach out!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column: Email and Phone */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-primary/10 rounded-md shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-sm truncate">sunil.kuruba.sk@gmail.com</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText("sunil.kuruba.sk@gmail.com");
                        alert("Email copied to clipboard!");
                      }}
                     
                      className="shrink-0 ml-2"
                    >
                      Copy
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-primary/10 rounded-md shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-sm truncate">+1 (312) 375-3597</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText("+1 (312) 375-3597");
                        alert("Phone number copied to clipboard!");
                      }}
                     
                      className="shrink-0 ml-2"
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Right Column: LinkedIn and GitHub */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-primary/10 rounded-md shrink-0">
                        <SiLinkedin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">LinkedIn</p>
                        <p className="font-medium text-sm truncate">linkedin.com/in/sunil-kuruba</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="shrink-0 ml-2"
                    >
                      <a
                        href="https://www.linkedin.com/in/sunil-kuruba"
                        target="_blank"
                        rel="noopener noreferrer"
                       >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-primary/10 rounded-md shrink-0">
                        <SiGithub className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">GitHub</p>
                        <p className="font-medium text-sm truncate">github.com/SunilKuruba</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="shrink-0 ml-2"
                    >
                      <a
                        href="https://github.com/SunilKuruba"
                        target="_blank"
                        rel="noopener noreferrer"
                       >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Sticky Quick Links */}
      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground text-center sm:text-left w-full sm:w-auto leading-none">
            Sunil Kuruba Portfolio
          </p>
          <p className="text-sm text-muted-foreground text-center sm:text-right w-full sm:w-auto leading-none">
            Built with passion for data
          </p>
        </div>
      </footer>
    </div>
  );
}
