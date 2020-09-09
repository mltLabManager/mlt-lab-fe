/// <reference types="react-scripts" />
interface TableRow {
  id: string;
  // oldId: string;
  provider: number;
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
  screenSize: number | null;
  computerHistory: History[];
}

interface DeliveryRowType {
  deliveryId: string;
  computerId: string | null;
  type: number;
  donator: string;
  provider?: number;
  isMissing: boolean;
  currentLocation?: number | null;
  currentStatus?: number | null;
  rowIndex: number;
}

interface History {
  id: number;
  changedBy: string;
  lastChangedAt: string;
  key: number;
  from: number;
  to: number;
}

interface Search {
  isOpen: boolean;
  text: string;
}

interface SystemData {
  id: number;
  value: string;
  key: number;
}

interface ParameterData {
  id: string;
  value: string;
  systemData: SystemData[];
}

interface Delivery {
  phoneNumber: string;
  rows: DeliveryRowType[];
}

interface RootState {
  userId: string;
  computers: TableRow[];
  search: Search;
  systemData: SystemData[];
  parameterData: ParameterData[];
  delivery: Delivery;
}

interface DeliveryJsonLineType {
  id: string;
  basketType: string;
  name: string;
  quantity: number;
}
