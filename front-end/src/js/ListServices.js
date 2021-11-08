import axios from "axios";

export function getList(source) {
    return axios.get("api/list", {
        cancelToken: source.token,
    });
}

export function postEntry(entry) {
    return axios.post("api/list", entry);
}

export function putEntry(id, entry) {
    return axios.put("api/list/" + id, entry);
}

export function deleteEntry(id) {
    return axios.delete("api/list/" + id);
}