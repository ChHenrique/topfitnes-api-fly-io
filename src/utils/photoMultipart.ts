import { photoStorageService } from "src/services/photoStorageService";
import { typeUploads } from "src/types/typeUploads";

export async function createUserPhotoMultipart(rawData: any, parsedData: any, typeUploads: typeUploads) {
    const foto = rawData.foto;
    if (foto && typeof foto.toBuffer === 'function') {
        const buffer = await foto.toBuffer();
        const { filename, mimetype } = foto;
        parsedData.data.foto = await photoStorageService({ buffer, filename, mimetype }, typeUploads);
    } else {
        parsedData.data.foto = "uploads/alunoUploads/dc8c9be9-2574-4f0f-ad05-e2962a851d09-perfil-de-usuário-do-vetor-avatar-padrão-179376714.webp";
    }
}


export async function updateUserPhotoMultipart(rawData: any, parsedData: any, typeUploads: typeUploads) {
    const foto = rawData.foto;
    if (foto && typeof foto.toBuffer === 'function') {
        const buffer = await foto.toBuffer();
        const { filename, mimetype } = foto;
        parsedData.data.foto = await photoStorageService({ buffer, filename, mimetype }, typeUploads);
    }
}