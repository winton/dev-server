import { Express } from "express"
import fs from "fs-extra"
import glob from "globby"
import path from "path"

export class DevServer {
  constructor(http: Express, root: string) {
    http.get("/*.:ext", async (req, res) => {
      const { ext } = req.params

      let src = path.join(root, req.path)
      let paths = await glob(src)

      if (!paths.length && ext === "mjs") {
        src = src.replace(/\.mjs$/, ".js")
        paths = await glob(src)
      }

      if (paths.length) {
        const body = (
          await fs.readFile(paths[0])
        ).toString()
        res.header("Content-Type", "text/javascript")
        res.send(body)
      } else {
        res.status(404).send("404 Not Found")
      }
    })
  }
}
