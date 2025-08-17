import { useState, useEffect, useRef } from "react";
import {
  Database,
  Code,
  Menu,
  X,
  ChevronRight,
  Send,
  User,
  Mail,
  MessageSquare,
  Github,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

// Project data with technology tags
const projects = [
  {
    id: 1,
    title: "Data Analytics Dashboard",
    description:
      "Comprehensive dashboard for data visualization and business intelligence with real-time analytics and automated reporting features.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b0d6eb737e2225705c929fb0c30e3d05ea4f3c31?width=911",
    tags: ["Python", "Pandas", "Plotly", "FastAPI"],
    github: "https://github.com/eliseucoelho/analytics-dashboard",
    live: "https://analytics-dashboard.eliseucoelho.dev",
  },
  {
    id: 2,
    title: "E-commerce API",
    description:
      "RESTful API for e-commerce platform with payment integration, inventory management, and user authentication system.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b0d6eb737e2225705c929fb0c30e3d05ea4f3c31?width=911",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    github: "https://github.com/eliseucoelho/ecommerce-api",
    live: "https://api.eliseucoelho.dev",
  },
  {
    id: 3,
    title: "Machine Learning Predictor",
    description:
      "ML model for sales prediction using historical data analysis with automated feature engineering and model optimization.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b0d6eb737e2225705c929fb0c30e3d05ea4f3c31?width=911",
    tags: ["Python", "Scikit-learn", "TensorFlow", "Docker"],
    github: "https://github.com/eliseucoelho/ml-predictor",
    live: "https://ml-predictor.eliseucoelho.dev",
  },
  {
    id: 4,
    title: "Task Management App",
    description:
      "Full-stack task management application with real-time collaboration, file sharing, and project timeline tracking.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b0d6eb737e2225705c929fb0c30e3d05ea4f3c31?width=911",
    tags: ["React", "TypeScript", "MongoDB", "Socket.io"],
    github: "https://github.com/eliseucoelho/task-manager",
    live: "https://tasks.eliseucoelho.dev",
  },
  {
    id: 5,
    title: "Financial Tracker",
    description:
      "Personal finance management tool with expense categorization, budget planning, and financial goal tracking features.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b0d6eb737e2225705c929fb0c30e3d05ea4f3c31?width=911",
    tags: ["Vue.js", "Django", "PostgreSQL", "Chart.js"],
    github: "https://github.com/eliseucoelho/finance-tracker",
    live: "https://finance.eliseucoelho.dev",
  },
  {
    id: 6,
    title: "IoT Monitoring System",
    description:
      "Real-time IoT device monitoring system with sensor data collection, alerting, and historical data analysis.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b0d6eb737e2225705c929fb0c30e3d05ea4f3c31?width=911",
    tags: ["Python", "MQTT", "InfluxDB", "Grafana"],
    github: "https://github.com/eliseucoelho/iot-monitor",
    live: "https://iot.eliseucoelho.dev",
  },
];

// Technology icons data
const technologies = [
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/5edf31807ed94d54c05b8600270482b298061486?width=200",
    alt: "Python",
    name: "Python",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/f3ce4a13da491f4dba0abdba4308f49475964850?width=198",
    alt: "JavaScript",
    name: "JavaScript",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/b5418d22a726b275f48d75ced6a2108e7b76e151?width=130",
    alt: "SQL",
    name: "SQL",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/1f7c18b4abbccf6618feae0126bcfe9baf30b7a5?width=158",
    alt: "React",
    name: "React",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/f4a8a02c15e925dfd78a1218116175f327a1efd9?width=166",
    alt: "Node.js",
    name: "Node.js",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/b5054e07e41b2aad9bce03542e37ff6e56cdc56b?width=178",
    alt: "Django",
    name: "Django",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/c65cf2e6b83816aa44e52ab8a87aef0c375ef8d2?width=200",
    alt: "MongoDB",
    name: "MongoDB",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/cd4e9e18c3cf72c97fa889b03081a3badd52e899?width=210",
    alt: "PostgreSQL",
    name: "PostgreSQL",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/da3f0d0b148ca00ec4f9b5b545eb505db039087e?width=218",
    alt: "Docker",
    name: "Docker",
  },
];

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [selectedProject, setSelectedProject] = useState(null);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const { theme, toggleTheme, isDark } = useTheme();

  // Track active section for navigation and calculate underline position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "skills",
        "projects",
        "certifications",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate underline position based on active section
  useEffect(() => {
    if (navRef.current && headerRef.current) {
      const activeButton = navRef.current.querySelector(
        `[data-section="${activeSection}"]`,
      );
      if (activeButton) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        const left = buttonRect.left - headerRect.left;
        const width = buttonRect.width;

        setUnderlineStyle({
          left: `${left}px`,
          width: `${width}px`,
        });
      }
    }
  }, [activeSection, isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);

    // Hide message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const navItems = [
    { id: "about", label: "Sobre Mim", hasArrow: true },
    { id: "skills", label: "Competências" },
    { id: "projects", label: "Projetos" },
    { id: "certifications", label: "Certificações" },
    { id: "contact", label: "Contato" },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header with enhanced navigation and bottom underline */}
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out border-b border-border">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground transition-colors duration-300 ease-in-out hover:text-orange">
            {"{eli}"}
          </div>

          {/* Desktop Navigation with moving underline at bottom of header */}
          <div
            className="hidden lg:flex items-center space-x-8 relative"
            ref={navRef}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                data-section={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-xl font-bold transition-all duration-300 ease-in-out flex items-center gap-2 ${
                  activeSection === item.id
                    ? "text-orange"
                    : "text-foreground hover:text-orange"
                }`}
              >
                {item.hasArrow && (
                  <ChevronRight
                    className={`w-5 h-5 transition-all duration-300 ease-in-out ${
                      activeSection === item.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }`}
                  />
                )}
                {item.label}
              </button>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300 ease-in-out hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300 ease-in-out hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-transform duration-300 ease-in-out hover:scale-110"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Moving underline bar at bottom of header */}
        <div className="hidden lg:block relative h-1">
          <div
            className="absolute bottom-0 h-1 bg-orange transition-all duration-300 ease-in-out rounded-full"
            style={underlineStyle}
          />
        </div>

        {/* Mobile Menu with smooth animation */}
        <div
          className={`lg:hidden bg-background border-t border-border transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeSection === item.id
                    ? "text-orange font-bold"
                    : "text-foreground hover:text-orange"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section with improved spacing */}
      <section id="about" className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mobile: Image first, Desktop: Text first */}
            <div className="order-2 lg:order-1 space-y-8 lg:pr-12">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold lg:font-extrabold text-foreground leading-tight">
                HEY! EU SOU
                <br />
                ELISEU COELHO.
              </h1>
              <p className="text-xl md:text-2xl font-bold lg:font-extrabold text-orange-lighter">
                Analista de Dados & Dev Back-End
              </p>
              <p className="text-base md:text-lg lg:text-lg text-foreground leading-relaxed max-w-2xl font-light lg:font-normal opacity-90">
                Sou um desenvolvedor em formação com foco em back-end, dados e
                uma base sólida em front-end. Atuo na interseção entre
                engenharia de software e análise de dados, buscando criar
                soluções escaláveis, eficientes e com boa experiência para o
                usuário.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://linkedin.com/in/eliseucoelho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-orange rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                >
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 35 36">
                    <path d="M31.8182 0H3.18182C1.42386 0 0 1.43958 0 3.21693V32.1693C0 33.9466 1.42386 35.3862 3.18182 35.3862H31.8182C33.5761 35.3862 35 33.9466 35 32.1693V3.21693C35 1.43958 33.5761 0 31.8182 0ZM11.0632 28.9523H6.37V13.6848H11.0632V28.9523ZM8.66886 11.5021C7.15591 11.5021 5.9325 10.262 5.9325 8.73557C5.9325 7.20913 7.1575 5.97062 8.66886 5.97062C10.177 5.97062 11.4036 7.21074 11.4036 8.73557C11.4036 10.262 10.177 11.5021 8.66886 11.5021ZM28.6427 28.9523H23.9527V21.5277C23.9527 19.7568 23.9209 17.4792 21.5139 17.4792C19.0718 17.4792 18.6964 19.4077 18.6964 21.399V28.9523H14.0064V13.6848H18.5086V15.771H18.5723C19.1991 14.5711 20.7295 13.3052 23.0125 13.3052C27.7645 13.3052 28.6427 16.4675 28.6427 20.5787V28.9523Z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/eliseucoelho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-orange rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                >
                  <svg className="w-8 h-8 fill-white" viewBox="0 0 42 42">
                    <path d="M27.7197 24.36C26.2103 24.36 25.1997 25.6332 25.1997 27.72C25.1997 29.8069 25.9478 31.9594 27.7197 31.92C29.5834 31.8774 30.2561 30.053 30.2397 27.72C30.2266 25.6332 29.2258 24.36 27.7197 24.36ZM37.1795 14.3358C37.4092 13.2071 37.5077 9.21051 35.8506 5.04004C35.8506 5.04004 32.0444 5.45676 26.2891 9.40738C25.0848 9.07269 23.0406 8.90535 20.9997 8.90535C18.9587 8.90535 16.9178 9.0727 15.707 9.4041C9.955 5.45676 6.15203 5.04004 6.15203 5.04004C4.49172 9.21051 4.57375 13.1119 4.81984 14.3358C2.87078 16.4522 1.67969 18.9919 1.67969 22.4635C1.67969 37.5539 14.2009 37.7968 17.3608 37.7968C18.0761 37.7968 19.4969 37.7968 20.9997 37.8C22.5025 37.7968 23.9266 37.7968 24.6386 37.7968C27.7984 37.7968 40.3197 37.5539 40.3197 22.4635C40.3197 18.9919 39.1286 16.4522 37.1795 14.3358ZM21.1178 36.12H20.9997C13.0788 36.12 6.85094 34.9946 6.85094 27.2968C6.85094 25.4527 7.50391 23.7432 9.04938 22.3224C11.6284 19.9533 15.9892 21.2068 20.9406 21.2068C20.9603 21.2068 21.0423 21.2068 21.0588 21.2068C26.0102 21.2068 30.3742 19.9566 32.9533 22.3224C34.4987 23.7432 35.1484 25.4527 35.1484 27.2968C35.1484 34.9946 29.0387 36.12 21.1178 36.12ZM14.2797 24.36C12.7736 24.36 11.7597 26.0532 11.7597 28.14C11.7597 30.2269 12.7736 31.92 14.2797 31.92C15.7891 31.92 16.7997 30.2269 16.7997 28.14C16.7997 26.0532 15.7891 24.36 14.2797 24.36Z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-orange rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                >
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 37 38">
                    <path d="M18.5235 0C8.33639 0 0.0434503 8.37641 0.03975 18.6749C0.0378998 21.9668 0.890804 25.1806 2.50786 28.0124L0 37.4083L9.68092 35.0958C12.3803 36.5847 15.4191 37.3662 18.5126 37.3681H18.5199C28.7051 37.3681 36.9944 28.9898 37 18.6932C37.0037 13.701 35.0834 9.00742 31.594 5.47607C28.1046 1.9466 23.4672 0.00187041 18.5235 0ZM18.5199 3.74083C22.4719 3.7427 26.1858 5.30037 28.9777 8.12096C31.7696 10.9453 33.3033 14.6981 33.2996 18.6895C33.2959 26.9268 26.6682 33.6273 18.5163 33.6273C16.05 33.6254 13.607 32.9994 11.4552 31.8116L10.2085 31.1249L8.83172 31.4536L5.18918 32.3231L6.07813 28.9841L6.47925 27.4863L5.71315 26.142C4.42173 23.8825 3.73826 21.2991 3.74011 18.6749C3.74381 10.4414 10.3735 3.74083 18.5199 3.74083ZM11.9828 10.0535C11.6738 10.0535 11.1743 10.1704 10.7506 10.638C10.3269 11.1037 9.13165 12.2317 9.13165 14.5286C9.13165 16.8255 10.7867 19.0457 11.018 19.3581C11.2474 19.6685 14.2126 24.5309 18.9065 26.4013C22.8067 27.9556 23.5988 27.6489 24.4462 27.5703C25.2936 27.4937 27.18 26.4433 27.5648 25.3529C27.9496 24.2624 27.9505 23.3244 27.8358 23.1318C27.7211 22.9372 27.413 22.8212 26.9505 22.5874C26.4898 22.3536 24.2195 21.2266 23.7958 21.0714C23.3721 20.9161 23.0622 20.8376 22.7551 21.3052C22.4479 21.7728 21.5653 22.8213 21.2951 23.1318C21.025 23.4441 20.7567 23.4861 20.2942 23.2523C19.8316 23.0166 18.3444 22.5224 16.5794 20.9326C15.2065 19.6962 14.2802 18.1708 14.0101 17.7032C13.7418 17.2374 13.9848 16.9816 14.216 16.7497C14.4233 16.5402 14.675 16.2045 14.9062 15.9314C15.1357 15.6583 15.2152 15.4638 15.3688 15.1533C15.5223 14.8428 15.4437 14.5688 15.329 14.335C15.2143 14.1012 14.316 11.7958 13.9053 10.8718C13.5593 10.0956 13.1939 10.0775 12.8645 10.0644C12.5963 10.0532 12.2899 10.0535 11.9828 10.0535Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Profile Image - No hover effect, mobile first */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/bde9afb90c859831b9dc9058148bf914f23b1133?width=1440"
                alt="Eliseu Coelho"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with technology hover effects */}
      <section
        id="skills"
        className={`py-20 ${isDark ? "bg-card" : "bg-dark-section"} text-white`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold lg:font-extrabold text-center mb-16">
            Competências
          </h2>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left side: Stacked text blocks */}
              <div className="space-y-12">
                {/* Data Analysis */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                  <Database className="w-12 h-12 text-white" />
                  <div className="relative py-[20px]">
                    <div className="relative flex flex-col items-center py-[20px]">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium lg:font-normal text-center">
                      Análise de Dados
                    </h3>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-orange w-[93%] rounded-full"></div>
                    </div>
                  </div>
                  </div>
                  <div className="pl-[64px]"> {/* 48px icon + 8px gap */}
                  <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light lg:font-normal">
                    Transformo dados em decisões. Trabalho com coleta, limpeza,
                    análise e visualização de dados, extraindo insights que
                    apoiam estratégias de negócio.
                  </p>
                  </div>
                </div>

                {/* Backend Development */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                  <Code className="w-12 h-12 text-white" />
                  <div className="relative py-[20px]">
                    <div className="relative flex flex-col items-center py-[20px]">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium lg:font-normal text-center">
                      Dev Back-End
                    </h3>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-orange w-[93%] rounded-full"></div>
                    </div>
                  </div>
                  </div>
                  <div className="pl-[64px]"> {/* 48px icon + 8px gap */}
                  <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light lg:font-normal">
                    Crio e dou manutenção a APIs e sistemas robustos. Tenho foco
                    em desempenho, segurança e organização de dados, integrando
                    lógicas de negócio com bancos e serviços.
                  </p>
                  </div>
                </div>
              </div>

              {/* Right side: 3x3 technology grid with enhanced hover effects */}
              <div className="flex justify-center lg:justify-end">
                <div className="grid grid-cols-3 gap-[62px]">
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="group relative w-20 h-20 lg:w-36 lg:h-36 bg-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl cursor-pointer"
                    >
                      <img
                        src={tech.src}
                        alt={tech.alt}
                        className="w-12 h-12 lg:w-20 lg:h-20 object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-30"
                      />
                      {/* Technology name overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <span className="text-black font-bold text-xs lg:text-sm text-center px-2">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with enhanced cards and modal */}
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold lg:font-extrabold text-center text-foreground mb-16">
            Projetos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-3xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer border border-border"
                onClick={() => openProjectModal(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 lg:h-64 object-cover"
                />
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold lg:font-extrabold text-foreground mb-3">
                    {project.title}
                  </h3>

                  {/* Technology pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange/10 text-orange text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 leading-relaxed font-light lg:font-normal">
                    {project.description.substring(0, 120)}...
                  </p>

                  {/* Animated button */}
                  <button className="group bg-orange text-white px-6 py-3 rounded-full font-poppins font-semibold text-lg flex items-center gap-2 transition-all duration-300 ease-in-out hover:bg-orange/90 hover:shadow-lg relative overflow-hidden">
                    <ChevronRight className="w-5 h-5 transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                    <span className="transition-all duration-300 ease-in-out group-hover:translate-x-1">
                      Ver projeto
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out"
          onClick={closeProjectModal}
        >
          <div
            className="bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 ease-in-out scale-100 border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/90 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-background hover:scale-110 border border-border"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 lg:h-80 object-cover"
              />
            </div>

            <div className="p-8 pb-32">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {selectedProject.title}
              </h3>

              {/* Technology pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-orange/10 text-orange text-base font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
                {selectedProject.description}
              </p>
            </div>

            {/* Fixed bottom buttons */}
            <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-6 flex gap-4">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-secondary text-foreground px-6 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-secondary/80 hover:shadow-lg border border-border"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href={selectedProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-orange text-white px-6 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-orange/90 hover:shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Projeto
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Certifications Section with hover effects */}
      <section
        id="certifications"
        className={`py-20 ${isDark ? "bg-card" : "bg-dark-section"} text-white`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold lg:font-extrabold text-center mb-16">
            Certificações
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((cert) => (
              <div
                key={cert}
                className={`${isDark ? "bg-background border-border" : "bg-dark-section border-gray-500"} border-2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-orange/30`}
              >
                <div className="flex">
                  <div className="w-1/3 bg-white rounded-l-3xl flex items-center justify-center p-6">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/215381f71beda57e584ac927a1150d78f584b669?width=180"
                      alt="Oracle Certificate"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold lg:font-bold text-white mb-2">
                      Oracle Certified Associate, Java SE 8 Programmer
                    </h3>
                    <p className="text-sm lg:text-base text-white/80 italic font-light lg:font-normal">
                      Oracle
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with success message */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold lg:font-extrabold text-center text-foreground mb-4">
            Contato
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold lg:font-extrabold text-orange text-center mb-12">
            Mande-me uma mensagem!
          </p>

          <form
            onSubmit={handleContactSubmit}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="flex items-center gap-3 text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold text-foreground mb-4">
                  <User className="w-6 h-6 md:w-8 md:h-8 text-foreground/80" />
                  Seu nome
                </label>
                <input
                  type="text"
                  placeholder="Coloque seu nome"
                  className="w-full px-4 md:px-6 py-3 md:py-4 lg:py-6 rounded-xl bg-secondary text-lg md:text-xl lg:text-2xl placeholder-muted-foreground border border-border outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-orange focus:shadow-lg"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold text-foreground mb-4">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-foreground/80" />
                  Seu email
                </label>
                <input
                  type="email"
                  placeholder="Coloque seu email"
                  className="w-full px-4 md:px-6 py-3 md:py-4 lg:py-6 rounded-xl bg-secondary text-lg md:text-xl lg:text-2xl placeholder-muted-foreground border border-border outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-orange focus:shadow-lg"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold text-foreground mb-4">
                <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-foreground/80" />
                Sua mensagem
              </label>
              <textarea
                rows={6}
                placeholder="Olá, acreditamos que seu perfil pode ser ideal para um projeto de integração de sistemas que temos em andamento. Podemos marcar uma call?"
                className="w-full px-4 md:px-6 py-3 md:py-4 lg:py-6 rounded-xl bg-secondary text-lg md:text-xl lg:text-2xl placeholder-muted-foreground border border-border outline-none resize-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-orange focus:shadow-lg"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-orange text-white px-8 md:px-12 py-3 md:py-4 lg:py-6 rounded-full text-xl md:text-2xl lg:text-3xl font-medium lg:font-normal flex items-center gap-4 mx-auto transition-all duration-300 ease-in-out hover:bg-orange/90 hover:scale-105 hover:shadow-xl"
              >
                Enviar mensagem
                <Send className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            {/* Success Message */}
            <div
              className={`text-center transition-all duration-500 ease-in-out ${
                showSuccessMessage
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-6 py-3 rounded-lg inline-block">
                Mensagem enviada com sucesso
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${isDark ? "bg-card" : "bg-black"} text-white py-16 border-t border-border`}
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold lg:font-extrabold">
                {"{eli}"}
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl font-light lg:font-normal">
                Acesse meu LinkedIn para ver mais sobre minhas experiências!
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/eliseucoelho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 lg:w-16 lg:h-16 bg-orange rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 fill-white"
                    viewBox="0 0 22 22"
                  >
                    <path d="M20 0H2C0.895 0 0 0.895 0 2V20C0 21.105 0.895 22 2 22H20C21.105 22 22 21.105 22 20V2C22 0.895 21.105 0 20 0ZM6.954 18H4.004V8.508H6.954V18ZM5.449 7.151C4.498 7.151 3.729 6.38 3.729 5.431C3.729 4.482 4.499 3.712 5.449 3.712C6.397 3.712 7.168 4.483 7.168 5.431C7.168 6.38 6.397 7.151 5.449 7.151ZM18.004 18H15.056V13.384C15.056 12.283 15.036 10.867 13.523 10.867C11.988 10.867 11.752 12.066 11.752 13.304V18H8.804V8.508H11.634V9.805H11.674C12.068 9.059 13.03 8.272 14.465 8.272C17.452 8.272 18.004 10.238 18.004 12.794V18Z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/eliseucoelho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 lg:w-16 lg:h-16 bg-orange rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 fill-white"
                    viewBox="0 0 25 21"
                  >
                    <path d="M16.8478 12.3846C15.8713 12.3846 15.2174 13.2007 15.2174 14.5385C15.2174 15.8762 15.7014 17.256 16.8478 17.2308C18.0537 17.2034 18.4889 16.034 18.4783 14.5385C18.4698 13.2007 17.8223 12.3846 16.8478 12.3846ZM22.9683 5.95883C23.1169 5.23528 23.1806 2.67338 22.1085 0C22.1085 0 19.6459 0.267127 15.9222 2.79958C15.1431 2.58504 13.8205 2.47777 12.5 2.47777C11.1795 2.47777 9.85903 2.58504 9.07566 2.79748C5.35411 0.267128 2.8936 0 2.8936 0C1.81938 2.67338 1.87245 5.17428 2.03167 5.95883C0.770635 7.31551 0 8.94351 0 11.1689C0 20.8422 8.10122 20.9979 10.1456 20.9979C10.6084 20.9979 11.5277 20.9979 12.5 21C13.4723 20.9979 14.3937 20.9979 14.8544 20.9979C16.8988 20.9979 25 20.8422 25 11.1689C25 8.94351 24.2294 7.31551 22.9683 5.95883ZM12.5764 19.9231H12.5C7.37517 19.9231 3.34579 19.2016 3.34579 14.2671C3.34579 13.085 3.76826 11.9892 4.76817 11.0784C6.43682 9.5598 9.25824 10.3633 12.4618 10.3633C12.4745 10.3633 12.5276 10.3633 12.5382 10.3633C15.7418 10.3633 18.5653 9.5619 20.2339 11.0784C21.2339 11.9892 21.6542 13.085 21.6542 14.2671C21.6542 19.2016 17.7013 19.9231 12.5764 19.9231ZM8.15217 12.3846C7.17773 12.3846 6.52174 13.47 6.52174 14.8077C6.52174 16.1454 7.17773 17.2308 8.15217 17.2308C9.12874 17.2308 9.78261 16.1454 9.78261 14.8077C9.78261 13.47 9.12874 12.3846 8.15217 12.3846Z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 lg:w-16 lg:h-16 bg-orange rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 fill-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.0152 0C5.40739 0 0.028184 5.37405 0.0257838 11.9813C0.0245836 14.0933 0.577819 16.1551 1.62672 17.9719L0 24L6.27952 22.5164C8.03049 23.4716 10.0016 23.973 12.0082 23.9742H12.0129C18.6195 23.9742 23.9964 18.599 24 11.993C24.0024 8.79017 22.7568 5.77888 20.4934 3.51328C18.23 1.24888 15.2219 0.0012 12.0152 0ZM12.0129 2.4C14.5763 2.4012 16.9854 3.40056 18.7964 5.21016C20.6073 7.02216 21.6022 9.42983 21.5998 11.9906C21.5974 17.2754 17.2983 21.5742 12.0105 21.5742C10.4108 21.573 8.82615 21.1714 7.43041 20.4094L6.62174 19.9688L5.72868 20.1797L3.36595 20.7375L3.94257 18.5953L4.20275 17.6344L3.70583 16.7719C2.86815 15.3223 2.42482 13.6649 2.42602 11.9813C2.42842 6.69885 6.72877 2.4 12.0129 2.4ZM7.77263 6.45C7.57221 6.45 7.24816 6.525 6.97334 6.825C6.69851 7.1238 5.92323 7.84749 5.92323 9.32109C5.92323 10.7947 6.99678 12.2191 7.14679 12.4195C7.29561 12.6187 9.219 15.7383 12.2637 16.9383C14.7935 17.9355 15.3074 17.7387 15.857 17.6883C16.4067 17.6391 17.6302 16.9652 17.8799 16.2656C18.1295 15.566 18.1301 14.9642 18.0557 14.8406C17.9813 14.7158 17.7814 14.6414 17.4814 14.4914C17.1826 14.3414 15.7099 13.6184 15.4351 13.5188C15.1603 13.4192 14.9593 13.3688 14.76 13.6688C14.5608 13.9688 13.9883 14.6414 13.8131 14.8406C13.6378 15.041 13.4638 15.068 13.1638 14.918C12.8638 14.7668 11.8991 14.4497 10.7542 13.4297C9.86369 12.6365 9.26282 11.6578 9.0876 11.3578C8.91359 11.059 9.0712 10.8949 9.22121 10.7461C9.35562 10.6117 9.5189 10.3963 9.66891 10.2211C9.81773 10.0459 9.86933 9.92107 9.96894 9.72187C10.0686 9.52267 10.0176 9.34688 9.94316 9.19688C9.86875 9.04688 9.28606 7.5678 9.01963 6.975C8.79521 6.477 8.55818 6.46543 8.34456 6.45703C8.17055 6.44983 7.97185 6.45 7.77263 6.45Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold mb-4">
                Vamos conversar?
              </h4>
              <p className="text-lg md:text-xl lg:text-2xl font-light lg:font-normal">
                eliseucoelho2006@gmail.com
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-border mt-12 pt-8 text-center">
            <p className="text-base md:text-lg lg:text-xl font-light lg:font-normal">
              © 2025 | Projetado e desenvolvido por Eliseu Coelho | Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
