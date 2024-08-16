# Node.js Google Drive Crud API

## Getting started

### Installation

This library is distributed on `npm`. In order to add it as a dependency, run the following command:

```sh
$ npm install
```

### Service account credentials

Service accounts allow you to perform server-to-server, app-level authentication using a robot account. You will create a service account, download a keyfile, and use that to authenticate to Google APIs. To create a service account:

- Go to the [Create Service Account Key page](https://console.cloud.google.com/apis/credentials/serviceaccountkey)
- Select `New Service Account` in the drop down
- Click the `Create` button

Save the service account credential file somewhere safe, and _do not check this file into source control_! To reference the service account credential file, you have a few options.

#### Using the `keyFilePath` property

You need to edit the keyFilePath variable located in the `services/googleDriveServices.js` file.

```js
const keyFilePath = path.join(__dirname, "./your-secret-key.json");

const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ["https://www.googleapis.com/auth/drive"],
});
```

#### Using the `folderId` property

You should edit the folderId variable in the `services/googleDriveServices.js` file according to your own folder id.

```js
const folderId = "your-folder-id";
```

## Contributing

1. Fork the repository.
2. Create a new feature branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
