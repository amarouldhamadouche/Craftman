export type GeneralApiProblem =
  | { kind: "timeout"; temporary: true }
  | { kind: "cannot-connect"; temporary: true }
  | { kind: "server" }
  | { kind: "unauthorized" }
  | { kind: "forbidden" }
  | { kind: "not-found" }
  | { kind: "rejected" }
  | { kind: "unknown"; temporary: true }
  | { kind: "bad-data" }

export function getGeneralApiProblem(input: {
  status?: number
  problem?: string
}): GeneralApiProblem {
  switch (input.problem) {
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true }

    case "NETWORK_ERROR":
      return { kind: "cannot-connect", temporary: true }

    case "SERVER_ERROR":
      return { kind: "server" }

    case "CLIENT_ERROR":
      switch (input.status) {
        case 401:
          return { kind: "unauthorized" }
        case 403:
          return { kind: "forbidden" }
        case 404:
          return { kind: "not-found" }
        default:
          return { kind: "rejected" }
      }

    default:
      return { kind: "unknown", temporary: true }
  }
}