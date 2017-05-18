# Sample code for nodejs mqtt client

## 1) Connect to JBoss AMQ deployed on Openshift v3 via mqtts

[deployment instructions] (https://access.redhat.com/documentation/en/red-hat-xpaas/0/red-hat-xpaas-a-mq-image/red-hat-xpaas-a-mq-image)

#### 1.1) Prepare key and cert files
Assumed you have prepared the keystore files (i.e. server.keystore) for the AMQ deployment. Extract the private keys (key.pem) and cert (cert.pem) from the server.keystore in this step:

(Use 'password' for all the passwords and passphrases if you are using the server.keystore provided seperately)

- Convert to PEM file

Use the keystool to convert from jks format to pkcs12 (I don't think we can convert into pem directly??)

```
# keytool -importkeystore -srckeystore server.keystore -destkeystore broker.p12  -srcstoretype jks  -deststoretype pkcs12

# openssl pkcs12 -in broker.p12 -out broker.pem
```

- Extract the key and cert files

```
# openssl pkey -in broker.pem -out key.pem

# openssl x509 -in broker.pem -out server.pem
```
The pem files will be referenced in the app, just leave it in the root directory of this repo.


## 2) Preparing the app if running for the first time


`# npm install`


## 2) Start the app

`# DEBUG=mqttclient:* npm start`

