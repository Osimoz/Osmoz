// Common types used across the application
export interface Amenity {
  icon: React.FC<{ className?: string }>;
  label: string;
}

export interface Image {
  url: string;
  alt: string;
}

// Constants
export const TYPEFORM_URL = "https://qcwzpyu0fgi.typeform.com/to/pK7k123c";