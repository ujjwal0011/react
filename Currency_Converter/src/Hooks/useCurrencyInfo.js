import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [Data, setData] = useState({});
    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=10`)
           .then(response => response.json())
           .then(response => setData(response))
           console.log(Data);
    }, [currency])
    console.log(Data);
    return Data;
}

export default useCurrencyInfo;