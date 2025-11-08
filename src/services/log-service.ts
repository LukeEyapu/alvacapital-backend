// services/log-service.ts
export type LogEntry = {
  timestamp: number;
  message: string;
};

const logs: LogEntry[] = [
  { timestamp: Date.now() - 1000 * 60 * 5, message: 'Trade replicated to 3 copiers' },
  { timestamp: Date.now() - 1000 * 60 * 2, message: 'Open positions fetched successfully' }
];

export function getLogs(): LogEntry[] {
  return logs;
}

export function addLog(message: string) {
  logs.push({ timestamp: Date.now(), message });

  // Optional: keep only the latest 100 logs
  if (logs.length > 100) logs.shift();
}
