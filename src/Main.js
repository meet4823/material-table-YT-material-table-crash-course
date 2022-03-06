import React, { useState } from "react";
import "./App.css";
import SplitPane, { Pane } from 'react-split-pane';
import Document from "./Document";
import Table from "./Table";
import { Grid } from "@material-ui/core";
import PdfViewer from "./pdfViewer/pdfViewer"

function Main() {

  const [receivedUrl, setReceivedUrl] = useState("")

  return (
    <div>
  <SplitPane>
      <Table setReceivedUrl={setReceivedUrl} />
      <PdfViewer fileUrl={receivedUrl} />   
      </SplitPane>
    </div>
  );
}

export default Main;
