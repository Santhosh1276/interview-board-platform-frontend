import axios from "axios";

const API = `https://interview-board-platform-backend.onrender.com/api/interview`;

export async function add_interview(params) {
    try {
        const res = await axios.post(`${API}/add-interview`, params, {
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

export async function get_allInterviews() {
    try {
        const res = await axios.get(`${API}/get-allInterviews`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            status: "Success",
            interviews: res?.data?.data,
        };
    } catch (e) {
        console.log("err", e);
        return {
            status: "Failed",
            error: e.response?.data || e.message,
        };
    }
}

export async function getInterviewsByCompany(companyName) {
    try {
        const res = await axios.get(`${API}/getInterviewByCompany?companyName=${companyName}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            status: "Success",
            interviews: res?.data?.data ?? [],
        };
    }
    catch (e) {
        console.log("err", e);
        return {
            status: "Failed",
            error: e.response?.data || e.message,
            interviews: []
        };
    }
}
