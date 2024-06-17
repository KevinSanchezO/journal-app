/**
 * 
 * function to upload images into the cloudinary db
 * 
 * @param {array} file the multiple images to upload into cloudinary 
 * @returns the secure_url, the url of the image uploaded into cloudinary
 */

export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No file has been selected to upload');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dqzvjofai/upload'; // url to upload the 

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        if ( !resp.ok ) throw new Error('Couldn\'t upload the image');

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}