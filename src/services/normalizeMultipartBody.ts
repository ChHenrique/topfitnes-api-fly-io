export function normalizeMultipartBody(body: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in body) {
        const field = body[key];

        // Se for campo de texto (MultipartValue), extrai o valor
        if (typeof field === "object" && "value" in field) {
            result[key] = field.value;
        } else {
            result[key] = field; // arquivos continuam intactos
        }
    }

    return result;
}