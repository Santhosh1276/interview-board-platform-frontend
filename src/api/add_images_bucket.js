import axios from "axios"
const API = `https://add-images-bucket.onrender.com`

export async function imageToURl(formData) {
    console.log(formData,"form data >>")
    try {
        const res = await axios.post(`${API}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return ({
            "status": "Success",
            'url': res?.data?.url
        })

    }
    catch (e) {
        console.log("err", e)
        return ({
            status: "Failed",
            error: e
        })
    }
}