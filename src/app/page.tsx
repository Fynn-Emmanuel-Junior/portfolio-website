'use client';

import React, { useState,useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Star, Twitter, Linkedin, Github, Code, Briefcase, Mail } from 'lucide-react';
import Image1 from '../assets/4.jpg';
import port1 from '../assets/portfolio1.png';
import port2 from '../assets/portfolio2.png';
import port3 from '../assets/portfolio3.png';
import port4 from '../assets/port4.jpg';
import port5 from '../assets/port5.png';
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";

// --- Animation Variants ---
const fadeIn = (direction = 'up', delay = 0):  Variants => ({
  initial: {
    y: direction === 'up' ? 40 : -40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
});

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// --- Reusable Components ---
const SectionWrapper = ({ children, id, className = '' }: any) => (
  <motion.section
    id={id}
    className={`py-20 md:py-28 px-6 container mx-auto ${className}`}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.1 }}
    variants={staggerContainer}
  >
    {children}
  </motion.section>
);

// --- Header Component ---
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['About', 'Skills', 'Projects', 'Testimonials', 'Contact'];

  // Function to handle smooth scrolling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80; // Adjust this based on your fixed header's height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Close mobile menu on click
  };

  return (
    <header className="fixed font-plus top-0 left-0 right-0 backdrop-blur-lg bg-slate-900/80 z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
       <a href="/" className='cursor-pointer'> <h1 className="text-xl font-bold text-white">Fynn Emmanuel Junior</h1></a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={(e) => handleLinkClick(e,link.toLowerCase())} className="text-gray-300 hover:text-teal-400 transition-colors">{link}</a>
          ))}
        </nav>
        <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-300">
          <Menu size={28} />
        </button>
      </div>
      {/* <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40 border-red-600 border-2"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed -top-10 -right-10 h-full w-3/4 max-w-sm  p-8"
          >
            <div className='bg-slate-800 h-[1000px]'>
              <div className='flex flex-col items-end pr-10'>
                <button onClick={() => setIsOpen(false)} className=" text-gray-400  py-12">
                  <X size={28} />
                </button>
              </div>
              <nav className="flex flex-col gap-9 font-plus pl-5">
                {navLinks.map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-white hover:text-teal-400 transition-colors">{link}</a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero Section ---
const HeroSection = () => (
  <section className="relative bg-slate-900 text-white pt-32 pb-20 md:pt-48 md:pb-28 font-plus">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <motion.h1 variants={fadeIn('up')} className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                Full-Stack & Mobile App Developer
            </motion.h1>
            <motion.p variants={fadeIn('up', 0.2)} className="text-lg md:text-xl max-w-xl text-gray-300 mb-8">
                Crafting robust, scalable, and user-centric applications from concept to deployment.
            </motion.p>
            <motion.div variants={fadeIn('up', 0.4)} className="flex items-center space-x-4">
                <a href="#projects" className="bg-teal-500 text-white px-8 py-3 rounded-md font-bold text-lg shadow-lg hover:bg-teal-600 transition-all">View My Work</a>
                <a href="#contact" className="border-2 border-gray-500 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-700 hover:border-gray-700 transition-all">Contact Me</a>
            </motion.div>
        </motion.div>
        <motion.div variants={fadeIn()} className="relative">
            <div className="absolute inset-0 bg-teal-500/10 rounded-3xl transform -rotate-6"></div>
            <Image 
                src={Image1} 
                alt="Fynn Emmanuel Junoir"
                width={500}
                height={500}
                className="rounded-2xl shadow-2xl relative"
            />
        </motion.div>
    </div>
  </section>
);

// --- About Me Section ---
const AboutMeSection = () => (
  <SectionWrapper id="about" className="bg-slate-800 text-white font-plus">
    <motion.h2 variants={fadeIn()} className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</motion.h2>
    <div className="max-w-4xl mx-auto text-center">
        <motion.p variants={fadeIn()} className="text-xl text-gray-300 leading-relaxed">
            I am a passionate developer with a strong foundation in both front-end and back-end development, bringing a holistic approach to every project. My expertise spans across various platforms and technologies, allowing me to design, build, and deploy high-performance web and mobile applications. I am committed to continuous learning and staying up-to-date with the latest industry trends and cutting-edge solutions.
        </motion.p>
    </div>
  </SectionWrapper>
);

// --- Skills Section ---
const skills = ['React', 'React Native', 'Next.js','Figma', 'Node.js', 'PostgreSQL', 'MongoDB', 'NestJS', 'AWS', 'Knex','Tailwind CSS','Framer motion','ChartJS', 'TypeScript','Python','Django', 'HTML', 'CSS','Javascript','Redux Toolkits','Expo','EAS','Flutter', 'AI Integration','Digital Ocean'];
const SkillsSection = () => (
    <SectionWrapper id="skills" className="font-plus">
        <motion.h2 variants={fadeIn()} className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Core Technologies</motion.h2>
        <motion.div variants={staggerContainer} className="flex flex-wrap gap-4 justify-center">
            {skills.map(skill => (
                <motion.div key={skill} variants={fadeIn()} className="bg-white text-gray-800 px-6 py-3 rounded-md font-semibold text-lg shadow-md border border-gray-200">
                    {skill}
                </motion.div>
            ))}
        </motion.div>
    </SectionWrapper>
);

// --- Projects Section ---
const projects = [
  { title: 'Portfolio website', description: 'Next js, EmailJS,Tailwind css,Typescript,Framer motion', image: port1,link: 'https://fynn-dev.vercel.app/',github: 'https://github.com/Fynn-Emmanuel-Junior/portfolio-website'},
  { title: 'GoVibe Website', description: 'Next js, Tailwind css,typescript,Framer motion', image: port2,link: 'https://govibe-six.vercel.app/',github: 'https://github.com/GoVibee/landing-page' },
  { title: 'Kodo Scholarships', description: 'React JS,Tailwind CSS,Redux,Node JS,Express JS,Mongo DB,Tawk Chatbot,Digital Ocean', image: port3,link: 'https://kodo-web-eta.vercel.app/',github: 'https://github.com/Kodo-UG/kodo-web' },
  { title: 'Kodo Scholarships Mobile App ', description: 'React Native JS,Expo and EAS,App store connect,Playstore,Expo notifications, Async Storage, Expo Server,Node JS,Express JS,Mongo DB,Digital Ocean', image: port5,link: 'https://apps.apple.com/app/id6745784862',github: 'https://github.com/Kodo-UG/kodo-mobile-app'},
];
const ProjectsSection = () => (
    <SectionWrapper id="projects" className="bg-white font-plus">
        <motion.h2 variants={fadeIn()} className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Featured Projects</motion.h2>
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map(project => (
                <motion.div key={project.title} variants={fadeIn()} className="bg-white rounded-lg shadow-lg overflow-hidden group border border-gray-200 hover:-translate-y-2 transition-transform duration-300">
                    <div className="relative h-56 bg-gray-100 flex items-center justify-center">
                        <Image 
                          src={project.image}
                          className='w-full h-full'
                          alt='project-image'
                          priority
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex space-x-4">
                            <a href={project.link} className="text-teal-600 font-semibold hover:underline">Live Demo</a>
                            <a href={project.github} className="text-teal-600 font-semibold hover:underline">GitHub</a>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </SectionWrapper>
);

// --- Testimonials Section ---
const testimonials = [
    { name: 'Sophia Carter', stars: 5, quote: 'Fynn’s work on our project was exceptional. His technical skills and attention to detail ensured a smooth and successful launch. We would absolutely partner with him again.' },
    { name: 'Ethan Bennett', stars: 5, quote: 'Fynn is a highly efficient developer who consistently delivers high-quality work. His ability to understand complex requirements and translate them into functional code is remarkable.' },
];
const TestimonialsSection = () => (
    <SectionWrapper id="testimonials" className="font-plus">
        <motion.h2 variants={fadeIn()} className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">What Clients Say</motion.h2>
        <motion.div variants={staggerContainer} className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            {testimonials.map(t => (
                <motion.div key={t.name} variants={fadeIn()} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center mb-4">
                        <Image src={Image1} alt={t.name} width={48} height={48} className="rounded-full mr-4" />
                        <div>
                            <h4 className="font-bold text-gray-800">{t.name}</h4>
                            <div className="flex">
                                {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 italic">&quot;{t.quote}&quot;</p>
                </motion.div>
            ))}
        </motion.div>
    </SectionWrapper>
);

// --- Contact Section ---
const ContactSection = () => {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const form = e.target as HTMLFormElement;
    
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      form,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then(() => {
      toast.success('Message sent successfully!');
      form.reset();
    })
    .catch((error) => {
      toast.error('Failed to send message: ' + error.text);
    })
    .finally(() => {
      setIsSending(false);
    });
  };

  return (
    <SectionWrapper id="contact" className="bg-white font-plus">
        <Toaster position="top-right" reverseOrder={false} />
      <motion.h2 variants={fadeIn()} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        Let&apos;s Build Together
      </motion.h2>
      <motion.p variants={fadeIn(undefined, 0.2)} className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Have a project in mind? I&apos;d love to hear about it. Fill out the form below or send me an email.
      </motion.p>
      <motion.form 
        onSubmit={handleSubmit}
        variants={fadeIn()} 
        className="max-w-xl mx-auto space-y-4"
      >
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input 
            type="text" 
            id="name" 
            name="from_name"
            placeholder="Your Name" 
            className="mt-1 block w-full px-4 py-3 bg-gray-100 text-black border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input 
            type="email" 
            id="email" 
            name="from_email"
            placeholder="Your Email" 
            className="mt-1 block w-full px-4 py-3 bg-gray-100 text-black border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea 
            id="message" 
            name="message"
            rows={4} 
            placeholder="Your Message" 
            className="mt-1 block w-full px-4 py-3 text-black bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          disabled={isSending}
          className="w-full bg-teal-500 text-white py-3 px-4 rounded-md font-semibold hover:bg-teal-600 transition-colors disabled:opacity-70 cursor-pointer"
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
      </motion.form>
    </SectionWrapper>
  );
};

// --- Footer ---
const Footer = () => (
    <footer className="bg-slate-900 text-gray-400 font-plus">
        <div className="container mx-auto px-6 py-8 text-center">
            <div className="flex justify-center space-x-6 mb-4">
                {/* <a href="#" className="hover:text-teal-400"><Twitter /></a> */}
                <a href="#" className="hover:text-teal-400"><Linkedin /></a>
                <a href="#" className="hover:text-teal-400"><Github /></a>
            </div>
            <p>&copy; 2025 Fynn Emmanuel Junior. All rights reserved.</p>
        </div>
    </footer>
);


// --- Main Page Component ---
export default function PortfolioPage() {
  return (
    <div className={`bg-gray-100`}>
      <Header />
      <main>
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}