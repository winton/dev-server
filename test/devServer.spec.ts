import express from "express"
import expect from "./expect"
import { DevServer } from "../src"

describe("devServer", () => {
  it("should instantiate", () => {
    new DevServer(express(), __dirname)
  })

  it("should assert", () => {
    expect(true).toBe(true)
  })
})
