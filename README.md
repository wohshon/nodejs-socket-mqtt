# Sample code for nodejs mqtt client

## 1) Connect to JBoss AMQ deployed on Openshift v3 via mqtts

[deployment instructions] (https://access.redhat.com/documentation/en/red-hat-xpaas/0/red-hat-xpaas-a-mq-image/red-hat-xpaas-a-mq-image)

#### - Prepare key and cert files
Assumed you have prepared the keystore files (i.e. server.keystore) for the AMQ deployment. Extract the private keys (key.pem) and cert (cert.pem) from the server.keystore in this step:

Use 'password' for all the passwords and passphrases

- Convert to PEM file, broker.pem

```
# keytool -importkeystore -srckeystore server.keystore -destkeystore broker.p12  -srcstoretype jks  -deststoretype pkcs12

# openssl pkcs12 -in broker.p12 -out broker.pem
```

- Extract the key and cert files

```
# openssl pkey -in broker.pem -out key.pem

# openssl x509 -in broker.pem -out server.pem
```
The pem files will be used in the app

## 2) Preparing the app

https://www.npmjs.com/package/mqtt

`# npm install mqtt -g`
