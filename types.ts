
export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  image: string;
}

export interface Promoter {
  name: string;
  experience: string;
  bio: string;
  image: string;
  specialties: string[];
}

export interface Industry {
  name: string;
  icon: string;
  description: string;
}
