import React from "react"

export interface HelloProps {
  hello: string
  world: string
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.hello} and {props.world}!
  </h1>
)
