import { LogEntry } from "./logEntry";

export abstract class LogEntrySender {
    public abstract send(logEntry: LogEntry): Promise<SendResult>;
}

export class Destination {
    private name: string;
    private logEntrySender: LogEntrySender;
    private status: DestinationStatus;

    constructor(name: string, sender: LogEntrySender) {
        this.name = name;
        this.logEntrySender = sender;
        this.status = 'ENABLED';
    }

    private enable() {
        this.status = 'ENABLED';
    }

    private disable() {
        this.status = 'DISABLED';
    }

    public async sendLogEntry(logEntry: LogEntry): Promise<SendResult> {
        if (this.status === 'ENABLED') {
            return this.logEntrySender.send(logEntry);
        }

        return new SendResult('DISABLED', `Destination ${this.name} is disabled.`);
    }
}

export class SendResult {
    private result: SendResultStatus;
    private message?: string;

    constructor(result: SendResultStatus, message?: string) {
        this.result = result;
        this.message = message;
    }
}

export class DestinationError implements Error {
    name: string;
    message: string;
    stack?: string;

    constructor(message: string, stack?: string) {
        this.name = 'Destination Error';
        this.message = message;
        this.stack = stack;
    }
}

export type SendResultStatus = 'EXECUTED' | 'ERRORED' | 'DISABLED';
export type DestinationStatus = 'ENABLED' | 'DISABLED';