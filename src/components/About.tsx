import { motion } from 'motion/react';
import { Code2, Palette, Rocket, Users } from 'lucide-react';
import { Card } from './ui/card';

export function About() {
  const highlights = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code',
    },
    {
      icon: Palette,
      title: 'Modern Design',
      description: 'Creating beautiful user interfaces',
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Optimizing for speed and efficiency',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively in teams',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 top-1/2 left-1/4 bg-accent/10 rounded-full blur-3xl"></div>
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
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold">
              Full Stack Developer with a passion for innovation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm a dedicated Full Stack Developer with expertise in building modern web applications 
              from the ground up. My journey in technology began with a curiosity about how things work, 
              which evolved into a passion for creating solutions that make a difference.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With strong skills in <span className="text-primary">HTML, CSS, JavaScript, React,</span> and 
              <span className="text-primary"> Node.js</span>, I specialize in developing scalable applications 
              with exceptional user experiences. I'm equally comfortable working on the frontend with modern 
              frameworks or diving into backend development with <span className="text-primary">Express, MongoDB,</span> and 
              <span className="text-primary"> SQL</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My approach combines technical expertise with creative problem-solving, ensuring that every 
              project I work on is not just functional, but also intuitive and visually appealing. I'm 
              constantly learning new technologies and best practices to stay at the forefront of web development.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
