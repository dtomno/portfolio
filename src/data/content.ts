import reactIcon from '../assets/react-icon.svg'
import tsIcon from '../assets/typescript-icon.svg'
import nodeIcon from '../assets/node-icon.svg'
import springIcon from '../assets/spring-boot.svg'
import flutterIcon from '../assets/flutter-icon.svg'

import ekedc1 from '../assets/ekedc-1.jpg'
import ekedc2 from '../assets/ekedc-2.jpg'
import ekedc3 from '../assets/ekedc-3.jpg'
import wo1 from '../assets/work-orders-1.jpg'
import wo2 from '../assets/work-orders-2.jpg'
import wo3 from '../assets/work-orders-3.jpg'
import wo4 from '../assets/work-orders-4.jpg'
import wo5 from '../assets/work-orders-5.jpg'
import wo6 from '../assets/work-orders-6.jpg'
import wo7 from '../assets/work-orders-7.jpg'
import wo8 from '../assets/work-orders-8.jpg'
import edm from '../assets/enterprise-doc-mgmt.png'
import intune1 from '../assets/intune-1.jpg'
import intune2 from '../assets/intune-2.jpg'
import intune3 from '../assets/intune-3.jpg'
import intune4 from '../assets/intune-4.jpg'
import intune5 from '../assets/intune-5.jpg'
import intune6 from '../assets/intune-6.jpg'
import intune7 from '../assets/intune-7.jpg'
import intune8 from '../assets/intune-8.jpg'
import lec1 from '../assets/lec-1.jpg'
import lec2 from '../assets/lec-2.jpg'
import lec3 from '../assets/lec-3.jpg'
import lec4 from '../assets/lec-4.jpg'
import lendstream1 from '../assets/lendstream1.png'
import lendstream2 from '../assets/lendstream2.png'
import kikobas1 from '../assets/kikobas1.png'
import kikobas2 from '../assets/kikobas2.png'
import kikobas3 from '../assets/kikobas3.png'
import kikobas4 from '../assets/kikobas4.png'

export const PROFILE = {
  name: 'Dennis Tomno',
  role: 'Software Engineer',
  location: 'Nairobi, Kenya',
  email: 'deni.tomno@gmail.com',
  phone: '+254790460645',
  resume:
    'https://www.dropbox.com/scl/fi/pqi3bpyp7obd7axronfgj/Dennis_Tomno_Resume.pdf?rlkey=x5soybgaqz3mwb23xgoiuwmv9&raw=1',
  tagline:
    'I build scalable mobile and web applications — architecting solutions that have served 500K+ users, with a focus on performance and the details users feel.',
}

export const ABOUT = [
  "I'm a software engineer specializing in building scalable mobile and web applications. I've architected solutions serving 500K+ users, with a focus on performance optimization and exceptional user experiences.",
  'I thrive in fast-paced environments where I can solve complex technical challenges. Whether it’s squeezing out performance or standing up new architectures, I love creating things that make a real impact.',
  "I'm always excited to collaborate with talented teams and contribute to products that people love. Let's build something great together.",
]

export const STATS = [
  { value: '500K+', label: 'users served' },
  { value: '6+', label: 'shipped products' },
  { value: '40%', label: 'connections lifted at EKEDC' },
  { value: '50%', label: 'faster field load times' },
]

export type SkillGroup = { category: string; items: { name: string; icon: string; href: string }[] }

export const SKILLS: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: reactIcon, href: 'https://react.dev/' },
      { name: 'TypeScript', icon: tsIcon, href: 'https://www.typescriptlang.org/' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: nodeIcon, href: 'https://nodejs.org/' },
      { name: 'Spring Boot', icon: springIcon, href: 'https://spring.io/projects/spring-boot' },
    ],
  },
  {
    category: 'Mobile',
    items: [
      { name: 'Flutter', icon: flutterIcon, href: 'https://flutter.dev/' },
      { name: 'React Native', icon: reactIcon, href: 'https://reactnative.dev/' },
    ],
  },
]

export const TICKER = [
  'React',
  'React Native',
  // 'TypeScript',
  'Node.js',
  'Spring Boot',
  'Flutter',
  'Dart',
  'Angular',
  'Kafka',
  'Docker',
  // 'Offline-First',
  'PostgreSQL',
  'Oracle DB',
  // 'Firebase',
  'System Design',
]

