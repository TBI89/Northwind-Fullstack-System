import { Component } from "react";
import "./Clock.css";
import notifyService from "../../../Services/NotifySevice";

// create cc HomeArea/Clock -p -s:
interface ClockProps {
    format: string; // "12h" or "24h"
}

interface ClockState {
    time: string;
}

class Clock extends Component<ClockProps, ClockState> {

    private displayTime = () => {
        notifyService.success(this.state.time);
    }

    private timerId: number;

    public constructor(props: ClockProps) { // Get props in the constructor.
        super(props); // Pass props to parent.
        this.state = { time: "" }; // Init state.
    }

    // Like useEffect:
    public componentDidMount(): void {
        this.timerId = window.setInterval(() => {
            const now = new Date();
            const options = { hour12: this.props.format === "12h" };
            const time = now.toLocaleTimeString("en", options);
            this.setState({ time });
        }, 1000);
    }

    public componentWillUnmount(): void {
        window.clearInterval(this.timerId);
    }

    public render(): JSX.Element {
        return (
            <div className="Clock">
                <span>{this.state.time} &nbsp; </span>
                {/* <button onClick={this.displayTime.bind(this)}>⌚</button> */}
                <button onClick={this.displayTime.bind(this)}>⌚</button>
            </div>
        );
    }
}

export default Clock;
