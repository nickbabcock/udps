export interface RawIncident {
  id: string;
  arrest?: string;
  date: string;
  disposition: string;
  description: string;
  location: string;
  narrative: string;
  status: string;
}

export interface ReportedIncident {
    id: string;
    arrest?: string;
    date: Date;
    disposition: string;
    description: string;
    location: string;
    narrative: string;
    status: string;
  }
  