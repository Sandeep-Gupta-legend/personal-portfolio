import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { analyticsApi } from '../lib/api';
import { config } from '../lib/config';

interface ProjectDetailProps {
  project: {
    title: string;
    description: string;
    image: string;
    tech: string[];
    github: string;
    live: string;
    gradient: string;
    fullDescription: string;
    features: string[];
    challenges: string[];
    date: string;
  };
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  // Track project view when component mounts
  useEffect(() => {
    if (config.features.enableAnalytics) {
      const projectId = project.title.toLowerCase().replace(/\s+/g, '-');
      analyticsApi.trackProjectView(projectId, project.title);
    }
  }, [project.title]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="border-primary/20 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Code2 className="h-5 w-5 text-primary" />
              <span>{project.tech.length} Technologies</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              asChild
            >
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                View Live Demo
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/20 hover:bg-primary/10"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View Source Code
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-auto"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-10`}></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10">
              <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-base"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 h-full">
              <h3 className="text-2xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 h-full">
              <h3 className="text-2xl font-bold mb-4">Challenges & Solutions</h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-accent mt-1">▸</span>
                    <span className="text-muted-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Full Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/10">
            <h3 className="text-2xl font-bold mb-4">About This Project</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {project.fullDescription}
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
