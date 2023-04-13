import { request, response } from 'express';
import grid from 'gridfs-stream';
import mongoose, { connect } from 'mongoose';

const url = 'http://localhost:8000';

let gfs,grifsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    grifsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

export const uploadImage = (request,response) => {
    if (!request.file) {
        return response.status(404).json({ msg: "File not found bhai" });
    }

    const imageurl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageurl);
}

export const getImage = async (request,response)=> {
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename });
        const readstream = grifsBucket.openDownloadStream(file._id);
        readstream.pipe(response);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}