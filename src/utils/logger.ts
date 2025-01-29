export function logInfo(message: string): void {
    console.log(`[INFO] ${message}`);
}

export function logError(error: any): void {
    console.error(`[ERROR] ${error.message}`);
}