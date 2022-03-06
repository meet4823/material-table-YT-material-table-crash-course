import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import './pdf_style.css';

const PdfViewer = (props) => {
    const viewer = useRef(null);
    const [instance, setInstance] = useState(null);

    useEffect(() => {
        if (instance !== "" && instance !== null) {
            instance.UI.loadDocument(props.fileUrl);
        }
    }, [props.fileUrl])

    // if using a class, equivalent of componentDidMount 
    useEffect(() => {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/PDFTRON_about.pdf',
            },
            viewer.current,
        ).then((instance) => {
            setInstance(instance)
            const { documentViewer, annotationManager, Annotations } = instance.Core;

            documentViewer.addEventListener('documentLoaded', () => {
                const rectangleAnnot = new Annotations.RectangleAnnotation({
                    PageNumber: 1,
                    // values are in page coordinates with (0, 0) in the top left
                    X: 100,
                    Y: 150,
                    Width: 200,
                    Height: 50,
                    Author: annotationManager.getCurrentUser()
                });

                annotationManager.addAnnotation(rectangleAnnot);
                // need to draw the annotation otherwise it won't show up until the page is refreshed
                annotationManager.redrawAnnotation(rectangleAnnot);
            });
        });
    }, []);

    return (
        <div className="App">
            <div className="header">React sample</div>
            <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
        </div>
    );
};

export default PdfViewer;
