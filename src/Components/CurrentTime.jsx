import { useEffect, useState } from 'react';

function CurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <p>Current Time: {currentTime}</p>;
}

export default CurrentTime;
