import axios from "axios";

export function getList() {
    return axios.get("list");
}

export function addEntry(entry) {
    return axios.post("list", entry);
}

export function updateEntry(id, entry) {
    return axios.put("list/" + id, entry);
}

export function deleteEntry(id) {
    return axios.delete("list/" + id);
}