declare module "node-forge" {
    namespace pki {
        // tslint:disable-next-line:interface-name
        interface Certificate {
            verifySubjectKeyIdentifier(): void;
        }
    }
    namespace pkcs12 {
        function toPkcs12Asn1(key: any, cert: any, password: any, options: any): any;
    }
}
