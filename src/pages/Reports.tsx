import { useState } from 'react';
import Navbar from "../components/Navbar";
import "../styles/reports.css";

type Report = {
    type: string;
    date: string;
    report: string;
};

function Reports(): React.JSX.Element {
    const storedReports = localStorage.getItem("reports");
    const generatedReports = storedReports ? JSON.parse(storedReports) : [];
    const [reports, setReports] = useState<Report[]>(generatedReports)
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const deleteReport = (index: number) => {
        const updatedReports = reports.filter((_, i) => i !== index); 
        setReports(updatedReports);
        localStorage.setItem("reports", JSON.stringify(updatedReports));
    }

    return (
        <div id="reports-container">
            <Navbar />
            <h1>Career Reports</h1>

            {selectedReport ? (
                <div id= "full-report-card">
                    <p><strong>Type:</strong> {selectedReport.type} | <strong>Date:</strong> {new Date(selectedReport.date).toLocaleDateString()}</p>
                    <pre id="full-report"> {selectedReport.report} </pre>
                    <button id="back-button" onClick={() => setSelectedReport(null)}>Back</button>
                </div>

            ): (
                <div id="reports-list">
                    {reports.length === 0 ? (
                        <p>No reports available. Please complete a quiz to generate a report.</p>
                    ) : (
                        reports.map((report, index) => (
                            <div key={index} className="report-card">
                                <h3>{report.type} Report</h3>
                                <p>Date: {new Date(report.date).toLocaleDateString()}</p>
                                <button onClick={() => setSelectedReport(report)}>View Full Report</button>
                                <button onClick={() => deleteReport(index)}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
            )
        
        }

        </div>
    );
}
export default Reports;