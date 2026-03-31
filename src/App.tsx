import { useEffect, useState } from "react";
import "./App.css";
import Person from "./Person";
import { ThreeDot } from "react-loading-indicators";

let url = "https://birthdays-api.onrender.com/";
type Person = {
  Name: string;
  birthday: string;
};

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [clicked, setclicked] = useState(false);
  const [wbd, setWbd] = useState(false);

  type loadState = {
    data: Person[] | null;
    error: string | null;
    loading: boolean;
  };

  const [state, setState] = useState<loadState>({
    data: null,
    error: null,
    loading: false,
  });

  async function handleFetch(path: string) {
    {
      setState({ data: null, error: null, loading: true });
      try {
        const response = await fetch(url + path);
        if (!response.ok) {
          setState({ data: [], error: null, loading: false });
          setPeople([]);
          return;
        }
        const data = await response.json();
        setState({ data, error: null, loading: false });
        setPeople(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setState({ data: null, error: "Error fetching data", loading: false });
      }
    }
  }

  const handleCheck = () => {
    setclicked(true);
    setWbd(false);
    handleFetch("today");
  };

  const handlePreview = () => {
    setclicked(true);
    setWbd(true);
    handleFetch("all");
  };

  const handleCheckThisMonth = () => {
    setclicked(true);
    setWbd(true);
    handleFetch("month");
  };

  return (
    <>
      <div className="main-div">
        <p className="main-welcome">Welcome to RBDays</p>

        <div className="m-16!">
          <div>
            <button className="check-btn" onClick={handleCheck}>
              check now
            </button>
          </div>

          <div>
            <button onClick={handlePreview}>preview all</button>
          </div>

          <div>
            <button onClick={handleCheckThisMonth}>check this month</button>
          </div>
        </div>
        {state.loading ? (
          <ThreeDot
            variant="bob"
            color="coral"
            size="medium"
            text=""
            textColor=""
          />
        ) : (
          <>
            {people.length == 0 ? (
              <div>{clicked && <p>no birthdays :{"("} </p>}</div>
            ) : (
              <div className="people-div">
                {people.map((person) => {
                  return (
                    <Person
                      name={person.Name}
                      bday={person.birthday}
                      withbd={wbd}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      {/* <Person name="MK" bday="01/01/1990" pic="people/mira.png" withbd={true} /> */}
    </>
  );
}

export default App;
