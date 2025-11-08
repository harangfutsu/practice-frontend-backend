import api from "./client"

export const getCourse = (params) => 
    api.get("/course", {params}).then((r) => r.data.data)

export const getCourseById = (id) =>
    api.get(`/course/${id}`).then((r) => r.data.data)

export const createCourse = (payload) =>
    api.post("/course", payload).then((r) => r.data.data)

export const updateCourse = (id, payload) =>
    api.put(`/course/${id}`, payload).then((r) => r.data.data)

export const deleteCourse = (id) =>
    api.delete(`/course/${id}`).then((r) => r.data.data)
