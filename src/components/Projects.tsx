import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const projects = [
    {
      title: 'Weather Application',
      description: 'Modern weather app with real-time forecasts, interactive maps, and detailed weather analytics using OpenWeather API.',
      image: 'https://images.unsplash.com/photo-1705077031869-51b60754302a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc2MDIyMTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React', 'API Integration', 'Tailwind CSS'],
      github: 'https://github.com/Sandeep-Gupta-legend/weather-app',
      live: 'https://weather-app-nine-liart-66.vercel.app/',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Note Taking App',
      description: 'Feature-rich note-taking application with markdown support, categories, search functionality, and cloud sync.',
      image: 'https://images.unsplash.com/photo-1615477618234-c79fcdf30fe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlJTIwdGFraW5nJTIwYXBwfGVufDF8fHx8MTc2MDExMDcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React', 'Firebase', 'JavaScript', 'CSS'],
      github: 'https://github.com/Sandeep-Gupta-legend/Note',
      live: 'https://note-chi-eight.vercel.app/',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Sneaker Store',
      description: 'E-commerce sneaker store with product catalog, shopping cart, and checkout functionality with modern UI design.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwc3RvcmV8ZW58MXx8fHwxNzYwMTkyNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React', 'Tailwind CSS', 'JavaScript'],
      github: 'https://github.com/Sandeep-Gupta-legend/sneaker-store',
      live: 'https://sneaker-store-cyan.vercel.app/',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      title: 'Modern Restaurant',
      description: 'Beautiful restaurant website with menu showcase, reservation system, and location details with responsive design.',
      image: 'https://images.unsplash.com/photo-1504674900568-db9d16f9263b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50fGVufDF8fHx8MTc2MDE5MjUyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React', 'Tailwind CSS', 'Motion'],
      github: 'https://github.com/Sandeep-Gupta-legend/modern-restaaurant',
      live: 'https://modern-restaaurant.vercel.app/',
      gradient: 'from-red-500 to-orange-600',
    },
    {
      title: 'Image Viewer',
      description: 'Interactive image viewer application with zoom, pan, and gallery navigation features for seamless image browsing.',
      image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbWFnZSUyMHZpZXdlcnxlbnwxfHx8fDE3NjAxOTI1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React', 'JavaScript', 'CSS'],
      github: 'https://github.com/Sandeep-Gupta-legend/image-viewer',
      live: 'https://image-viewer-omega.vercel.app/',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'Smart Farm Village',
      description: 'Comprehensive web platform for smart farming solutions featuring real-time monitoring, crop management, and weather integration.',
      image: 'https://images.unsplash.com/photo-1722119272044-fc49006131e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MDE3NTQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/Sandeep-Gupta-legend/smart-farm-village-updated',
      live: 'https://smart-farm-village-updated.vercel.app/',
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bottom-1/4 left-1/3 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience in web development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group h-full flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/20 hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View More on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
