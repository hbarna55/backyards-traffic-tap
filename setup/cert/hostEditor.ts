import hostile from "hostile"

function setHost(host: string) {
  return new Promise((resolve, reject) => {
    hostile.set("127.0.0.1", host, (err: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(host)
      }
    })
  })
}

export async function setHosts(hosts: string[]) {
  for (const host of hosts) {
    await setHost(host)
  }
}
