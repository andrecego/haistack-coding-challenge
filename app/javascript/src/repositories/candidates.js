import { get, post, put, del } from '@/lib/request.js'
import createCandidateModel, { candidateMeta } from '@/models/candidate.js'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

export const fetchCandidates = async ({ page } = {}) => {
  const params = new URLSearchParams([
    ['page', page || 1],
    ['per_page', 10],
  ])

  const response = await get(`${API_BASE_URL}/api/v1/candidates?${params}`)
  const candidates = (response.data?.candidates || []).map(createCandidateModel)
  const meta = candidateMeta(response.data?.meta)

  return { candidates, status: response.status, meta }
}

export const getCandidate = async (id) => {
  const response = await get(`${API_BASE_URL}/api/v1/candidates/${id}`)
  const candidate = createCandidateModel(response.data)

  return {
    candidate,
    status: response.status,
  }
}

export const createCandidate = async (candidate) => {
  const response = await post(`${API_BASE_URL}/api/v1/candidates`, { body: candidate })

  return {
    status: response.status,
  }
}

export const updateCandidate = async (id, candidate) => {
  const response = await put(`${API_BASE_URL}/api/v1/candidates/${id}`, { body: candidate })

  return {
    status: response.status,
  }
}

export const deleteCandidate = async (id) => {
  const response = await del(`${API_BASE_URL}/api/v1/candidates/${id}`)

  return {
    status: response.status,
  }
}
