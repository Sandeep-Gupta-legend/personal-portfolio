import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { Card } from './ui/card';

export function Experience() {
  const timeline = [
    {
      type: 'education',
      title: 'SSC - St. Joseph English High School, Uttan',
      organization: 'St. Joseph English High School, Uttan',
      period: '2021 - 2022',
      description: 'Secondary School Certificate completed with 74% marks.',
      achievements: [
        'Percentage: 74%'
      ],
    },
    {
      type: 'education',
      title: 'HSC - St. Joseph Junior College, Uttan (Science)',
      organization: 'St. Joseph Junior College, Uttan',
      period: '2023 - 2024',
      description: 'Higher Secondary Certificate, Science stream, completed with 56% marks.',
      achievements: [
        'Percentage: 56%'
      ],
    },
    {
      type: 'education',
      title: 'Diploma In Computer Engineering',
      organization: 'VIVA INSTITUTE OF TECHNOLOGY, VIRAR',
      period: '2020 - 2024',
      description: 'Focused on software engineering, algorithms, data structures, and full-stack web development. Graduated with honors.',
      achievements: [
        'CGPA: 8.7/9.5',
        'Dean\'s List 2022-2024',
        'Led final year project on AI-powered web applications',
      ],
    },
    {
      type: 'work',
      title: 'Freelance Web Developer',
      organization: 'Self-Employed',
      period: '2023 - Present',
      description: 'Creating custom web solutions for clients across various industries. Specializing in React applications and modern UI/UX.',
      achievements: [
        'Completed 15+ projects successfully',
        '100% client satisfaction rate',
        'Built long-term partnerships with 5 clients',
      ],
    },
    {
      type: 'education',
      title: 'Web Development Certification',
      organization: 'Online Learning Platform',
      period: '2022',
      description: 'Comprehensive full-stack web development course covering modern technologies and best practices.',
      achievements: [
        'Completed 200+ hours of coursework',
        'Built 10 portfolio projects',
        'Earned advanced certification',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 top-1/3 right-1/3 bg-primary/10 rounded-full blur-3xl"></div>
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
            Experience & <span className="text-primary">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background in technology and software development
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                    item.type === 'education'
                      ? 'bg-gradient-to-r from-primary to-cyan-400'
                      : 'bg-gradient-to-r from-accent to-blue-600'
                  } ring-4 ring-background z-10`}
                ></div>

                {/* Icon */}
                <div
                  className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1 w-16 h-16 rounded-full ${
                    item.type === 'education'
                      ? 'bg-gradient-to-r from-primary to-cyan-400'
                      : 'bg-gradient-to-r from-accent to-blue-600'
                  } flex items-center justify-center shadow-lg z-20`}
                >
                  {item.type === 'education' ? (
                    <GraduationCap className="h-8 w-8 text-white" />
                  ) : (
                    <Briefcase className="h-8 w-8 text-white" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`ml-24 md:ml-0 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.period}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                    <p className="text-lg text-muted-foreground mb-3">{item.organization}</p>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
