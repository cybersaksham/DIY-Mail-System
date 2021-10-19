import React, { useState } from "react";

export default function MainComponent() {
  const HOST = "http://localhost:5000";
  const [ccCount, setCcCount] = useState([]);
  const [bccCount, setBccCount] = useState([]);

  const getCC = (initialCC) => {
    let newCC = initialCC;
    ccCount.forEach((el) => {
      if (el !== "") newCC += "," + el;
    });
    return newCC;
  };

  const getBCC = (initialBCC) => {
    let newBCC = initialBCC;
    bccCount.forEach((el) => {
      if (el !== "") newBCC += "," + el;
    });
    return newBCC;
  };

  const timeout = () => {
    if (localStorage["alertTime"] != null)
      clearTimeout(localStorage["alertTime"]);
    let s = setTimeout(() => {
      document.getElementById("successText").innerText = "";
      document.getElementById("errorText").innerText = "";
    }, 2500);
    localStorage["alertTime"] = s;
  };

  const showError = (txt) => {
    document.getElementById("errorText").innerText = txt;
    document.getElementById("successText").innerText = "";
    timeout();
  };

  const showSuccess = (txt) => {
    document.getElementById("successText").innerText = txt;
    document.getElementById("errorText").innerText = "";
    timeout();
  };

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
        if (formData[key] === "") {
          showError("Enter all details");
          return;
        }
      }
    }

    // Formatting Data
    let finalData = {};
    finalData["name"] = formData["name"];
    finalData["user"] = formData["from"];
    finalData["pass"] = formData["pass"];
    finalData["subject"] = formData["subject"];
    finalData["toList"] = formData["to"];
    finalData["ccList"] = getCC(formData["cc"]);
    finalData["bccList"] = getBCC(formData["bcc"]);
    finalData["text"] = formData["message"];

    // Sending Request
    const response = await fetch(HOST + "/send_mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
    const json = await response.json();
    if (json.error) showError(json.error);
    else {
      form.reset();
      setCcCount([]);
      setBccCount([]);
      showSuccess(json.success);
    }
  };

  const addCCCount = () => {
    setCcCount([...ccCount, ""]);
  };

  const removeCCCount = (i) => {
    setCcCount([
      ...ccCount.slice(0, i),
      ...ccCount.slice(i + 1, ccCount.length),
    ]);
  };

  const ccChange = (i, e) => {
    setCcCount([
      ...ccCount.slice(0, i),
      e.target.value,
      ...ccCount.slice(i + 1, ccCount.length),
    ]);
  };

  const addBCCCount = () => {
    setBccCount([...bccCount, ""]);
  };

  const removeBCCCount = (i) => {
    setBccCount([
      ...bccCount.slice(0, i),
      ...bccCount.slice(i + 1, bccCount.length),
    ]);
  };

  const bccChange = (i, e) => {
    setBccCount([
      ...bccCount.slice(0, i),
      e.target.value,
      ...bccCount.slice(i + 1, bccCount.length),
    ]);
  };

  return (
    <div id="mainComponent">
      <h1>DIY Mail System</h1>
      <div id="status">
        <p id="errorText"></p>
        <p id="successText"></p>
      </div>
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
            className="prefixInput"
          />
          <span className="suffixSpan" onClick={addCCCount}>
            +
          </span>
        </div>
        {ccCount.map((x, i) => (
          <div className="formItem" key={i}>
            <h3> </h3>
            <input
              type="email"
              placeholder="Enter cc if any"
              className="prefixInput"
              value={x}
              onChange={(e) => ccChange(i, e)}
            />
            <span className="suffixSpan" onClick={() => removeCCCount(i)}>
              -
            </span>
          </div>
        ))}
        <div className="formItem">
          <h3>BCC</h3>
          <input
            type="email"
            name="bcc"
            placeholder="Enter bcc if any"
            id="bccEmail"
            className="prefixInput"
          />
          <span className="suffixSpan" onClick={addBCCCount}>
            +
          </span>
        </div>
        {bccCount.map((x, i) => (
          <div className="formItem" key={i}>
            <h3> </h3>
            <input
              type="email"
              placeholder="Enter bcc if any"
              className="prefixInput"
              value={x}
              onChange={(e) => bccChange(i, e)}
            />
            <span className="suffixSpan" onClick={() => removeBCCCount(i)}>
              -
            </span>
          </div>
        ))}
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
