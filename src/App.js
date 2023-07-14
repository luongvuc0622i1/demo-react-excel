import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import axios from "axios";
import "./App.css";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyD9YDPjIpgFru-7tYpPZxbmOHKZyGumiGY",
  authDomain: "excel-data-d68ae.firebaseapp.com",
  projectId: "excel-data-d68ae",
  storageBucket: "excel-data-d68ae.appspot.com",
  messagingSenderId: "153016528086",
  appId: "1:153016528086:web:82c5a424d274665f6ded77",
  // measurementId: "gs://excel-data-d68ae.appspot.com",
});

// Firebase storage reference
const storage = getStorage(app);

export default function App() {
  const [reportId, setReportId] = useState();
  const [fileName, setFileName] = useState(" ");
  const [filePath, setFilePath] = useState("0");
  const [first, setFirst] = useState(true);

  const handleInputChange = (e) => {
    setReportId(e.target.value);
  };

  //-------------------------------------------------------------------------------------------------------

  // State to store uploaded file

  // Handle file upload event and update state
  function handleFileChange(e) {
    const name = e.target.files[0].name;
    setFileName(name.substr(0, name.lastIndexOf('.')));
    const file = e.target.files[0];

    if (!file) {
      alert("Please upload an file first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFilePath(url);
          console.log(url);
        });
      }
    );

    click2();
  }

  const handleExport = () => {
    axios
      .post("http://localhost:8080/generate-report", { "fileName": fileName, "filePath": filePath, "reportId": reportId })
      .then(res => {
        alert("Export done!");
      })
      .catch(err => {
        throw err;
      });
  };

  //-------------------------------------------------------------------------------------------------------
  const [response, setResponse] = useState({});

  const click2 = () => {
    axios
      .get("http://localhost:8080/list-report")
      .then(res => {
        return setResponse(res.data);
      })
      .catch(err => {
        throw err;
      });
  }

  const click1 = () => {
    if (first) {
      response.forEach(item => {
        document.getElementById("inputReport").innerHTML += "<option key=" + item.id + " value=" + item.id + ">" + item.description + "</option>";
      });
      setFirst(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-4">
          <form>
            <div className="form-group">
              <label for="inputFile">Chọn File</label>
              <input className="form-control" id="inputFile" type="file" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label for="inputReport">Chọn mẫu Report</label>
              <select className="form-control" defaultValue="default" onClick={click1} onChange={handleInputChange} id="inputReport">
                <option value="default" disabled hidden>Chọn kiểu Report</option>
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={handleExport} style={{float: "right"}}>Xuất report</button>
            </div>
          </form>
        </div>
        <div className="col" style={{marginLeft: "20px"}}></div>
      </div>
      <div className="row">
        <div className="col">
          abc
        </div>
      </div>
    </div>
  );
}