import { fetch } from "react-native-nitro-fetch"
import Config from "@/config"
import { getGeneralApiProblem, GeneralApiProblem } from "./apiProblem"

export interface ApiConfig {
  url: string
  timeout: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

export type ApiResponse<T> =
  | { kind: "ok"; data: T }
  | GeneralApiProblem

function createTimeoutSignal(ms: number): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timer),
  }
}

class Api {
  private config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.config.url)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }
    return url.toString()
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>("GET", path, params)
  }

  async post<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>("POST", path, undefined, body)
  }

  async put<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", path, undefined, body)
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", path)
  }

  async postForm<T>(
    path: string,
    fields: Record<string, string | File | Blob>,
  ): Promise<ApiResponse<T>> {
    let response: Response
    const { signal, clear } = createTimeoutSignal(this.config.timeout)

    try {
      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => formData.append(key, value))

      response = await fetch(this.buildUrl(path), {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Do NOT set Content-Type manually for FormData —
          // the native layer sets it automatically with the correct multipart boundary
        },
        body: formData,
        signal,
      })
      clear()
    } catch (e) {
      clear()
      if (e instanceof Error && e.name === "AbortError") {
        return { kind: "timeout", temporary: true }
      }
      return { kind: "cannot-connect", temporary: true }
    }

    if (!response.ok) {
      return getGeneralApiProblem({
        status: response.status,
        problem: response.status >= 500 ? "SERVER_ERROR" : "CLIENT_ERROR",
      })
    }

    try {
      const data: T = await response.json()
      return { kind: "ok", data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  private async request<T>(
    method: string,
    path: string,
    params?: Record<string, string>,
    body?: unknown,
  ): Promise<ApiResponse<T>> {
    let response: Response
    const { signal, clear } = createTimeoutSignal(this.config.timeout)

    try {
      response = await fetch(this.buildUrl(path, params), {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        signal,
      })
      clear()
    } catch (e) {
      clear()
      if (e instanceof Error && e.name === "AbortError") {
        return { kind: "timeout", temporary: true }
      }
      return { kind: "cannot-connect", temporary: true }
    }

    if (!response.ok) {
      return getGeneralApiProblem({
        status: response.status,
        problem: response.status >= 500 ? "SERVER_ERROR" : "CLIENT_ERROR",
      })
    }

    try {
      const data: T = await response.json()
      return { kind: "ok", data }
    } catch {
      return { kind: "bad-data" }
    }
  }
}

export const api = new Api()