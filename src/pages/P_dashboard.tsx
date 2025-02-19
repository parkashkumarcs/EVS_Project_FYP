import { useEffect, useState } from "react";
import P_sidebar from "../components/P_sidebar";
import P_box from "../components/P_box";
import P_navbar from "../components/P_navbar"; // Adjust the import to use the updated Navbar
import "../styles/P_dashboard.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

function P_dashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [votedStudents, setVotedStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const db = getFirestore();
      const officerDepartment = localStorage.getItem("officerDepartment");

      if (!officerDepartment) {
        setError("Officer department not found");
        setLoading(false);
        return;
      }

      try {
        const studentsRef = collection(db, "students");

        // Fetch Unvoted students
        const unvotedQuery = query(
          studentsRef,
          where("dept", "==", officerDepartment),
          where("status", "==", "Unvoted")
        );
        const unvotedSnapshot = await getDocs(unvotedQuery);
        const unvotedList = unvotedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(unvotedList);

        // Fetch Voted students
        const votedQuery = query(
          studentsRef,
          where("dept", "==", officerDepartment),
          where("status", "==", "voted")
        );
        const votedSnapshot = await getDocs(votedQuery);
        const votedList = votedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVotedStudents(votedList);
      } catch (err) {
        setError("Error fetching students");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Updated Navbar component */}
      <P_navbar msg="Dashboard" />

      <div
        style={{
          display: "flex",
          height: "100%",
          marginTop: "32px",
          width: "100%",
        }}
      >
        <P_sidebar />
        <div className="pmain-content">
          <div className="P-box">
            <P_box
              unvotedCount={students.length}
              votedCount={votedStudents.length}
            />
          </div>
          <div className="p-content">
            {/* Unvoted Students */}
            <div className="glassy-content">
              <div className="t-con1">
                <p className="pv2" style={{ color: "rgba(18, 212, 199)" }}>
                  Unvoted Students
                </p>
                <div className="scrollable-table1">
                  <div
                    className="table-wrapper"
                    // style={{ borderRadius: "10px" }}
                  >
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>CMS</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length > 0 ? (
                          students.map((student) => (
                            <tr key={student.id}>
                              <td>{student.cms}</td>
                              <td>{student.name}</td>
                              <td>{student.dept}</td>
                              <td>{student.status}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3}>No students found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Voted Students */}
              <div className="t-con1">
                <p
                  className="pv2"
                  style={{
                    // marginTop: "0px",
                    color: "rgba(18, 212, 199)",

                    // position: "fixed",
                  }}
                >
                  Voted Students
                </p>
                <div
                  className="scrollable-table1"
                  style={{ marginLeft: "0px", marginTop: "0px" }}
                >
                  <div
                    className="table-wrapper"
                    // style={{ borderRadius: "10px", overflowY: "auto" }}
                  >
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>CMS</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {votedStudents.length > 0 ? (
                          votedStudents.map((student) => (
                            <tr key={student.id}>
                              <td>{student.cms}</td>
                              <td>{student.name}</td>
                              <td>{student.dept}</td>
                              <td>{student.status}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3}>No students found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default P_dashboard;