export type Project = {
  id: string
  index: string
  title: string
  year: string
  summary: string
  description: string
  tags: string[]
  images: string[]
  links: { label: string; href: string }[]
  status?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'kikobas',
    index: '01',
    title: 'Kikobas',
    year: '2026 - Present',
    summary: 'A full-featured digital platform for Kenyan savings groups (chamas), expanding to East Africa.',
    description:
      "A full-featured digital platform for Kenyan savings groups (chamas), expanding to East Africa. Replaces WhatsApp threads and Excel sheets with transparent, auditable tools for contributions, loans, fines, merry-go-round, investments, dividends, meetings, a welfare fund, documents, bank/mobile-money statement reconciliation, and an AI-powered Chama Advisor.",
    tags: ['Next.js', 'TypeScript', 'React Native', 'Docker'],
    images: [kikobas1, kikobas2, kikobas3, kikobas4],
    status: 'In Testing',      
    links: [
      // { label: 'GitHub', href: 'https://github.com/dtomno/kikobas' },
      { label: 'Live demo', href: 'https://staging.kikobas.com' },
    ],
  },  
  {
    id: 'ekedc-portal',
    index: '02',
    title: 'EKEDC Customer Self-Service',
    year: '2024 - 2025',
    summary: 'A customer-facing web app serving 500K+ users for Nigeria’s Eko Electricity Distribution Company.',
    description:
      "Collaborated with a cross-functional team to build responsive interfaces for power connection applications, billing management, and transaction history. Improved service delivery and increased new electricity connections by 40%.",
    tags: ['Angular', 'Spring Boot', 'OracleDB'],
    images: [ekedc1, ekedc2, ekedc3],  
    links: [/*{ label: 'Live site', href: 'https://webportal.ekedc.com' }*/],
  },
  {
    id: 'ekedc-field',
    index: '03',
    title: 'EKEDC Field Technician App',
    year: '2024 - 2025',
    summary: 'An offline-first React Native app for 500+ field technicians working in low-connectivity environments.',
    description:
      'Architected and rebuilt the mobile app for managing work orders offline. Implemented an offline-first architecture with smart data caching, cutting load times by 50% and significantly improving field productivity — real-time job tracking, offline persistence, and seamless sync when connectivity returns.',
    tags: ['React Native', 'TypeScript', 'Offline-First'],
    images: [wo1, wo2, wo3, wo4, wo5, wo6, wo7, wo8],
    links: [],
  },
  {
    id: 'enterprise-doc',
    index: '04',
    title: 'Enterprise Document Pipeline',
    year: '2024',
    summary: 'An enterprise-grade document management and automation pipeline integrating SharePoint with legacy systems.',
    description:
      'Designed a multi-stage, cross-platform workflow to ingest, batch, and process customer bills, service requests, and uploaded media from distributed sources into a centralized repository. Built parallelized upload processing with fault tolerance, resumability, and automated cleanup — slashing document retrieval time and eliminating manual file handling.',
    tags: ['PowerShell', 'Linux', 'SharePoint API', 'Jenkins'],
    images: [edm],
    links: [],
  },
  {
    id: 'lendstream',
    index: '05',
    title: 'LendStream',
    year: '2024',
    summary: 'An event-driven loan-processing prototype that automates the entire application workflow.',
    description:
      "Built interconnected modules that evaluate loan requests, manage approvals, and process payments while communicating over an event bus. Designed for reliability and transparency, with real-time monitoring that tracks each loan from submission to funding, handling concurrent requests without sacrificing data integrity.",
    tags: ['Node.js', 'React', 'Docker', 'Apache Kafka'],
    images: [lendstream1, lendstream2],
    links: [
      { label: 'GitHub', href: 'https://github.com/dtomno/lendstream' },
      { label: 'Live demo', href: 'https://lendstream.vercel.app' },
    ],
  },  
  {
    id: 'intune',
    index: '06',
    title: 'Intune — Guitar Utility App',
    year: '2025 - Present',
    summary: 'A cross-platform tuner, chord library, and metronome for musicians, built with Flutter.',
    description:
      'Implemented real-time audio processing and frequency-detection algorithms for accurate pitch recognition. Ships an extensive chord library and metronome, built for Web and Android with a focus on responsive UI and smooth performance. iOS version in development.',
    tags: ['Flutter', 'Dart'],
    images: [intune1, intune2, intune3, intune4, intune5, intune6, intune7, intune8],
    status: 'Internal testing',
    links: [
      { label: 'Web app', href: 'https://intune-becf1.web.app' },
      { label: 'Android test', href: 'https://play.google.com/apps/internaltest/4701410843509685149' },
    ],
  },
  {
    id: 'lec-portal',
    index: '07',
    title: 'LEC Customer Portal Integrations',
    year: '2023 - Present',
    summary: 'Key feature work for Liberia Electricity Corporation’s customer portal.',
    description:
      'Integrated the web portal with an ERP system so field and office staff get convenient access to payslips. Added email and SMS integration for automated communication of billing and service updates.',
    tags: ['Spring Boot', 'MS-SQL', 'Dynamics AIF'],
    images: [lec1, lec2, lec3, lec4],
    links: [{ label: 'Live site', href: 'https://portal.lecliberia.com' }],
  }
]

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dennis-tomno' },
  { label: 'GitHub', href: 'https://github.com/dtomno/' },
  { label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=254790460645&text=Hello+Dennis' },
]

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]
