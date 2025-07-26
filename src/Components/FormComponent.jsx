import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm, resetStatus } from '../store/formSlice';

function FormComponent() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.form);

    const isSubmitting = status === 'submitting';
    const isSucceeded = status === 'succeeded';

    const randomTexts = [
        'Hello world!',
        'Sample input text',
        'Random message here',
        'Test data 123',
        'Lorem ipsum'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        dispatch(submitForm(input));
    };

    const handleRandomText = () => {
        const random = randomTexts[Math.floor(Math.random() * randomTexts.length)];
        const now = new Date();

        const pad = (n) => n.toString().padStart(2, '0');

        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        const formattedDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(hours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`;

        setInput(`${random} (${formattedDateTime})`);
    };

    useEffect(() => {
        if (isSucceeded) {
            setInput('');
            const timeout = setTimeout(() => {
                dispatch(resetStatus());
            }, 10000);
            return () => clearTimeout(timeout);
        }
    }, [isSucceeded, dispatch]);

    return (

        <div>
            <br />
            <br />
            <button type="button" onClick={handleRandomText} disabled={isSubmitting}>
                Add Random Text
            </button>
            <br />
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={input}
                        disabled={isSubmitting}
                        onChange={(e) => setInput(e.target.value)}
                        style={{
                            minWidth: '300px'
                        }}
                    />
                </div>
                <div>

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>

                    {status === 'submitting' && <p>Submitting...</p>}
                    {status === 'succeeded' && <p>✅ Submitted successfully!</p>}
                    {status === 'failed' && <p style={{ color: 'red' }}>❌ {error}</p>}
                </div>

            </form>
        </div>
    );
}

export default FormComponent;
