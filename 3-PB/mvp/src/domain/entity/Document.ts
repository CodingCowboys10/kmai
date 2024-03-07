export interface Document{
    name: string,
    date: Date,
    size: number,
    content?: Buffer | string
}