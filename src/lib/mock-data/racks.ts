import type { BinLocation, RackLocation } from "@/lib/types";
import { currentFactory } from "./factories";

export const rackLocations: RackLocation[] = [
  { id: "rack-a1", factoryId: currentFactory.id, code: "A1", name: "Finished Goods — Bay A1", zone: "Zone A", totalBins: 6 },
  { id: "rack-a2", factoryId: currentFactory.id, code: "A2", name: "Finished Goods — Bay A2", zone: "Zone A", totalBins: 6 },
  { id: "rack-b1", factoryId: currentFactory.id, code: "B1", name: "WIP Buffer — Bay B1", zone: "Zone B", totalBins: 8 },
  { id: "rack-b2", factoryId: currentFactory.id, code: "B2", name: "Overflow — Bay B2", zone: "Zone B", totalBins: 8 },
];

export const binLocations: BinLocation[] = [
  { id: "bin-a1-01", rackId: "rack-a1", code: "A1-01", capacity: 20, occupied: 18 },
  { id: "bin-a1-02", rackId: "rack-a1", code: "A1-02", capacity: 20, occupied: 19 },
  { id: "bin-a1-03", rackId: "rack-a1", code: "A1-03", capacity: 20, occupied: 20 },
  { id: "bin-a1-04", rackId: "rack-a1", code: "A1-04", capacity: 20, occupied: 17 },
  { id: "bin-a1-05", rackId: "rack-a1", code: "A1-05", capacity: 20, occupied: 18 },
  { id: "bin-a1-06", rackId: "rack-a1", code: "A1-06", capacity: 20, occupied: 19 },

  { id: "bin-a2-01", rackId: "rack-a2", code: "A2-01", capacity: 20, occupied: 12 },
  { id: "bin-a2-02", rackId: "rack-a2", code: "A2-02", capacity: 20, occupied: 9 },
  { id: "bin-a2-03", rackId: "rack-a2", code: "A2-03", capacity: 20, occupied: 14 },
  { id: "bin-a2-04", rackId: "rack-a2", code: "A2-04", capacity: 20, occupied: 8 },
  { id: "bin-a2-05", rackId: "rack-a2", code: "A2-05", capacity: 20, occupied: 11 },
  { id: "bin-a2-06", rackId: "rack-a2", code: "A2-06", capacity: 20, occupied: 5 },

  { id: "bin-b1-01", rackId: "rack-b1", code: "B1-01", capacity: 15, occupied: 10 },
  { id: "bin-b1-02", rackId: "rack-b1", code: "B1-02", capacity: 15, occupied: 11 },
  { id: "bin-b1-03", rackId: "rack-b1", code: "B1-03", capacity: 15, occupied: 9 },
  { id: "bin-b1-04", rackId: "rack-b1", code: "B1-04", capacity: 15, occupied: 13 },

  { id: "bin-b2-01", rackId: "rack-b2", code: "B2-01", capacity: 15, occupied: 3 },
  { id: "bin-b2-02", rackId: "rack-b2", code: "B2-02", capacity: 15, occupied: 2 },
  { id: "bin-b2-03", rackId: "rack-b2", code: "B2-03", capacity: 15, occupied: 0 },
  { id: "bin-b2-04", rackId: "rack-b2", code: "B2-04", capacity: 15, occupied: 4 },
];
