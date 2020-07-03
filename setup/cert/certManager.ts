import fs from "fs"
import forge from "node-forge"
import Shell from "node-powershell"
import path from "path"
import "./typings/node-forge-extension"

const certPassword = "password"

export function certPath(certFileName: string) {
  return path.join(__dirname, "../../", "certificates", certFileName)
}

export class CertInfo {
  public baseDomain: string
  public subDomains: string[]
  public certName: string

  constructor(_baseDomain: string, _subdomains: string[], _certName: string) {
    this.baseDomain = _baseDomain
    this.subDomains = _subdomains
    this.certName = _certName
  }

  getAltDomains() {
    return this.subDomains.map(function (item: string, index: number) {
      return {
        type: 2,
        value: item,
      }
    })
  }
}

export function createCert(certInfo: CertInfo) {
  console.log("Generating 1024-bit key-pair...")
  const keys = forge.pki.rsa.generateKeyPair(2048)
  console.log("Key-pair created.")
  console.log("Creating self-signed certificate...")
  const cert = forge.pki.createCertificate()
  cert.publicKey = keys.publicKey
  cert.serialNumber = "01"
  cert.validity.notBefore = new Date()
  cert.validity.notAfter = new Date()
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 5)
  const attrs = [
    {
      name: "commonName",
      value: certInfo.baseDomain,
    },
    {
      name: "organizationName",
      value: "backyards",
    },
  ]
  cert.setSubject(attrs)
  cert.setIssuer(attrs)
  cert.setExtensions([
    {
      name: "basicConstraints",
      cA: true,
    },
    {
      name: "keyUsage",
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true,
    },
    {
      name: "extKeyUsage",
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true,
    },
    {
      name: "nsCertType",
      client: true,
      server: true,
      email: true,
      objsign: true,
      sslCA: true,
      emailCA: true,
      objCA: true,
    },
    {
      name: "subjectAltName",
      altNames: certInfo.getAltDomains(),
    },
    {
      name: "subjectKeyIdentifier",
    },
  ])
  // FIXME: add authorityKeyIdentifier extension

  // self-sign certificate
  cert.sign(keys.privateKey, forge.md.sha256.create())
  console.log("Certificate created.")

  // PEM-format keys and cert
  const pem = {
    privateKey: forge.pki.privateKeyToPem(keys.privateKey),
    publicKey: forge.pki.publicKeyToPem(keys.publicKey),
    certificate: forge.pki.certificateToPem(cert),
  }
  const p12Asn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, [cert], certPassword, {
    algorithm: "3des",
    friendlyName: "test from forge",
  })
  const p12Der = forge.asn1.toDer(p12Asn1).getBytes()
  // var p12b64 = forge.util.encode64(p12Der);
  const certFileName = certInfo.certName.substr(0, certInfo.certName.lastIndexOf("."))
  fs.writeFileSync(certPath(certFileName + ".pfx"), p12Der, { encoding: "binary" })
  // console.log("\nKey-Pair:");
  // console.log(pem.privateKey); // .key
  // console.log(pem.publicKey);
  fs.writeFileSync(certPath(certFileName + ".key"), pem.privateKey)
  fs.writeFileSync(certPath(certFileName + ".pem"), pem.publicKey)
  // console.log("\nCertificate:");
  // console.log(pem.certificate); // .crt
  fs.writeFileSync(certPath(certFileName + ".crt"), pem.certificate)

  // verify certificate
  const caStore = forge.pki.createCaStore()
  caStore.addCertificate(cert)
  try {
    forge.pki.verifyCertificateChain(caStore, [cert], (vfd, depth, chain) => {
      if (vfd === true) {
        console.log("SubjectKeyIdentifier verified: " + cert.verifySubjectKeyIdentifier())
        console.log("Certificate verified.")
      }
      return true
    })
  } catch (ex) {
    console.log("Certificate verification failure: " + JSON.stringify(ex, null, 2))
  }
}

export function installCert(certInfo: CertInfo) {
  const ps = new Shell({
    executionPolicy: "Bypass",
    noProfile: true,
  })

  var certificationPath = certPath(certInfo.certName)

  //ps.addCommand("Import-PfxCertificate -FilePath " + certificationPath + " -CertStoreLocation Cert:\LocalMachine\\My -Password (ConvertTo-SecureString -String 'password' -AsPlainText -Force)");
  ps.addCommand(
    "Import-PfxCertificate -FilePath " +
      certificationPath +
      " -CertStoreLocation Cert:LocalMachine\\Root -Password (ConvertTo-SecureString -String 'password' -AsPlainText -Force)",
  )
  ps.invoke()
    .then((output) => {
      console.log("Certificate installed successfully.")
      console.log(output)
      ps.dispose()
    })
    .catch((err) => {
      console.log(err)
      ps.dispose()
    })
}
