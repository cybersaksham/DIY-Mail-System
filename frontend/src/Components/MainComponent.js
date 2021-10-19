import React from "react";

export default function MainComponent() {
  const HOST = "http://localhost:5000";

  const submitForm = async (e) => {
    e.preventDefault();

    // Getting form data
    const form = document.getElementById("mailForm");
    let formData = {};
    for (var i = 0; i < form.elements.length; i++) {
      var el = form.elements[i];
      if (el.name !== "") formData[el.name] = el.value;
    }

    // Checking for empty fields
    for (const key in formData) {
      if (key !== "cc" && key !== "bcc") {
        if (formData[key] === "") return;
      }
    }
    console.log(formData);

    // Formatting Data
    let finalData = {};
    finalData["name"] = formData["name"];
    finalData["user"] = formData["from"];
    finalData["pass"] = formData["pass"];
    finalData["subject"] = formData["subject"];
    finalData["toList"] = formData["to"];
    finalData["ccList"] = formData["cc"];
    finalData["bccList"] = formData["bcc"];
    finalData["text"] = formData["message"];
    console.log(finalData);

    // Sending Request
    const response = await fetch(HOST + "/send_mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div id="mainComponent">
      <h1>DIY Mail System</h1>
      <form action="" id="mailForm" onSubmit={submitForm}>
        <div className="formItem">
          <h3>Name</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter sender's name"
            id="name"
          />
        </div>
        <div className="formItem">
          <h3>From</h3>
          <input
            type="email"
            name="from"
            placeholder="Enter sender's email id"
            id="fromEmail"
          />
        </div>
        <div className="formItem">
          <h3>Password</h3>
          <input
            type="text"
            name="pass"
            placeholder="Enter sender's password (just for send email)"
            id="password"
          />
        </div>
        <div className="formItem">
          <h3>Subject</h3>
          <input
            type="text"
            name="subject"
            placeholder="Enter email subject"
            id="subject"
          />
        </div>
        <div className="formItem">
          <h3>To</h3>
          <input
            type="email"
            name="to"
            placeholder="Enter recipient's email id"
            id="toEmail"
          />
        </div>
        <div className="formItem">
          <h3>CC</h3>
          <input
            type="email"
            name="cc"
            placeholder="Enter cc if any"
            id="ccEmail"
          />
        </div>
        <div className="formItem">
          <h3>BCC</h3>
          <input
            type="email"
            name="bcc"
            placeholder="Enter bcc if any"
            id="bccEmail"
          />
        </div>
        <div className="formItem" id="msgItem">
          <h3>Message</h3>
          <textarea
            type="text"
            name="message"
            placeholder="Enter message"
            rows={10}
            id="message"
          />
        </div>
        <button type="submit" id="submitBtn">
          Send Email
        </button>
      </form>
    </div>
  );
}
