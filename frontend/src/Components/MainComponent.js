import React from "react";

export default function MainComponent() {
  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div id="mainComponent">
      <h1>DIY Mail System</h1>
      <form action="" onSubmit={submitForm}>
        <div className="formItem">
          <h3>Name</h3>
          <input type="text" name="name" placeholder="Enter sender's name" />
        </div>
        <div className="formItem">
          <h3>From</h3>
          <input
            type="email"
            name="from"
            placeholder="Enter sender's email id"
          />
        </div>
        <div className="formItem">
          <h3>Password</h3>
          <input
            type="password"
            name="pass"
            placeholder="Enter sender's password (just for send email)"
          />
        </div>
        <div className="formItem">
          <h3>Subject</h3>
          <input type="text" name="subject" placeholder="Enter email subject" />
        </div>
        <div className="formItem">
          <h3>To</h3>
          <input
            type="email"
            name="to"
            placeholder="Enter recipient's email id"
          />
        </div>
        <div className="formItem">
          <h3>CC</h3>
          <input type="email" name="cc" placeholder="Enter cc if any" />
        </div>
        <div className="formItem">
          <h3>BCC</h3>
          <input type="email" name="bcc" placeholder="Enter bcc if any" />
        </div>
        <div className="formItem" id="msgItem">
          <h3>Message</h3>
          <textarea
            type="text"
            name="bcc"
            placeholder="Enter message"
            rows={10}
          />
        </div>
        <button type="submit" id="submitBtn">
          Send Email
        </button>
      </form>
    </div>
  );
}
