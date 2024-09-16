import {useEffect, useState} from 'react'

function Api() {
    const [Data, setData] = useState({});

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple')
        .then(response => response.json())
        .then(response => setData(response))
    }, [])
    console.log(Data)
    return Data
}

export default Api