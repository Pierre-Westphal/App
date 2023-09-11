import React ,{ useState } from 'react';
import get from '../../utils/Requests/Get'

export default function Dashboard() {

  const [response, setResponse] = useState(null);

  const onClickHandler = async () => {
    const temp = await get("health");
    setResponse(temp);
  }

  return(
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={onClickHandler}>Test
      </button>
      <p>{response}</p>
    </div>
  );
}