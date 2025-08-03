import { mkdirSync } from "fs";
import { join } from "path";
import { IPhotoStorageDTO } from "../utils/IPhotoStorage";
import { save } from "../utils/savePhoto";
import { roleUser } from "../interfaces/roleUser";
import { typeUploads } from "../types/typeUploads";

export function photoStorageService(data: IPhotoStorageDTO, type: typeUploads) {
    const uploads = "uploads";
    
    const typeUploads = {
        trainingUploads: join(uploads, 'trainingUploads'),
        exerciseUploads: join(uploads, 'exerciseUploads'),
        alunoUploads: join(uploads, 'alunoUploads'),
        administradorUploads: join(uploads, 'administradorUploads'),
        personalUploads: join(uploads, 'personalUploads'),
    } as const;

    [uploads, ...Object.values(typeUploads)].forEach(dir => mkdirSync(dir, { recursive: true }));

    const savePhoto = save(typeUploads, data, type);
    return savePhoto;
}
