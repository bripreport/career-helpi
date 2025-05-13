
export const createReport = async (quizType: string, report: string) => {
    const reportData = localStorage.getItem("reports");
    const reports = reportData ? JSON.parse(reportData) : [];

    const newReport = {
        type: quizType,
        date: new Date().toISOString(),
        report: report
    };

    const updatedReports = [...reports, newReport];
    localStorage.setItem("reports", JSON.stringify(updatedReports));

};