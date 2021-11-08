import axios from "axios";

export function getList() {
    return axios.get("api/list");
}

export function postEntry(entry) {
    console.log(entry);
    return axios.post("api/list", entry);
}

export function putEntry(id, entry) {
    return axios.put("api/list/" + id, entry);
}

export function deleteEntry(id) {
    return axios.delete("api/list/" + id);
}