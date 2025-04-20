export interface IEventEmitter {
	emit: (event: string, data?: unknown) => void;
	on: (event: string, callback: (event: unknown) => void) => void;
}
