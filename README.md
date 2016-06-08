# BITNATION ID

ID generator for the BITNATION project.

After generating a BITNATION-ID the userData will be signed and that signature together with the public key will be saved as a transaction on Horizon. The format will be **signature:publicKey**. The transaction id will be saved as `hztx` in your ID.

![A Horizon Transaction](http://res.cloudinary.com/go-for-self/image/upload/v1465404700/Golightly%2B/Horizon_Transaction.png)

You will be able to save your ID as a JSON file that will have the following structure (without the indentation and spacing):

```JSON
{
	"userData": {
		"name": "Ed Sheeran",
		"height": 168,
		"dob": 19801111,
		"witness1": "Bob Dole",
		"witness2": "Jane Simmons"
	},
	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
	"hztx": "87buyhjksadfbiu7t23njdsf",
	"crypto": {
		"publicKey": "87yboiuahdfniauns98u98",
		"encryptedSecretKey": "khjabsdf8o7ybo283niouhf98noljkl",
		"salt":"sfdf2322d",
		"nonce": "09iniouhnis6tb",
		"logN": 16,
		"blockSize": 8
	}
}
```

A working demo can be found at http://apps.golightlyplus.com/bitnation/id-generator/

#### To get this app running on your local machine

Open a terminal and run...

1. `git clone [URL]`
2. `npm install`
3. `npm run dev`
4. Open a browser and goto `http://localhost:8080/`

#### To verify your signed data

1. Goto http://tweetnacl.js.org/#/sign
2. Click "Verify".
3. Enter in your `publicKey` from your JSON file.
4. Enter the `signature` from the Horizon transaction. Look up from the transaction ID stored in the hztx value in your JSON file.
5. For the message, enter in your userData. e.g. `{"name":"Ed Sheeran","height":"168","dob":"19801111","witness1":"Bob Dole","witness2":"Jane Simmons"}`.

#### To view your image

1. Goto http://codebeautify.org/base64-to-image-converter
2. Copy and paste in the value for your image from your bitnation-id.json file.
