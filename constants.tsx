
import React from 'react';
import { 
  Wind, 
  Recycle, 
  Sun, 
  ShieldCheck, 
  Factory, 
  Stethoscope, 
  Database, 
  ShoppingCart, 
  Building2,
  Cpu,
  BarChart3,
  Settings
} from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Download', href: '/download' }
];

export const CORE_VERTICALS = [
  {
    id: 'hvac',
    title: 'Energy Efficient HVAC and Thermal System solution',
    description: 'Sophisticated system design, load calculation, and indoor air quality management for industrial environments.',
    icon: <Wind className="w-8 h-8 text-emerald-600" />,
    categories: [
      {
        name: 'System Design & Consulting',
        items: ['Load calculation & System design', 'Zoning & Controls strategy', 'Energy efficiency monitoring', 'Waste Heat Recovery & Thermal Integration']
      },
      {
        name: 'Installation & Retrofit',
        items: ['New Installation (RAC, Heat pumps, VRF/VRV)', 'Ductwork design & fabrication', 'Ventilation & IAQ Enhancement', 'Intelligent controls']
      },
      {
        name: 'Maintenance & Services',
        items: ['Preventive maintenance / Comprehensive AMC', '24/7 Emergency services', 'Performance checks & Safety verification']
      }
    ],
    details: ['HVAC Design', 'Energy Retrofits', 'IAQ Management'],
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ewaste',
    title: 'E-Waste Management & Recycling Solutions',
    description: 'Auto-mated recycling processes focusing on high-value recovery including Li-Ion and PCR plastic.',
    icon: <Recycle className="w-8 h-8 text-emerald-600" />,
    categories: [
      {
        name: 'Infra - Build',
        items: ['Auto and Semi-Auto Recycling facilities', 'Lithium-Ion Battery recycling', 'PCR plastic Recycling']
      },
      {
        name: 'Compliance & Certifications',
        items: ['CPCB & State pollution board coordination', 'DPR for authorization & subsidies', 'ISO, OHSAS and R2 Certification']
      },
      {
        name: 'Reverse Logistics',
        items: ['Collection of E-waste', 'Channel & Tech Development', 'Institutional procurement / bidding']
      },
      {
        name: 'Smart Infrastructure & AI Devices',
        items: ['AI-enabled Return & Refund Devices', 'Portable Recovery Devices (Anytime/Anywhere)', 'High-Accuracy Optical Sorting Conveyors']
      }
    ],
    details: ['Battery Recycling', 'Urban Mining', 'EPR Compliance'],
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'solar',
    title: 'Solar Power Solutions & Integrated Thermal Heat',
    description: 'Industrial and commercial solar systems integrated with advanced PVT heat exchangers.',
    icon: <Sun className="w-8 h-8 text-emerald-600" />,
    categories: [
      {
        name: 'Solutions & Consultancy',
        items: ['Roof Top Solar for Industrial/Commercial', 'Hybrid System design (Solar+HVAC+Thermal)', 'Integrated Heat exchangers (PVT system)']
      },
      {
        name: 'EPC Projects',
        items: ['Comprehensive Designing & Procurement', 'Large institutions (50KW to 1MW)', 'Hybrid and PVT System deployment']
      },
      {
        name: 'O&M and AMC',
        items: ['Remote performance monitoring', 'Periodic maintenance & cleaning', 'Comprehensive AMC plans']
      }
    ],
    details: ['Rooftop Solar', 'PVT Systems', 'O&M Services'],
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'quality',
    title: 'Engineering Services & Quality Process Audits',
    description: 'Expert-led manufacturing optimization and certified black belt quality control programs.',
    icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
    categories: [
      {
        name: 'Certifications & Compliances',
        items: ['NABL accreditation for HVAC Labs', 'BEE labelling & ISI certifications', 'CPCB Authorization & State board approvals']
      },
      {
        name: 'Quality Systems',
        items: ['Process mapping for Appliance production', 'Control plans for polymer manufacturing', 'Reliability tests & Product Design (RAC, CAC)']
      },
      {
        name: 'Audit & Subsidies',
        items: ['Manufacturing process audits', 'Vendor assessment & quality audits', 'DPR preparation for PLI\'s & Grants']
      }
    ],
    details: ['Process Audits', 'Black Belt Quality', 'ISI Certifications'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  }
];

export const AKHILESH_IMAGE = "input_file_0.png";
export const JEET_IMAGE = "input_file_1.png";
export const KASHIF_IMAGE = "input_file_3.png";

export const PROMOTERS = [
  {
    name: 'Akhilesh Dubey',
    experience: '30+ Years',
    bio: 'With over 30 years of engineering authority, Akhilesh has been a pivotal force in shaping quality standards for HVAC and thermal systems. His expertise extends beyond design into the rigorous application of process engineering—ensuring that manufacturing lines deliver zero-defect output. He has led complex solar thermal projects and defined quality protocols that are now industry benchmarks, making him the technical conscience of our engineering operations.',
    image: AKHILESH_IMAGE,
    specialties: ['Quality Engineering', 'Manufacturing Process', 'Solar Thermal'],
    quote: "Quality engineering is not an act, it is a habit of precision that defines industrial longevity."
  },
  {
    name: 'Jeet Sarma',
    experience: '25+ Years',
    bio: 'Jeet brings 25+ years of strategic innovation to the table, bridging the gap between product engineering and lifecycle management. His career has been defined by a dual focus: optimizing high-performance HVAC systems and pioneering sustainable supply chains. He doesn\'t just manage operations; he re-engineers them for circularity, ensuring that P&L accountability aligns perfectly with E-waste recovery and responsible manufacturing.',
    image: JEET_IMAGE,
    specialties: ['Product Design', 'Manufacturing', 'E-waste Recycling'],
    quote: "Sustainable engineering is about re-engineering industrial physics into performance assets."
  },
  {
    name: 'Kashif Kamran',
    experience: '10+ Years',
    bio: 'In a decade of high-impact operations, Kashif has mastered the intricate logistics of the circular economy. His expertise spans the full spectrum of the supply chain—from the technical execution of HVAC projects to the regulatory complexities of E-waste management. With a deep command of EPR compliance and ERP systems, he orchestrates the movement of critical resources, ensuring seamless alignment between regulatory frameworks and operational realities.',
    image: KASHIF_IMAGE,
    specialties: ['HVAC Projects', 'Supply Chain', 'E-waste Recycling'],
    quote: "Supply chain resilience allows us to close the loop between consumption and recovery effectively."
  }
];

export const OBJECTIVES = [
  {
    title: 'Renewable Energy',
    items: [
      'Integrated Solar solutions',
      'EPC solutions for Solar',
      'Solar Thermal Solution',
      'AMC for Solar plant'
    ]
  },
  {
    title: 'Recycling (EPR /Urban Mining)',
    items: [
      'E Waste plant design & Infra build',
      'Recycling Compliances',
      'Commodity value addition',
      'EPR contracts and supply chain'
    ]
  },
  {
    title: 'Engineering / HVAC / Process',
    items: [
      'HVAC projects',
      'Supply Chain Value Optimization',
      'Comprehensive Quality and process Solutions',
      'Commercial Quality & Process Enablement'
    ]
  }
];

export const INDUSTRIES = [
  {
    id: 'pharma',
    name: 'Pharmaceuticals',
    icon: <Stethoscope className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1200',
    description: 'Precision climate control and high-purity environment engineering for sterile manufacturing.',
    solutions: [
      { vertical: 'HVAC', title: 'Cleanroom HVAC & Process Cooling', detail: 'Class 100/1000 compliance with strict humidity/temp stability.' },
      { vertical: 'Quality', title: 'NABL & ISO Readiness', detail: 'Technical documentation for global manufacturing audits.' },
      { vertical: 'E-Waste', title: 'Lab Equipment Recycling', detail: 'Compliant disposal of sensitive electronic diagnostic assets.' }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Industrial Manufacturing',
    icon: <Factory className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    description: 'Holistic decarbonization frameworks for heavy production lines and factory infrastructure.',
    solutions: [
      { vertical: 'Solar', title: 'Process Heat & Rooftop Solar', detail: 'Solar thermal integration for boiler feed and process heating.' },
      { vertical: 'HVAC', title: 'Waste Heat Recovery', detail: 'Capturing industrial exhaust heat to drive HVAC efficiency.' },
      { vertical: 'E-Waste', title: 'Urban Mining for OEMs', detail: 'Circular resource loops for internal production scrap.' }
    ]
  },
  {
    id: 'datacenters',
    name: 'Data Centers',
    icon: <Database className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200',
    description: 'Optimizing PUE and managing the critical lifecycle of high-density battery assets.',
    solutions: [
      { vertical: 'HVAC', title: 'Advanced Thermal Management', detail: 'Precision cooling retrofits and energy-efficiency monitoring.' },
      { vertical: 'E-Waste', title: 'Li-Ion UPS Recycling', detail: 'High-purity recovery of Lithium-Ion battery arrays from UPS units.' },
      { vertical: 'Quality', title: 'Reliability & Uptime Audits', detail: 'Technical certification for mission-critical cooling infrastructure.' }
    ]
  },
  {
    id: 'oems',
    name: 'OEM Brands',
    icon: <Cpu className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    description: 'Complete EPR sovereignty and vendor quality engineering for global durable brands.',
    solutions: [
      { vertical: 'E-Waste', title: 'EPR Compliance & Reverse Logistics', detail: 'End-to-end take-back programs and regulatory reporting.' },
      { vertical: 'Quality', title: 'Vendor & Process Audits', detail: 'Manufacturing quality control mapping for supply chain partners.' },
      { vertical: 'Engineering', title: 'Product Design Optimization', detail: 'Engineering for circularity and end-of-life disassembly.' }
    ]
  }
];

export const BRAND_SOLUTIONS = [
  {
    title: 'Technical Consulting',
    desc: 'Expert-led audits for HVAC, Solar, and Process heat optimization.',
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    title: 'Turnkey Implementation',
    desc: 'End-to-end project management from design to commissioning.',
    icon: <Settings className="w-6 h-6" />
  },
  {
    title: 'Compliance Sovereignty',
    desc: 'Navigating CPCB, EPR, and environmental regulations with ease.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: 'Resource Recovery',
    desc: 'Circular economy solutions for e-waste and industrial scrap.',
    icon: <Recycle className="w-6 h-6" />
  }
];
