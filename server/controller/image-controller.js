
const url = 'http://127.0.0.1:8000';

export const uploadImage = (request,response) => {
    if (!request.file) {
        return response.status(404).json({ msg: "File not found" });
    }

    const imageurl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageurl);
}