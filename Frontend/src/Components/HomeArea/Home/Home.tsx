import { useEffect, useState } from 'react';
import productImagesSource2 from '../../../assets/images/more-products.jpeg';
import productImagesSource1 from '../../../assets/images/products.jpeg';
import './Home.css';
import useTitle from '../../../Utils/UseTitle';
import notifyService from '../../../Services/NotifySevice';
import Clock from '../Clock/Clock';

function Home(): JSX.Element {

    useTitle("Home");

    const [sale2Info, setSale2Info] = useState<string>('');
    const [sale3Info, setSale3Info] = useState<string>('');
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            displayCurrentTime();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function displaySale1(): void {
        notifyService.success('Sale: 50% discount on all candies!');
    }

    function displaySale2(): void {
        setSale2Info('Sale: 30% discount on all cheese!');
    }

    function displaySale3(): void {
        setSale3Info('Sale: 15% discount on all beverages!');
    }

    function displayCurrentTime(): void {
        const now = new Date();
        setTime(now.toLocaleTimeString());
    }

    const randomNumber = Math.floor(Math.random() * 2) + 1;

    const desserts = [
        { id: 1, name: 'Apple Pie', price: 20 },
        { id: 2, name: 'Eclair', price: 20 },
        { id: 3, name: 'Pavlova', price: 20 },
        { id: 4, name: 'Cheese Cake', price: 20 },
    ];

    return (
        <div className="Home">
            <h2>Welcome To Northwind Trades!</h2>
            {randomNumber === 1 ? (
                <img src={productImagesSource1} alt="Product 1" />
            ) : (
                <img src={productImagesSource2} alt="Product 2" />
            )}
            <br />
            <br />
            <p>
                Our Desserts:
                {desserts.map((d) => (
                    <span key={d.id}>
                        {d.name} 🍧, {d.price} ₪
                    </span>
                ))}
            </p>
            <hr />
            <button onClick={displaySale1}>First Sale</button>
            <hr />
            <button onClick={displaySale2}>Second Sale</button>
            <span>{sale2Info}</span>
            <hr />
            <button onClick={displaySale3}>Third Sale</button>
            <span>{sale3Info}</span>
            <hr />
            <button onClick={displayCurrentTime}>Show Clock</button>
            <span>{time}</span>

            <hr />

            <Clock format="24h"/>
        </div>
    );
}

export default Home;
