import { ETripStatus } from "./types";

export const statusChipClasses = {
  [ETripStatus.accepted]: "primary primary--text",
  [ETripStatus.cancelled]: "red red--text",
  [ETripStatus.completed]: "green green--text",
  [ETripStatus.inProgress]: "orange orange--text"
};