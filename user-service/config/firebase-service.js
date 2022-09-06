import admin from "firebase-admin";

const serviceAccount = {
	type: "service_account",
	project_id: "peerprep-eacee",
	private_key_id: "e640df0f65da3e5e7cf53efed1142598b6737939",
	private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDlrDg0jB7aNxCb\n3uyoV3eAXEOQLNGsV2tIepycqT213XFLSl3v1QebEGYkl5JwcprqyJpmJggM6gaN\n5TJj7y1TP8S9rtV5ocJWFUW9ZoZ0DJe7qw8q3sGH+33KTGpljFXByUdnhR5iRBXz\nL2mTWKkzz+S+d7NcdTCfshLYf0k29OIDoFJXF/n7m33D/wiBQT20Hnerp3zvkb96\ngc6gUEfL6YL9pGOMG86/WppoXr3snIKPUxB0U8JLn7hYbXK+Lu+sSUuVG5E87Yzm\nZqMaXb4npi0iRYVSVXalXnFavMacXXK9dYR1hmJUq/xi/JmieIeV1ZvP+c572227\nN6msoxJFAgMBAAECggEAHTlLsYv+xP9qspqr/EOc5g1XX3oEd+xrrz5CvUBfpMt3\nhgABcenmXNm6VX+f14UNp0A9PTArqBEDInz+a27ckpIzo3simKZ3huKQDCiGhS+x\nAuUiOe88KuRaPip5A1DW/KBy4H40voYxUM9AnMoURY53abDrdqFGvZs4AKo5k69Z\nebfGrht6d0x5gWXLv4f5TK/bFfsPxLBZq8CajwhZUmddMUcv1mveVe3pZaTDXOkN\n4syPO1Z+grnaRAt+hhjeS6VPEEg0J9tvhGGXkbUvdKh93FCAoopjY1QIZl5hvpb1\n+Ju72bsUEvQlJZBzdXfi23ty6/RMapIkotgfbG44pQKBgQDy2oI32kSTNyayOR1+\ngekNjsenOdE8ZFNe7/Eyyxc6bNjjyXIMrFpNtUbCHuMzD9Um8bQ/g4S664KK7OG6\nauEXQLOkosXof4afOyay+HH7LXAuIKkBreo/VgaWy9bGPeDiU7vnwHWx+8zfnJnG\nuMxwoSKIx51zptNHO4L8QHUsiwKBgQDyGwy3LfRyYOaaThZmAg32eP1NdN8hwqbl\nhteDn1lGgpAQ/F+9Y/SQbQNhT5Y4QtcsltJ7WspeAGnlEL7BVTIFGjad128YZATN\ncMO7Gxz/fXtkEuJDoh2cYVHoDbFJnjodLoP3eGfpO00yRfQHr+LJF3EHM3x8RHuy\nDrWuqgyGbwKBgQCyWLgizl9oAaugXQOFAWCmfUGwVGyNvlvfr7RhifZQCNmrRyhD\nmFtlEAibzNUrjagKxpyJvEtAfm5LGjWXkqAlVHXZJVTULrstuuHrszr5rF/i8EdN\nnWwXAVUrbx0WTyEU9UtcoeGNSQ8m9LmVz+cLm7ph2r6NzWkBufmyyJ+EiwKBgG/j\nsGy4AFEcF3cYv6FFMc7G+8ngSX8AxsEtIEzkSA4eKRawjE6q80wMFZPThElcGrWw\nvnXj78Khzk7e/km7ZfKVusgX2HAdSVro0oyWa0Boba5CS++V7LlpAMGOEnFDfvgd\nlz+3lc5kabjiO3WSA+2Lt+DsGowT2lbgFXczf7ZhAoGBAIr7c2cPbBU4w8l+jAmH\nNxfCsPf1UVahYiuGG3odObxGRrHHl/NFUjmnzyLr9j/VFoYmUUqND3E+vRyem9xe\nkaCAxtGGzLXVbN6bjgbQNsAOU/EaClYk/W3dFTIbBaLbWX4Tal7nvK2sH3UfAeSK\nJ+GhmzRYdenKd7lE1eY3ll4A\n-----END PRIVATE KEY-----\n",
	client_email: "firebase-adminsdk-s15yd@peerprep-eacee.iam.gserviceaccount.com",
	client_id: "111276206921074859875",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s15yd%40peerprep-eacee.iam.gserviceaccount.com"
  }

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

export default admin
