export class LogEntry {
    private message: string;
    private subject: string;
    private code: LogEntryCode;
    private priority: Priority;

    constructor(message: string, subject: string, code: LogEntryCode) {
        this.message = message;
        this.subject = subject;
        this.code = code;
    }

    public setPriority(priority: Priority) {
        this.priority = priority;
    }
}

export type Priority = 'HIGH' | 'NORMAL' | 'LOW';

export interface LogEntryCode {
    code: string;
    additionalInformation: string;
}