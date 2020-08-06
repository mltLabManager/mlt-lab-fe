/// <reference types="react-scripts" />
interface TableRow {
  id: string;
  oldId: string;
  vendor: string;
  location: number | null;
  status: number | null;
  lastUpdate: Date;
  type: number | null;
  model: string;
  donatedBy: string;
  enteringDate: Date;
  deliveryDate: Date;
  destination: String;
  cpu: number | null;
  ram: number | null;
  sdd: number | null;
  imageInstall: boolean;
  histories: History[];
}

interface History {
  id: number;
  userId: string;
  date: Date;
  from: string;
  to: string;
}

interface Parameter {
  id: number;
  type: number;
  value: string;
}

interface Search {
  isOpen: boolean;
  text: string;
}

interface RootState {
  userId: string;
  computers: TableRow[];
  parameters: Parameter[];
  search: Search;
}
