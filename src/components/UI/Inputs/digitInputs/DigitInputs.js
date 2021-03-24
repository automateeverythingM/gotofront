import classNames from "classnames";
import { Component } from "react";
import classes from "./digitStyle.module.css";

class DigitInputs extends Component {
    inputRefs = [];

    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidMount() {
        this.inputRefs[0].focus();
    }

    handleKeyDown = (event, index) => {
        const error = this.state.error;
        const key = event.key;
        const isBackSpace = event.keyCode === 8;

        const isKeyMatchDigit = key.match(/^[0-9]$/);

        if (error || error === 0) {
            this.setState({ error: false });
        }

        //?handle backspace
        if (isBackSpace) {
            if (index !== 0 && !this.inputRefs[index].value) {
                this.inputRefs[index - 1].focus();
            }
        }

        //?handle no digit key
        else if (!isKeyMatchDigit) {
            //?handle arrowRight
            if (key === "ArrowRight") {
                event.preventDefault();
                if (index !== this.inputRefs.length - 1) {
                    this.inputRefs[index + 1].focus();
                    return;
                }

                //?handle arrowRight
            } else if (key === "ArrowLeft") {
                event.preventDefault();
                if (index !== 0) {
                    this.inputRefs[index - 1].focus();
                    return;
                }
            }

            //?passthrough Enter and Tab
            else if (key === "Enter" || key === "Tab") {
            }
            //? else
            else {
                event.preventDefault();
                this.setState({ error: index });
            }
        }

        //? handle digit key
        else {
            if (this.inputRefs[index].value) {
                this.inputRefs[index].value = key;
                if (index !== this.inputRefs.length - 1)
                    this.inputRefs[index + 1].focus();
            }
        }
    };

    handleChange = (event, index) => {
        const value = event.target.value;
        const isValueMatchDigit = value.match(/^[0-9]$/);
        if (value && isValueMatchDigit && index !== this.inputRefs.length - 1) {
            this.inputRefs[index + 1].focus();
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { getNumberFromInputs } = this.props;
        let result = "";

        this.inputRefs.forEach((element, index) => {
            result += element.value;
            element.value = "";
        });

        result = Number(result);

        this.inputRefs[0].focus();

        if (getNumberFromInputs) getNumberFromInputs(result);
    };

    render() {
        const { numberOfInputs, placeholder } = this.props;
        const { error } = this.state;
        return (
            <div className={classes.container}>
                <form onSubmit={this.handleSubmit}>
                    {[...Array(numberOfInputs)].map((input, index) => (
                        <span
                            className="inline-flex items-center flex-col"
                            key={index}
                        >
                            <input
                                className={classNames(
                                    classes.inputs,
                                    error === index && classes.error
                                )}
                                key={index}
                                maxLength="1"
                                ref={(ref) => (this.inputRefs[index] = ref)}
                                onKeyDown={(event) =>
                                    this.handleKeyDown(event, index)
                                }
                                onChange={(event) =>
                                    this.handleChange(event, index)
                                }
                                error={error === index}
                                placeholder={placeholder || "#"}
                            />
                            <div className={classes.errorMsg}>
                                {error === index && `only digit allowed`}
                            </div>
                        </span>
                    ))}
                    <button type="submit" className="hidden" />
                </form>
            </div>
        );
    }
}

export default DigitInputs;
