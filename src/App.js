import {useQuery, gql} from "@apollo/client";
import {useState} from "react";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code 
      name
      emoji
      nameWithEmoji @client
    }
  }
`;
function App() {
  const [code, setCode] = useState("");

  const {data, loading, error} = useQuery(COUNTRY, {
    variables: {code: code},
    skip: code.length !== 2,
  });

  const hendleCheng = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="App">
      {error && <h1> {`You Broke it! ${error.message} `} </h1>}
      {!data || loading ? (
        <h1>Loding</h1>
      ) : (
        <h1>
          {data.country.nameWithEmoji}
        </h1>
      )}
      <input type="text" value={code} onChange={hendleCheng} />
    </div>
  );
}

export default App;
