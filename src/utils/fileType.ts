import { fileTypeFromBuffer } from "file-type";

export async function fileType(buffer: Buffer): Promise<boolean>{
    const type = await fileTypeFromBuffer(buffer);
    if (!type) return false;
    return type.mime.startsWith("imagem/")
};