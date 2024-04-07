import React from "react";

function App() {
  const [input1, setInput1] = React.useState("");
  const [input2, setInput2] = React.useState("");
  const [time, setTime] = React.useState([[], [], [], [], []]);
  const search1 = async (e) => {
    const res = await fetch(
      `http://localhost:8080/timetable/student/${input1}`,
    );
    const data = await res.json();
    console.log(data);
    setTime(data);
  };

  const search2 = async (e) => {
    const res = await fetch(
      `http://localhost:8080/timetable/professor/${input2}`,
    );
    const data = await res.json();
    console.log(data);
    setTime(data);
  };

  React.useEffect(() => {}, []);

  return (
    <div style={{ width: "800px" }}>
      <h2>Timetable</h2>
      <div>
        학생 검색
        <input value={input1} onChange={(e) => setInput1(e.target.value)} />
        <button onClick={search1}>검색</button>
      </div>
      <div>
        선생 검색
        <input value={input2} onChange={(e) => setInput2(e.target.value)} />
        <button onClick={search2}>검색</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th> </th>
            <th>1교시</th>
            <th>2교시</th>
            <th>3교시</th>
            <th>4교시</th>
            <th>5교시</th>
            <th>6교시</th>
            <th>7교시</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>월</th>
            {time[0]?.map((value) => (
              <td>
                {value.student_name
                  ? `${value.course_name}/${value.student_name}`
                  : `${value.course_name}/${value.professor_name}`}
              </td>
            ))}
          </tr>
          <tr>
            <th>화</th>
            {time[1]?.map((value) => (
              <td>
                {value.student_name
                  ? `${value.course_name}/${value.student_name}`
                  : `${value.course_name}/${value.professor_name}`}
              </td>
            ))}
          </tr>
          <tr>
            <th>수</th>
            {time[2]?.map((value) => (
              <td>
                {value.student_name
                  ? `${value.course_name}/${value.student_name}`
                  : `${value.course_name}/${value.professor_name}`}
              </td>
            ))}
          </tr>
          <tr>
            <th>목</th>
            {time[3]?.map((value) => (
              <td>
                {value.student_name
                  ? `${value.course_name}/${value.student_name}`
                  : `${value.course_name}/${value.professor_name}`}
              </td>
            ))}
          </tr>
          <tr>
            <th>금</th>
            {time[4]?.map((value) => (
              <td>
                {value.student_name
                  ? `${value.course_name}/${value.student_name}`
                  : `${value.course_name}/${value.professor_name}`}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
