import axios from "axios";

const API = `https://interview-board-platform-backend.onrender.com/api/company`;

export async function add_company(params) {
    try {
        const res = await axios.post(`${API}/add-company`, params, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            status: "Success",
            url: res.data,
        };
    } catch (e) {
        console.log("err", e);
        return {
            status: "Failed",
            error: e.response?.data || e.message,
        };
    }
}

export async function get_allCompanies() {
    try {
        const res = await axios.get(`${API}/get-allCompanies`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {
            status: "Success",
            data: res?.data?.data,
        };
    } catch (e) {
        console.log("err", e);
        return {
            status: "Failed",
            error: e.response?.data || e.message,
        };
    }
}
