import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ProjectsUpdated } from './components/ProjectsUpdated';
import { ProjectDetail } from './components/ProjectDetail';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

interface Project {
  id: number;
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
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'project'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProject(null);
    window.scrollTo(0, 0);
  };

  const handleNavigate = (section: string) => {
    if (currentView === 'project') {
      handleBackToHome();
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onNavigate={handleNavigate} />
      
      {currentView === 'home' ? (
        <main>
          <Hero />
          <About />
          <Skills />
          <ProjectsUpdated onProjectClick={handleProjectClick} />
          <Experience />
          <Contact />
        </main>
      ) : (
        selectedProject && (
          <ProjectDetail project={selectedProject} onBack={handleBackToHome} />
        )
      )}
      
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
