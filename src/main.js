/* eslint-disable import/no-anonymous-default-export */
import { Client, Databases, Query, ID } from 'node-appwrite';
import querystring from 'node:querystring';

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Contact Form</title>
  </head>
  <body>
  <section>
  <div
    className="u-flex u-main-space-between u-cross-center"
    style={{
      padding: "20px",
      backgroundColor: "rgb(219, 26, 90)",
      color: "white",
      marginBottom: "20px",
    }}
  >
    <h1 className="u-text-center u-font-size-32">Book Me</h1>
  </div>
  <div
    className="card u-cross-center u-width-full-line u-max-width-500"
    style={{ margin: "auto" }}
  >
    <div className="u-flex u-main-space-between u-cross-center">
      <h6 className="heading-level-6 u-text-center">New Guest</h6>
    </div>

    <form
      method="POST"
      action="/"
      className="form u-margin-block-start-24"
    >
      <ul className="form-list">
        <li className="form-item" style="list-style-type: none;">
          <label className="label">Full Name</label>
          <div className="input-text-wrapper">
            <input
              type="text"
              className="input-text u-padding-inline-end-56"
              placeholder="Full name"
              name="name"
            />
          </div>
        </li>
        <li className="form-item" style="list-style-type: none;">
          <label className="label">Email</label>
          <div className="input-text-wrapper">
            <input
              type="email"
              className="input-text u-padding-inline-end-56"
              placeholder="abc@example.com"
              name="email"
            />
          </div>
        </li>
        <div className="u-flex u-main-space-between u-cross-center">
          <li className="form-item" style="list-style-type: none;">
            <label className="label">Check-In</label>
            <div className="input-text-wrapper">
              <input
                type="date"
                name="date"
              />
            </div>
          </li>
          <li className="form-item" style="list-style-type: none;">
            <label className="label">Time</label>
            <div className="input-text-wrapper">
              <select
                name="time"
              >
                <option>2pm - 3pm</option>
                <option>4pm - 5pm</option>
                <option>6pm - 7pm</option>
                <option>8pm - 9pm</option>
              </select>
            </div>
          </li>
        </div>
        <li className="form-item" style="list-style-type: none;">
          <label className="label">Message</label>
          <div className="input-text-wrapper">
            <textarea
              className="input-text"
              placeholder="Type here..."
              name="content"
              style={{ height: "80px" }}
            ></textarea>
          </div>
        </li>
      </ul>

      <div className="form-footer">
        <div className="u-flex u-main-end u-gap-12">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</section>
  </body>
</html>`;

export default async ({ req, res }) => {
  if (req.method === 'GET') {
    return res.send(html, 200, {'content-type': 'text/html'});
  }

  if (req.method === 'POST' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    const formData = querystring.parse(req.body);

    const message = {
      name: formData.name,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      content: formData.content,
    };

    const client = new Client();
    client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("functions-test")
    .setKey("cd2d75a9b5a0b7b8cefe55eaeaea0486f5403cef5c25858ad64b26935201889de17b513bd717947816a40a38b20fcf3a228c11a4a1bcbfd3657b274b553023251a86c60d481c029765d06b020029677976205a5b9179ec7239323f80268eed083755be5e6267487d8670d2524974e4375c3c5e724add66f9f7846fb84759ec41");

    const databases = new Databases(client);
    const document = await databases.createDocument('message-id', 'message-collection-id', ID.unique(), message);

    return res.send("Message sent");
  }

  return res.send('Not found', 404);
}