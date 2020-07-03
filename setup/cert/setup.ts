// tslint:disable:no-console
// tslint:disable:object-literal-sort-keys

import fs from "fs"
import isElevated from "is-elevated"
import { CertInfo, certPath, createCert, installCert } from "./certManager"
import { setHosts } from "./hostEditor"

async function main() {
  const certName = "cert.pfx"

  if (fs.existsSync(certPath(certName))) {
    return
  }

  const elevated = await isElevated()
  if (elevated) {
    console.log("you are root")
  } else {
    console.log("you are not root")
    return
  }

  var certInfo1 = new CertInfo("local.backyards.hu", ["local.backyards.hu"], certName)

  createCert(certInfo1)
  if (process.platform === "win32") {
    installCert(certInfo1)
  } else {
    console.log("Please install certificate manualy on Mac.")
  }

  await setHosts(certInfo1.subDomains)

  console.log("Host and Cert registration successfully.")
}

main()
