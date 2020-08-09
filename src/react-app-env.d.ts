/// <reference types="react-scripts" />
interface TableRow {
  id: string;
  oldId: string;
  provider: string;
  currentLocation: number | null;
  currentStatus: number | null;
  lastUpdateDate: string;
  computerType: number | null;
  computerModel: string;
  donatedBy: string;
  entryDate: string;
  deliveryDate: string;
  destination: string;
  cpu: number | null;
  ram: number | null;
  sdd: number | null;
  isImageInstalled: boolean;
  compuetrHistorys: History[];
}

interface History {
  id: number;
  changedBy: string;
  lastChangedAt: string;
  from: number;
  to: number;
}

interface Search {
  isOpen: boolean;
  text: string;
}

interface SystemData {
  id: number;
  key: string;
  value: string;
}

interface RootState {
  userId: string;
  computers: TableRow[];
  search: Search;
  systemData: SystemData[];
}
