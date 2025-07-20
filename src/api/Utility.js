import axios from "axios";


//upload image and return image url
export const imageUrl = async imageData => {
    const formData = new FormData();
    formData.append('image', imageData);

    const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    //const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`);
    const res = await axios.post(imgUploadUrl, formData);
    return (res.data.data.url);
}