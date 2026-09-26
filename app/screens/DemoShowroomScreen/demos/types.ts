import { ReactElement } from "react"

import { TxKeyPath } from "@/i18n"

export interface Demo {
  name: string
  description: TxKeyPath
  data: () => ReactElement[]
}
