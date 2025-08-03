import { randomUUID } from "crypto";
import { IPhotoStorageDTO } from "./IPhotoStorage";
import { join } from "path";
import { writeFile } from "fs/promises";
import { ServerError } from "src/services/serverError";
import { fileType } from "./fileType";

export async function save(typeUploads: {}, data: IPhotoStorageDTO, type: string): Promise<string> {
    if (!fileType(data.buffer)) throw new ServerError("Esse arquivo não é uma imagem", 415);

    const typePath = typeUploads[type as keyof typeof typeUploads];
    if (!typePath) throw new ServerError("Tipo de upload inválido", 419);

    const uniqueName = `${randomUUID()}-${data.filename}`;
    const path = join(typePath, uniqueName);
    await writeFile(path, data.buffer);

    return `uploads/${type}/${uniqueName}`
};